package com.company.UsolDemo.models.dto;

import com.company.UsolDemo.models.Brand;
import com.company.UsolDemo.models.Category;
import com.company.UsolDemo.models.Image;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long productID;
    private String productName;
    private double price;
    private String productDecription;
    private double discount;
    private Date productCreated;
    private Brand brand;
    private Category category;
    private MultipartFile productImage;
    private List<Image> images = new ArrayList<>();

    public ProductDto(String productName, double price, String productDecription, double discount, Brand brand, Category category) {
        this.productName = productName;
        this.price = price;
        this.productDecription = productDecription;
        this.discount = discount;
        this.brand = brand;
        this.category = category;
    }

    public ProductDto(String productName, double price, String productDecription, double discount, Brand brand, Category category, MultipartFile productImage) {
        this.productName = productName;
        this.price = price;
        this.productDecription = productDecription;
        this.discount = discount;
        this.brand = brand;
        this.category = category;
        this.productImage = productImage;
    }

}
