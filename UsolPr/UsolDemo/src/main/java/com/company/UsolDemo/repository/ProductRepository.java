package com.company.UsolDemo.repository;

import com.company.UsolDemo.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
//    @Query("INSERT INTO p FROM")
    List<Product> findByProductName(String name);
    @Query("select p from Product p where concat(p.productName,' ',p.price,' ',p.brand.brandId,' ',p.category.categoryID) like %?1%")
    public List<Product> search(String keyword);
    @Procedure("proc_Top5")
    public List<Object[]> getAllTop5();
}
