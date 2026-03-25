package com.project.backend.S3;

import com.project.backend.DTO.responses.GenericResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/upload/{projectId}")
    public ResponseEntity<GenericResponseDTO> uploadFile(@PathVariable Long projectId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.status(HttpStatus.OK).body(s3Service.uploadFile(projectId, file));
    }

    @GetMapping("/list/{projectId}")
    public ResponseEntity<List<String>> getAllFiles(@PathVariable Long projectId) {
        return ResponseEntity.status(HttpStatus.OK).body(s3Service.getAllFiles(projectId));
    }

    @GetMapping("/download/{projectId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long projectId, @RequestParam("fileName") String fileName) {
        try {
            byte[] data = s3Service.downloadFile(projectId, fileName);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<GenericResponseDTO> deleteFile(@PathVariable Long projectId, @RequestParam("fileName") String fileName) {
        return ResponseEntity.status(HttpStatus.OK).body(s3Service.deleteFile(projectId, fileName));
    }
}
