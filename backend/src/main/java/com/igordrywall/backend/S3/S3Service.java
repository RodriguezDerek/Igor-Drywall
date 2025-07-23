package com.igordrywall.backend.S3;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Config s3Config;

    //TODO
    //create s3 bucket on aws console
    //add file method
    //view file method
    //delete file method
}
