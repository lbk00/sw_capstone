package com.example.capstone.Product;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByNameAndItemTypeAndSize(String name, String itemType, String size);
    List<Product> findByItemType(String itemType);


    //수요예측에 사용하는 상품 id 모두 반환
    @Query("SELECT p.id FROM Product p")
    List<Long> findAllId();
    // 수요예측에 사용하는 상품 수량 모두 반환
    @Query("SELECT p.amount FROM Product p")
    List<Integer> findAllAmount();



}