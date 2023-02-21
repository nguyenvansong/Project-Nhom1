package com.company.UsolDemo.controller;

import com.company.UsolDemo.models.Image;
import com.company.UsolDemo.models.Product;
import com.company.UsolDemo.models.dto.ImageDto;
import com.company.UsolDemo.service.ImageService;
import com.company.UsolDemo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/image")
@CrossOrigin
public class ImageController {
    @Autowired
    private ImageService service;

    @Autowired
    private ProductService productService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        List<Image> images = service.getAll();
        return ResponseEntity.ok(images);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Image image = service.findById(id);
        return ResponseEntity.ok(image);
    }

    @PostMapping(value = "/add",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> insert(@RequestParam("imageName") MultipartFile imageName,
                                    @RequestParam("productId") Long productId) {
        ImageDto imageDto = new ImageDto();
        imageDto.setImageName(imageName);
        imageDto.setProduct(productService.findById(productId));
        return ResponseEntity.ok(service.save(imageDto));
    }

    @PutMapping("/withImage/{id}")
    public ResponseEntity<?> updateWithImage(@RequestParam("imageName") MultipartFile imageName,
                                             @RequestParam("productId") Long productId,
                                             @PathVariable Long id) {
        ImageDto imageDto = new ImageDto();
        imageDto.setImageName(imageName);
        imageDto.setProduct(productService.findById(productId));
        return ResponseEntity.ok(service.update(imageDto, id));
    }

    @PutMapping("/noImage/{id}")
    public ResponseEntity<?> updateNoImage(@RequestParam("productId") Long productId,
                                           @PathVariable Long id) {
        ImageDto imageDto = new ImageDto();
        imageDto.setProduct(productService.findById(productId));
        return ResponseEntity.ok(service.update(imageDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/productid/{id}")
    public ResponseEntity<?> getByProductId(@PathVariable Long id){
        List<Image> images = service.getImageProductId(id);
        return ResponseEntity.ok(images);
    }
}
