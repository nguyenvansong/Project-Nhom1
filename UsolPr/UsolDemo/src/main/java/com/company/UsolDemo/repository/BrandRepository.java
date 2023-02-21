package com.company.UsolDemo.repository;

import com.company.UsolDemo.models.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand,Long> {
    List<Brand> findByBrandName(String brandName);
    Page<Brand> findByBrandNameContaining(String brandName, Pageable pageable);
}
