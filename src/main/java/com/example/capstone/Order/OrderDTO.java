package com.example.capstone.Order;

import com.example.capstone.Product.Product;

import com.example.capstone.Supplier.Supplier;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;
    private List<Product> orderedProducts;
    private Integer totalPrice;
    private OrderType orderType;
    private Supplier supplier;


}
