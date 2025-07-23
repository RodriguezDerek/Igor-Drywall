package com.igordrywall.backend.S3;

import com.igordrywall.backend.DTO.common.GenericResponse;
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
    public ResponseEntity<GenericResponse> uploadFile(@PathVariable Integer projectId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.status(HttpStatus.CREATED).body(s3Service.uploadFile(file, projectId));
    }

    @GetMapping("/list/{projectId}")
    public ResponseEntity<List<String>> listFiles(@PathVariable Integer projectId) {
        return ResponseEntity.status(HttpStatus.OK).body(s3Service.getAllFiles(projectId));
    }

    @GetMapping("/download/{projectId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Integer projectId, @RequestParam String filename) {
        byte[] data = s3Service.downloadFile(projectId, filename);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(data);
    }

    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<GenericResponse> deleteFile(@PathVariable Integer projectId, @RequestParam String filename) {
        return ResponseEntity.status(HttpStatus.OK).body(s3Service.deleteFile(projectId, filename));
    }
}
