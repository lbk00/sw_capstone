package com.example.capstone.Order;


import lombok.Getter;

import java.util.List;

// 상품을 수정하기위해 입력하는 DTO
@Getter
public class OrderUpdateRequestDTO {

    private List<Long> id;
    private List<Integer> amount;
}
