package com.example.capstone.Order;

//주문 요청 DTO


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class OrderRequestDTO {
    public Long getId() {
        return id;
    }

    public Integer getAmount() {
        return amount;
    }

    private Long id;
    private Integer amount;


}
