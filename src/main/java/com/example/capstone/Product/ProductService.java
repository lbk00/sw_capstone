package com.example.capstone.Product;

import java.util.List;

public interface ProductService {

    //상품 생성 메서드
    ProductDTO create(ProductDTO productDTO);
    //상품 수정 메서드
    ProductDTO update(Long id , ProductUpdateRequestDTO productUpdateRequestDTO);
    //상품 삭제 메서드
    void delete(Long id);
    //상품 목록 조회 메서드
    ProductListResponseDTO productList();
    //특정 상품 정보 조회 메서드
    ProductDTO productDetail(Long id);
    //특정 카테고리 상품 정보 조회 메서드
    ProductListResponseDTO productCategory(String category);
    // 가격 낮은 순으로 정렬된 상품 목록 반환
    List<Product> getProductsSortedByPriceDesc();
    // 가격 높은 순으로 정렬된 상품 목록 반환
    List<Product> getProductsSortedByPriceAsc();
}