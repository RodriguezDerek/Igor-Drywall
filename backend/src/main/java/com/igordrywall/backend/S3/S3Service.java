package com.igordrywall.backend.S3;

import com.igordrywall.backend.DTO.common.GenericResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.bucket.name}")
    private String bucketName;

    public GenericResponseDTO deleteProjectFolder(Integer projectId) {
        try {
            String prefix = "projects/" + projectId + "/";

            // List all objects under this project folder
            ListObjectsV2Response result = s3Client.listObjectsV2(
                    ListObjectsV2Request.builder()
                            .bucket(bucketName)
                            .prefix(prefix)
                            .build()
            );

            List<ObjectIdentifier> objectsToDelete = result.contents().stream()
                    .map(obj -> ObjectIdentifier.builder().key(obj.key()).build())
                    .collect(Collectors.toList());

            if (!objectsToDelete.isEmpty()) {
                DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
                        .bucket(bucketName)
                        .delete(Delete.builder().objects(objectsToDelete).build())
                        .build();

                s3Client.deleteObjects(deleteRequest);
            }

            return GenericResponseDTO.builder()
                    .message("All project files deleted successfully")
                    .status(HttpStatus.OK.value())
                    .timeStamp(LocalDateTime.now())
                    .build();

        } catch (Exception e) {
            return GenericResponseDTO.builder()
                    .message("Failed to delete project files: " + e.getMessage())
                    .status(HttpStatus.BAD_REQUEST.value())
                    .timeStamp(LocalDateTime.now())
                    .build();
        }
    }


    public GenericResponseDTO uploadFile(MultipartFile file, Integer projectId) {
        try{
            String key = "projects/" + projectId + "/" + file.getOriginalFilename();
            s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(key)
                            .contentType(file.getContentType())
                            .build(),
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize())
            );
            return GenericResponseDTO.builder()
                    .message("File uploaded successfully")
                    .status(HttpStatus.CREATED.value())
                    .timeStamp(LocalDateTime.now())
                    .build();

        } catch (Exception e) {
            return GenericResponseDTO.builder()
                    .message("Failed to upload file: " + e.getMessage())
                    .status(HttpStatus.BAD_REQUEST.value())
                    .timeStamp(LocalDateTime.now())
                    .build();
        }
    }

    public List<String> getAllFiles(Integer projectId) {
        String prefix = "projects/" + projectId + "/";

        ListObjectsV2Response result = s3Client.listObjectsV2(
                ListObjectsV2Request.builder()
                        .bucket(bucketName)
                        .prefix(prefix)
                        .build()
        );

        return result.contents().stream()
                .map(S3Object::key)
                .map(key -> key.replace(prefix, "")) // just the filename
                .collect(Collectors.toList());
    }

    public byte[] downloadFile(Integer projectId, String filename) {
        try {
            String key = "projects/" + projectId + "/" + filename;
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            return s3Client.getObjectAsBytes(getObjectRequest).asByteArray();
        } catch (Exception e) {
            // Handle error, or rethrow wrapped in runtime exception
            throw new RuntimeException("Failed to download file: " + e.getMessage());
        }
    }


    public GenericResponseDTO deleteFile(Integer projectId, String filename) {
        try {
            String key = "projects/" + projectId + "/" + filename;

            s3Client.deleteObject(DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build());

            return GenericResponseDTO.builder()
                    .message("File deleted successfully")
                    .status(HttpStatus.OK.value())
                    .timeStamp(LocalDateTime.now())
                    .build();
        } catch (Exception e) {
            return GenericResponseDTO.builder()
                    .message("Failed to delete file: " + e.getMessage())
                    .status(HttpStatus.BAD_REQUEST.value())
                    .timeStamp(LocalDateTime.now())
                    .build();
        }
    }

}
