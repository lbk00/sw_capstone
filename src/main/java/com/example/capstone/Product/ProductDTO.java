package com.example.capstone.Product;

import com.example.capstone.Order.Order;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class ProductDTO {

    private Long id;
    private String name;
    private Integer price;
    private Integer amount;
    private Order order;
    private String size;
    private String itemType;
    private String itemImage;

    public ProductDTO(Long id, String name, Integer price, Integer amount, Order order, String size, String itemType, String itemImage) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.order = order;
        this.size = size;
        this.itemType = itemType;
        this.itemImage = itemImage;
    }


    public static ProductDTO toDTO(Product product) {
        ProductDTO productDTO = new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getAmount(),
                product.getOrder(),
                product.getSize(),
                product.getItemType(),
                product.getItemImage()
        );

        return productDTO;
    }
}