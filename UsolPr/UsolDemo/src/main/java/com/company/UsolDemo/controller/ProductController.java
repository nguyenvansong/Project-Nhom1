package com.company.UsolDemo.controller;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.Product;
import com.company.UsolDemo.models.dto.AccountDto;
import com.company.UsolDemo.models.dto.ProductDto;
import com.company.UsolDemo.models.dto.Top5ProductDto;
import com.company.UsolDemo.repository.BrandRepository;
import com.company.UsolDemo.repository.CategoryRepository;
import com.company.UsolDemo.service.BrandService;
import com.company.UsolDemo.service.CategoryService;
import com.company.UsolDemo.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService service;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BrandService brandService;

    @GetMapping("/search")
    public ResponseEntity<?> Search(@RequestParam String keyword) {
        List<Product> listProducts = service.listAll(keyword);
        return ResponseEntity.ok(listProducts);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        List<Product> products = service.getAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Product product = service.findById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping(value = "/add",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> insert(@RequestParam("productName") String productName,
                                    @RequestParam("price") double price,
                                    @RequestParam("productDecription") String productDecription,
                                    @RequestParam("discount") double discount,
                                    @RequestParam("productImage") MultipartFile productImage,
                                    @RequestParam("categoryId") Long categoryId,
                                    @RequestParam("brandId") Long brandId){
        ProductDto productDto = new ProductDto(productName,price,productDecription,discount,brandService.findById(brandId),categoryService.findById(categoryId),productImage);
        return ResponseEntity.ok(service.save(productDto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody ProductDto productDto,@PathVariable Long id){
        return ResponseEntity.ok(service.update(productDto, id));
    }

    @PutMapping("/withImage/{id}")
    public ResponseEntity<?> updateWithImage(@RequestParam("productName") String productName,
                                             @RequestParam("price") double price,
                                             @RequestParam("productDecription") String productDecription,
                                             @RequestParam("discount") double discount,
                                             @RequestParam("productImage") MultipartFile productImage,
                                             @RequestParam("categoryId") Long categoryId,
                                             @RequestParam("brandId") Long brandId,
                                             @PathVariable Long id) {
        ProductDto productDto = new ProductDto(productName,price,productDecription,discount,brandService.findById(brandId),categoryService.findById(categoryId),productImage);
        return ResponseEntity.ok(service.update(productDto,id));
    }

    @PutMapping("/noImage/{id}")
    public ResponseEntity<?> updateNoImage(@RequestParam("productName") String productName,
                                           @RequestParam("price") double price,
                                           @RequestParam("productDecription") String productDecription,
                                           @RequestParam("discount") double discount,
                                           @RequestParam("categoryId") Long categoryId,
                                           @RequestParam("brandId") Long brandId,
                                           @PathVariable Long id) {
        ProductDto productDto = new ProductDto(productName,price,productDecription,discount,brandService.findById(brandId),categoryService.findById(categoryId));
        return ResponseEntity.ok(service.update(productDto,id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/getbyname")
    public ResponseEntity<?> findById(@RequestParam String name) {
        List<Product> productList=service.getAllByName(name);
        return ResponseEntity.ok(productList);
    }
    @GetMapping("/gettop5")
    @Transactional
    public ResponseEntity<?> GetTop5() {
        List<Top5ProductDto> top5Products=service.getTop5Pro();
        return ResponseEntity.ok(top5Products);
    }
}
