package com.igordrywall.backend.auth;

import com.igordrywall.backend.DTO.auth.*;
import com.igordrywall.backend.email.EmailService;
import com.igordrywall.backend.exception.*;
import com.igordrywall.backend.jwt.JWTService;
import com.igordrywall.backend.model.User;
import com.igordrywall.backend.repository.UserRepository;
import com.igordrywall.backend.role.Role;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JWTService jwtService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AuthenticationService authenticationService;

// ---------- Register ----------

    @Test
    void register_whenEmailNotExists_shouldRegisterUserSuccessfully() {
        RegisterRequestDTO request = RegisterRequestDTO.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .password("password123")
                .build();

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");

        var response = authenticationService.register(request);

        assertThat(response.getMessage()).isEqualTo("Account created successfully. Awaiting administrator approval.");
        assertThat(response.getStatus()).isEqualTo(201);
        verify(userRepository).save(any());
    }

    @Test
    void register_whenEmailExists_shouldThrowEmailAlreadyExistsException() {
        RegisterRequestDTO request = RegisterRequestDTO.builder()
                .firstName("Jane")
                .lastName("Doe")
                .email("jane@example.com")
                .password("password123")
                .build();

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(new User()));

        assertThatThrownBy(() -> authenticationService.register(request))
                .isInstanceOf(EmailAlreadyExistsException.class)
                .hasMessage("This email is already associated with an existing account.");
    }

// ---------- Login ----------

    @Test
    void login_whenCredentialsAreValid_shouldReturnJwtResponse() {
        String email = "user@example.com";
        String password = "securePass";

        AuthenticationRequestDTO request = AuthenticationRequestDTO.builder()
                .email(email)
                .password(password)
                .build();

        User user = User.builder()
                .id(1)
                .email(email)
                .password("encodedPassword")
                .role(Role.WORKER)
                .firstName("John")
                .lastName("Doe")
                .build();

        String jwtToken = "jwt.token.here";

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(mock(org.springframework.security.core.Authentication.class));
        when(jwtService.generateToken(user)).thenReturn(jwtToken);

        AuthenticationResponseDTO response = authenticationService.login(request);

        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo(jwtToken);
        assertThat(response.getRole()).isEqualTo(user.getRole());
        assertThat(response.getMessage()).isEqualTo("Login successful. Welcome back!");
        assertThat(response.getUserDTO().getEmail()).isEqualTo(email);

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtService).generateToken(user);
    }

    @Test
    void login_whenEmailNotFound_shouldThrowUserNotFoundException() {
        AuthenticationRequestDTO request = AuthenticationRequestDTO.builder()
                .email("notfound@example.com")
                .password("password")
                .build();

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authenticationService.login(request))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessage("No account found with the provided email address.");
    }

    @Test
    void login_whenPasswordIsIncorrect_shouldThrowInvalidLoginException() {
        String email = "user@example.com";
        String password = "wrongPassword";

        AuthenticationRequestDTO request = AuthenticationRequestDTO.builder()
                .email(email)
                .password(password)
                .build();

        User user = User.builder()
                .email(email)
                .password("encodedPassword")
                .role(Role.WORKER)
                .build();

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        doThrow(BadCredentialsException.class)
                .when(authenticationManager)
                .authenticate(new UsernamePasswordAuthenticationToken(email, password));

        assertThatThrownBy(() -> authenticationService.login(request))
                .isInstanceOf(InvalidLoginException.class)
                .hasMessage("Incorrect email or password. Please try again.");
    }

// ---------- Logout ----------

    @Test
    void logout_shouldReturnLogoutSuccessMessage() {
        var response = authenticationService.logout();

        assertThat(response.getMessage()).isEqualTo("Logout successful.");
        assertThat(response.getStatus()).isEqualTo(200);
    }

// ---------- Enable ----------

    @Test
    void enable_whenUserIdExists_shouldEnableUserSuccessfully() {
        User user = User.builder()
                .id(1)
                .isEnabled(false)
                .build();

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        var response = authenticationService.enable(1);

        assertThat(response.getMessage()).isEqualTo("User account has been activated successfully.");
        assertThat(response.getStatus()).isEqualTo(200);
        assertThat(user.isEnabled()).isTrue();
        assertThat(user.getDateAdded()).isEqualTo(java.time.LocalDate.now());
        verify(userRepository).save(user);
    }

    @Test
    void enable_whenUserIdNotFound_shouldThrowUserNotFoundException() {
        when(userRepository.findById(999)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authenticationService.enable(999))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessage("Unable to find user.");
    }

