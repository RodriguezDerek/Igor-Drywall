package com.igordrywall.backend.controller;

import com.igordrywall.backend.DTO.common.GenericResponseDTO;
import com.igordrywall.backend.DTO.user.UpdateUserRequestDTO;
import com.igordrywall.backend.DTO.user.UserDTO;
import com.igordrywall.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
    }

    @GetMapping("/all-enabled-users")
    public ResponseEntity<List<UserDTO>> getEnabledUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getEnabledUsers());
    }

    @GetMapping("/all-pending-users")
    public ResponseEntity<List<UserDTO>> getPendingUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getPendingUsers());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GenericResponseDTO> updateUser(@PathVariable Integer id, @Valid @RequestBody UpdateUserRequestDTO request) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(id, request));
    }

    @DeleteMapping("/remove/{userID}")
    public ResponseEntity<GenericResponseDTO> deleteUser(@PathVariable Integer userID) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.removeUser(userID));
    }

    @PutMapping("/authorize/enable/{userID}")
    public ResponseEntity<GenericResponseDTO> enable(@PathVariable Integer userID){
        return ResponseEntity.status(HttpStatus.OK).body(userService.enable(userID));
    }
}