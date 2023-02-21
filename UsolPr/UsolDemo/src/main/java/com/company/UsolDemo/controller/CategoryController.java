package com.company.UsolDemo.controller;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.dto.BrandDto;
import com.company.UsolDemo.models.dto.CategoryDto;
import com.company.UsolDemo.service.BrandService;
import com.company.UsolDemo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {
    @Autowired
    private CategoryService service;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        List<Category> categories = service.getAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Category category = service.findById(id);
        return ResponseEntity.ok(category);
    }

    @PostMapping(value = "/add",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> insert(@RequestParam("categoryName") String categoryName,
                                    @RequestParam("categoryImage") MultipartFile categoryImage){
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryName(categoryName);
        categoryDto.setCategoryImage(categoryImage);
        return ResponseEntity.ok(service.save(categoryDto));
    }

    @PutMapping(value = "/withImage/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateWithImage(@RequestParam("categoryName") String categoryName,
                                             @RequestParam("categoryImage") MultipartFile categoryImage,
                                             @PathVariable Long id) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryName(categoryName);
        categoryDto.setCategoryImage(categoryImage);
        return ResponseEntity.ok(service.update(categoryDto, id));
    }

    @PutMapping("/noImage/{id}")
    public ResponseEntity<?> updateNoImage(@RequestParam("categoryName") String categoryName,
                                           @PathVariable Long id) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryName(categoryName);
        return ResponseEntity.ok(service.update(categoryDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.ok(service.delete(id));
    }
}
