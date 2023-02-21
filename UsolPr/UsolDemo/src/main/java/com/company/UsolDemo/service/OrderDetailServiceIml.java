package com.company.UsolDemo.service;

import com.company.UsolDemo.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailServiceIml implements OrderDetailService{
    @Autowired
    OrderDetailRepository repo;
    @Override
    public double monthlyRevenue(int year, int month) {
        return repo.monthlyRevenue(year,month);
    }

    @Override
    public double monthlyRevenue() {
        return repo.monthlyRevenue();
    }

//    @Override
//    public List<TopProduct> topProductSell() {
//        return repo.topProductSell();
//    }
}
