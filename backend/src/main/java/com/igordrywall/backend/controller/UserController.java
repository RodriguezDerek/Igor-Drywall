package com.igordrywall.backend.controller;

import com.igordrywall.backend.DTO.GenericResponse;
import com.igordrywall.backend.DTO.UpdateUserRequest;
import com.igordrywall.backend.DTO.UserDTO;
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

    @GetMapping("/all-enabled-users")
    public ResponseEntity<List<UserDTO>> getEnabledUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getEnabledUsers());
    }

    @GetMapping("/all-pending-users")
    public ResponseEntity<List<UserDTO>>  getPendingUsers(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getPendingUsers());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GenericResponse> updateUser(@PathVariable Integer id, @Valid @RequestBody UpdateUserRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(id, request));
    }
}