package com.igordrywall.backend.service;

import com.igordrywall.backend.DTO.AuthenticationRequest;
import com.igordrywall.backend.DTO.AuthenticationResponse;
import com.igordrywall.backend.DTO.GenericResponse;
import com.igordrywall.backend.DTO.RegisterRequest;
import com.igordrywall.backend.exception.EmailAlreadyExistsException;
import com.igordrywall.backend.exception.InvalidLoginException;
import com.igordrywall.backend.exception.UserNotFoundException;
import com.igordrywall.backend.jwt.JWTService;
import com.igordrywall.backend.model.User;
import com.igordrywall.backend.repository.UserRepository;
import com.igordrywall.backend.role.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public AuthenticationResponse register(RegisterRequest request){
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
            String token = jwtService.generateToken(newUser);

            return AuthenticationResponse.builder()
                    .token(token)
                    .role(newUser.getRole())
                    .message("Account created successfully. Awaiting administrator approval.")
                    .build();
        }

        throw new EmailAlreadyExistsException("This email is already associated with an existing account.");
    }

    public AuthenticationResponse login(AuthenticationRequest request){
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("No account found with the provided email address.");
        }

        User user = optionalUser.get();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (BadCredentialsException exception) {
            throw new InvalidLoginException("Incorrect email or password. Please try again.");
        }

        String token = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .role(user.getRole())
                .message("Login successful. Welcome back!")
                .build();
    }

    public GenericResponse logout(){
        //The frontend deletes the JWT (from localStorage or cookies) and Backend just returns a success message.
        return GenericResponse.builder()
                .message("Logout successful.")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public GenericResponse enable(Integer userID) {
        Optional<User> optionalUser = userRepository.findById(userID);

        if(optionalUser.isPresent()){
            User existingUser = optionalUser.get();
            existingUser.setEnabled(true);
            userRepository.save(existingUser);

            return GenericResponse.builder()
                    .message("User account has been activated successfully.")
                    .status(HttpStatus.OK.value())
                    .timeStamp(LocalDateTime.now())
                    .build();
        }

        throw new UserNotFoundException("Unable to find user.");
    }
}
