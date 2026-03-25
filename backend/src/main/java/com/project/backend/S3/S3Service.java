package com.project.backend.S3;

import com.project.backend.DTO.responses.GenericResponseDTO;
import com.project.backend.exceptions.DownloadFileException;
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

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.bucket.name}")
    private String bucketName;

    public GenericResponseDTO uploadFile(Long projectId, MultipartFile file) {
        try {
            String key = "projects/project" + projectId + "/" + file.getOriginalFilename();

            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

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

    public List<String> getAllFiles(Long projectId) {
        String prefix = "projects/project" + projectId + "/";

        ListObjectsV2Request request = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(prefix)
                .build();

        return s3Client
                .listObjectsV2(request)
                .contents()
                .stream()
                .map(S3Object::key)
                .map(key -> key.replace(prefix, ""))
                .toList();
    }

    public byte[] downloadFile(Long projectId, String fileName) {
        try {
            String key = "projects/project" + projectId + "/" + fileName;

            GetObjectRequest objectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            return s3Client.getObjectAsBytes(objectRequest).asByteArray();

        } catch (Exception e) {
            throw new DownloadFileException("Failed to download file: " + e.getMessage());
        }
    }

    public GenericResponseDTO deleteFile(Long projectId, String fileName) {
        try {
            String key = "projects/project" + projectId + "/" + fileName;

            DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(objectRequest);

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

    public void deleteAllFolderFiles(Long projectId) {
        try {
            String prefix = "projects/project" + projectId + "/";

            ListObjectsV2Request request = ListObjectsV2Request.builder()
                    .bucket(bucketName)
                    .prefix(prefix)
                    .build();

            ListObjectsV2Response result = s3Client.listObjectsV2(request);

            List<S3Object> objects = result.contents();

            if (!objects.isEmpty()) {
                List<ObjectIdentifier> toDelete = objects.stream()
                        .map(obj -> ObjectIdentifier.builder().key(obj.key()).build())
                        .toList();

                DeleteObjectsRequest deleteObjectsRequest = DeleteObjectsRequest.builder()
                        .bucket(bucketName)
                        .delete(Delete.builder().objects(toDelete).build())
                        .build();

                s3Client.deleteObjects(deleteObjectsRequest);
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to delete all files");
        }
    }
}
