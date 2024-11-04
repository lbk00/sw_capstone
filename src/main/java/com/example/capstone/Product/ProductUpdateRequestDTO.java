package com.example.capstone.Product;


import com.example.capstone.Order.Order;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductUpdateRequestDTO {

    // 수정할 상품의 정보를 입력하는 DTO
    private String name;
    private Integer price;
    private Integer amount;
    private Order order;
    private String size;
    private String itemType;
    private String itemImage;

    public ProductUpdateRequestDTO(String name, Integer price, Integer amount, Order order, String size, String itemType, String itemImage) {
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.order = order;
        this.size = size;
        this.itemType = itemType;
        this.itemImage = itemImage;
    }


    public static ProductUpdateRequestDTO toDTO(Product product) {
        ProductUpdateRequestDTO productDto = new ProductUpdateRequestDTO(
                product.getName(),
                product.getPrice(),
                product.getAmount(),
                product.getOrder(),
                product.getSize(),
                product.getItemType(),
                product.getItemImage()
        );

        return productDto;
    }
}