package com.company.UsolDemo.controller;

import com.company.UsolDemo.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orderdetail")
public class OrderDetailController {
    @Autowired
    private OrderDetailService service;

    @GetMapping("/monthlyRevenue")
    private ResponseEntity<?> monthlyRevenue(@RequestParam("year") int year,
                                             @RequestParam("month") int month){
        return ResponseEntity.ok(service.monthlyRevenue(year,month));
    }
    @GetMapping("/monthlyRevenue/month")
    private ResponseEntity<?> monthlyRevenue(){
        return ResponseEntity.ok(service.monthlyRevenue());
    }
//    @GetMapping("/top5product")
//    private ResponseEntity<?> topProductSell(){
//        return ResponseEntity.ok(service.topProductSell());
//    }
}
