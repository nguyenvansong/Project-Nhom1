package com.company.UsolDemo.service;

import com.company.UsolDemo.exception.BrandNotFoundException;
import com.company.UsolDemo.exception.CategoryNotFoundException;
import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.Product;
import com.company.UsolDemo.models.dto.BrandDto;
import com.company.UsolDemo.models.dto.CategoryDto;
import com.company.UsolDemo.repository.BrandRepository;
import com.company.UsolDemo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;

@Service
public class CategoryServiceIml implements CategoryService{
    @Autowired
    private CategoryRepository repo;

    @Override
    public Category save(CategoryDto categoryDto) {
        Category category = new Category();
        category.setCategoryName(categoryDto.getCategoryName());

        getImageFromDto(categoryDto,category);

        return repo.save(category);
    }

    private static void getImageFromDto(CategoryDto categoryDto, Category category) {
        MultipartFile image = categoryDto.getCategoryImage();

        Path path = Paths.get("uploads/category");
        if (image.isEmpty()) {
            category.setCategoryImage("default.jpg");
        }
        try {
            InputStream inputStream = image.getInputStream();
            Files.copy(inputStream, path.resolve(image.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
            category.setCategoryImage(image.getOriginalFilename().toLowerCase());

        } catch (Exception ex) {

        }
    }

    @Override
    public List<Category> getAll() {
        return repo.findAll();
    }

    @Override
    public Category findById(Long id) {
        return repo.findById(id)
                .orElseThrow(()->new CategoryNotFoundException(id));
    }

    @Override
    public Category update(CategoryDto categoryDto, Long id) {
        return repo.findById(id)
                .map(category -> {
                    if (categoryDto.getCategoryName().equals("")==false) {
                        category.setCategoryName(categoryDto.getCategoryName());
                    }
                    if (categoryDto.getCategoryImage() != null) {
                        getImageFromDto(categoryDto, category);
                    }
                    return repo.save(category);
                }).orElseThrow(()->new CategoryNotFoundException(id));
    }

    @Override
    public String delete(Long id) {
        if(!repo.existsById(id)){
            throw new CategoryNotFoundException(id);
        }
        repo.deleteById(id);
        return "Order with id "+ id +" id has been deleted success!";
    }
}
