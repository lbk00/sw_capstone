package com.example.capstone.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ProductListResponseDTO {

    public ProductListResponseDTO(List<ProductDTO> products) {
        this.products = products;
    }
    private List<ProductDTO> products;

    // 각 주문서 stream으로 하나씩 상품DTO 생성 그후 toList
    public static ProductListResponseDTO toDTO(List<Product> productList) {


        List<ProductDTO> productDTOList = new ArrayList<>();
        for (Product product : productList) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setPrice(product.getPrice());
            productDTO.setAmount(product.getAmount());
            productDTO.setOrder(product.getOrder());
            productDTO.setSize(product.getSize());
            productDTO.setItemType(product.getItemType());
            productDTO.setItemImage(product.getItemImage());
            productDTOList.add(productDTO);
        }
        // ProductListResponseDTO 객체 생성
        ProductListResponseDTO productListResponseDTO = new ProductListResponseDTO(productDTOList);
        // 생성된 ProductListResponseDTO 객체 반환
        return productListResponseDTO;


    }


}