package com.igordrywall.backend.auth;

import com.igordrywall.backend.DTO.auth.*;
import com.igordrywall.backend.DTO.common.GenericResponseDTO;
import com.igordrywall.backend.DTO.user.UserDTO;
import com.igordrywall.backend.email.EmailService;
import com.igordrywall.backend.exception.*;
import com.igordrywall.backend.jwt.JWTService;
import com.igordrywall.backend.model.User;
import com.igordrywall.backend.repository.UserRepository;
import com.igordrywall.backend.role.Role;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final EmailService emailService;

    @Value("${frontend.reset.link}")
    private String frontendResetURL;

    public GenericResponseDTO register(RegisterRequestDTO request){
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if(optionalUser.isEmpty()){
            User newUser = User.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.WORKER)
                    .isEnabled(false)
                    .build();

            userRepository.save(newUser);

            return GenericResponseDTO.builder()
                    .message("Account created successfully. Awaiting administrator approval.")
                    .status(HttpStatus.CREATED.value())
                    .timeStamp(LocalDateTime.now())
                    .build();
        }

        throw new EmailAlreadyExistsException("This email is already associated with an existing account.");
        //Frontend gets the message and resets the page to login page
    }

    public AuthenticationResponseDTO login(AuthenticationRequestDTO request){
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("No account found with the provided email address.");
        }

        User user = optionalUser.get();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (BadCredentialsException e) {
            throw new InvalidLoginException("Incorrect email or password. Please try again.");
        }

        String token = jwtService.generateToken(user);
        UserDTO userDTO = toUserDTO(user);

        return AuthenticationResponseDTO.builder()
                .token(token)
                .role(user.getRole())
                .message("Login successful. Welcome back!")
                .userDTO(userDTO)
                .build();
    }

    public GenericResponseDTO logout(){
        //The frontend deletes the JWT (from localStorage or cookies) and Backend just returns a success message.
        return GenericResponseDTO.builder()
                .message("Logout successful.")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponseDTO enable(Integer userID) {
        Optional<User> optionalUser = userRepository.findById(userID);

        if(optionalUser.isPresent()){
            User existingUser = optionalUser.get();
            existingUser.setEnabled(true);
            existingUser.setDateAdded(LocalDate.now());
            userRepository.save(existingUser);

            return GenericResponseDTO.builder()
                    .message("User account has been activated successfully.")
                    .status(HttpStatus.OK.value())
                    .timeStamp(LocalDateTime.now())
                    .build();
        }

        throw new UserNotFoundException("Unable to find user.");
    }

    public GenericResponseDTO processForgotPassword(EmailRequestDTO request){
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("Please check your email is spelt correctly");
        }

        User user = optionalUser.get();
        String token = jwtService.generateResetToken(user);
        user.setResetToken(token);
        userRepository.save(user);

        String resetLink = frontendResetURL + "?token=" + token;
        String body = "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head>" +
                "  <meta charset='UTF-8'>" +
                "  <title>Password Reset Email</title>" +
                "  <link href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;1,400&display=swap' rel='stylesheet'>" +
                "  <style>" +
                "    body { margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Plus Jakarta Sans', sans-serif; }" +
                "    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); font-family: 'Plus Jakarta Sans', sans-serif; }" +
                "    .header { background-color: #920B15; color: #ffffff; padding: 20px 30px; }" +
                "    .header h1 { margin: 0; font-size: 24px; }" +
                "    .content { padding: 30px; }" +
                "    .content p { font-size: 16px; color: #333333; line-height: 1.6; margin-top: 0; }" +
                "    .button-container { text-align: center; margin: 30px 0; }" +
                "    .reset-button { background-color: #920B15; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: bold; display: inline-block; }" +
                "    .note { font-size: 14px; color: #888888; }" +
                "    .footer { background-color: #f0f0f0; padding: 15px 30px; text-align: center; font-size: 12px; color: #999999; }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <h1>Reset Your Password</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <p>You recently requested to reset your password. Click the button below to choose a new password. This link will expire in <strong>15 minutes</strong>.</p>" +
                "      <div class='button-container'>" +
                "        <a href='" + resetLink + "' class='reset-button'>Reset Password</a>" +
                "      </div>" +
                "      <p class='note'>If you did not request a password reset, you can safely ignore this email.</p>" +
                "    </div>" +
                "    <div class='footer'>&copy; 2025 Igor Drywall. All rights reserved.</div>" +
                "  </div>" +
                "</body>" +
                "</html>";

        try{
            emailService.sendEmail(user.getEmail(), "Reset Your Password", body);
        } catch (MessagingException e){
            throw new EmailMessageErrorException("Failed to send reset email.");
        }

        return GenericResponseDTO.builder()
                .message("Forgot password email successfully sent")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponseDTO processResetPassword(ResetRequestDTO request){
        String email;
        try{
            email = jwtService.extractUsername(request.getToken());
        } catch (Exception e) {
            throw new InvalidOrExpiredTokenException("Invalid or expired token");
        }

        Optional<User> optionalUser= userRepository.findByEmail(email);
        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("User not found");
        }

        User user = optionalUser.get();
        if(!request.getToken().equals(user.getResetToken())){
            throw new TokenNotEqualException("Token mismatch");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        userRepository.save(user);

        return GenericResponseDTO.builder()
                .message("Password reset successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public UserDTO toUserDTO(User user){
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .dateAdded(user.getDateAdded())
                .build();
    }
}