// ---------- Forgot Password ----------

    @Test
    void processForgotPassword_whenEmailExists_shouldSendResetToken() throws Exception {
        User user = User.builder()
                .email("forgot@example.com")
                .build();

        when(userRepository.findByEmail("forgot@example.com")).thenReturn(Optional.of(user));
        when(jwtService.generateResetToken(user)).thenReturn("reset-token");

        // emailService.sendEmail won't throw exception here
        doNothing().when(emailService).sendEmail(anyString(), anyString(), anyString());

        var response = authenticationService.processForgotPassword(
                new EmailRequestDTO("forgot@example.com"));

        assertThat(response.getMessage()).isEqualTo("Forgot password email successfully sent");
        assertThat(response.getStatus()).isEqualTo(200);
        verify(userRepository).save(user);
        verify(emailService).sendEmail(eq("forgot@example.com"), anyString(), contains("reset-token"));
    }

    @Test
    void processForgotPassword_whenEmailNotFound_shouldThrowUserNotFoundException() {
        when(userRepository.findByEmail("missing@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authenticationService.processForgotPassword(
                new EmailRequestDTO("missing@example.com")))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessage("Please check your email is spelt correctly");
    }

    @Test
    void processForgotPassword_whenEmailSendingFails_shouldThrowEmailMessageErrorException() throws MessagingException {
        User user = User.builder()
                .email("fail@example.com")
                .build();

        when(userRepository.findByEmail("fail@example.com")).thenReturn(Optional.of(user));
        when(jwtService.generateResetToken(user)).thenReturn("reset-token");

        doThrow(new MessagingException("SMTP error"))
                .when(emailService).sendEmail(anyString(), anyString(), anyString());

        assertThatThrownBy(() -> authenticationService.processForgotPassword(
                new EmailRequestDTO("fail@example.com")))
                .isInstanceOf(EmailMessageErrorException.class)
                .hasMessage("Failed to send reset email.");
    }

// ---------- Reset Password ----------

    @Test
    void processResetPassword_whenTokenAndEmailValid_shouldResetPasswordSuccessfully() {
        String token = "valid-token";
        String email = "reset@example.com";

        ResetRequestDTO request = ResetRequestDTO.builder()
                .token(token)
                .newPassword("newPass123")
                .build();

        User user = User.builder()
                .email(email)
                .resetToken(token)
                .build();

        when(jwtService.extractUsername(token)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newPass123")).thenReturn("encodedNewPass");

        var response = authenticationService.processResetPassword(request);

        assertThat(response.getMessage()).isEqualTo("Password reset successfully");
        assertThat(response.getStatus()).isEqualTo(200);
        assertThat(user.getResetToken()).isNull();
        verify(userRepository).save(user);
    }

    @Test
    void processResetPassword_whenTokenIsExpired_shouldThrowInvalidOrExpiredTokenException() {
        ResetRequestDTO request = ResetRequestDTO.builder()
                .token("expired-token")
                .newPassword("pass")
                .build();

        when(jwtService.extractUsername("expired-token")).thenThrow(new RuntimeException());

        assertThatThrownBy(() -> authenticationService.processResetPassword(request))
                .isInstanceOf(InvalidOrExpiredTokenException.class)
                .hasMessage("Invalid or expired token");
    }

    @Test
    void processResetPassword_whenTokenMismatch_shouldThrowTokenNotEqualException() {
        String token = "token1";
        String email = "user@example.com";

        ResetRequestDTO request = ResetRequestDTO.builder()
                .token(token)
                .newPassword("pass")
                .build();

        User user = User.builder()
                .email(email)
                .resetToken("token2")
                .build();

        when(jwtService.extractUsername(token)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> authenticationService.processResetPassword(request))
                .isInstanceOf(TokenNotEqualException.class)
                .hasMessage("Token mismatch");
    }

    @Test
    void processResetPassword_whenUserNotFound_shouldThrowUserNotFoundException() {
        String token = "some-token";
        String email = "missing@example.com";

        ResetRequestDTO request = ResetRequestDTO.builder()
                .token(token)
                .newPassword("pass")
                .build();

        when(jwtService.extractUsername(token)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authenticationService.processResetPassword(request))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessage("User not found");
    }

// ---------- Mapping ----------

    @Test
    void toUserDTO_shouldMapAllUserFieldsCorrectly() {
        User user = User.builder()
                .id(1)
                .firstName("John")
                .lastName("Doe")
                .email("john@example.com")
                .role(Role.WORKER)
                .dateAdded(LocalDate.of(2025, 7, 26))
                .build();

        var userDTO = authenticationService.toUserDTO(user);

        assertThat(userDTO.getId()).isEqualTo(1);
        assertThat(userDTO.getFirstName()).isEqualTo("John");
        assertThat(userDTO.getLastName()).isEqualTo("Doe");
        assertThat(userDTO.getEmail()).isEqualTo("john@example.com");
        assertThat(userDTO.getRole()).isEqualTo(Role.WORKER);
        assertThat(userDTO.getDateAdded()).isEqualTo(LocalDate.of(2025, 7, 26));
    }
}
