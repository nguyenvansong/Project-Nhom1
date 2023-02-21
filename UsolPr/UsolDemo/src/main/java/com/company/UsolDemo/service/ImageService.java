package com.company.UsolDemo.service;

import com.company.UsolDemo.models.Image;
import com.company.UsolDemo.models.dto.ImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    Image save(ImageDto imageDto);
    List<Image> getAll();
    Image findById(Long id);
    Image update(ImageDto imageDto,Long id);
    String delete(Long id);
    List<Image> getImageProductId(Long id);
}
