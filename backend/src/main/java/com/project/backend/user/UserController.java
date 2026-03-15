package com.project.backend.user;

import com.project.backend.DTO.requests.UpdateUserDetailsRequestDTO;
import com.project.backend.DTO.requests.UpdateUserPasswordRequestDTO;
import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.DTO.users.UserDTO;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','WORKER')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> deleteUser(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(id));
    }

    @PutMapping("/user/enable/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GenericResponseDTO> acceptUser(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.acceptUser(id));
    }

    @PutMapping("/user/details/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','WORKER')")
    public ResponseEntity<GenericResponseDTO> updateUserDetails(@Valid @RequestBody UpdateUserDetailsRequestDTO request,  HttpServletResponse response, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUserDetails(request, response, id));
    }

    @PutMapping("/user/password/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','WORKER')")
    public ResponseEntity<GenericResponseDTO> updateUserPassword(@Valid @RequestBody UpdateUserPasswordRequestDTO request, @PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUserPassword(request, id));
    }
}
