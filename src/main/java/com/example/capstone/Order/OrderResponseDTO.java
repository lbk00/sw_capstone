package com.example.capstone.Order;

//주문 응답 처리 DTO


import com.example.capstone.Manager.Manager;

import com.example.capstone.Product.ProductDTO;
import lombok.Getter;

import java.util.List;

@Getter
public class OrderResponseDTO {

    private Long id;
    private List<ProductDTO> orderedProducts;
    private Integer totalPrice;
    private OrderType orderType;
    private int totalAmount;

    private Manager manager;
    //private Supplier supplier;


    public OrderResponseDTO(Long id, List<ProductDTO> orderedProducts, Integer totalPrice, OrderType orderType , int totalAmount , Manager manager) {

        this.id = id;
        this.orderedProducts = orderedProducts;
        this.totalPrice = totalPrice;
        this.orderType = orderType;
        this.totalAmount = totalAmount;

        this.manager = manager;

    }


    public static OrderResponseDTO toDTO(Order order) {
        List<ProductDTO> orderedProductDtos = order.getOrderedProducts()
                .stream()
                .map(orderedProduct -> ProductDTO.toDTO(orderedProduct))
                .toList();

        OrderResponseDTO orderResponseDto = new OrderResponseDTO(
                order.getId(),
                orderedProductDtos,
                order.getTotalPrice(),
                order.getOrderType(),

                order.getTotalAmount(),
                order.getUserId()


        );


        return orderResponseDto;
    }

}