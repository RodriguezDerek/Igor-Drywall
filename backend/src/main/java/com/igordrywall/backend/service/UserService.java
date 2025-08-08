package com.igordrywall.backend.service;

import com.igordrywall.backend.DTO.common.GenericResponseDTO;
import com.igordrywall.backend.DTO.user.UpdateUserRequestDTO;
import com.igordrywall.backend.DTO.user.UserDTO;
import com.igordrywall.backend.exception.PhoneNumberIsTakenException;
import com.igordrywall.backend.exception.UserNotFoundException;
import com.igordrywall.backend.model.User;
import com.igordrywall.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Email not found"));
    }

    public UserDTO toUserDTO(User user){
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .dateAdded(user.getDateAdded())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    public GenericResponseDTO updateUser(Integer id, UpdateUserRequestDTO request) {
        Optional<User> optionalUser = userRepository.findById(id);

        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("User not found");
        }

        User user = optionalUser.get();

        if(userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()){
            throw new PhoneNumberIsTakenException("Someone has this phone number");
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(user);

        return GenericResponseDTO.builder()
                .message("User updated successfully")
                .status(HttpStatus.OK.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    public List<UserDTO> getEnabledUsers() {
        List<User> userList = userRepository.findAllByIsEnabledTrue();
        return userList.stream().map(this::toUserDTO).toList();
    }

    public List<UserDTO> getPendingUsers() {
        List<User> userList = userRepository.findAllByIsEnabledFalse();
        return userList.stream().map(this::toUserDTO).toList();
    }

    public UserDTO getUserById(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("User not found");
        }

        User user = optionalUser.get();

        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .dateAdded(user.getDateAdded())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    public GenericResponseDTO removeUser(Integer userID) {
        if(userRepository.findById(userID).isEmpty()){
            throw new UserNotFoundException("User with ID not found");
        }

        userRepository.deleteById(userID);

        return GenericResponseDTO.builder()
                .message("User removed successfully.")
                .timeStamp(LocalDateTime.now())
                .status(HttpStatus.OK.value())
                .build();
    }
}
