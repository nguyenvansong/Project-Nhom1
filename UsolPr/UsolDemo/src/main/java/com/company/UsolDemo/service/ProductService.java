package com.company.UsolDemo.service;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Product;
import com.company.UsolDemo.models.dto.ProductDto;
import com.company.UsolDemo.models.dto.Top5ProductDto;

import java.util.List;

public interface ProductService {
    Product save(ProductDto productDto);
    List<Product> getAll();
    Product findById(Long id);
    Product update(ProductDto productDto,Long id);
    String delete(Long id);
    List<Product> getAllByName(String name);
    List<Product> listAll(String keyword);
    List<Top5ProductDto> getTop5Pro();
}
