package com.company.UsolDemo.models.dto;

import com.company.UsolDemo.models.Brand;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandDto {
    private Long brandId;
    private String brandName;
    private MultipartFile brandImage;
}
