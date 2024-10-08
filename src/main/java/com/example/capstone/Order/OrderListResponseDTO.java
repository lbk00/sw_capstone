package com.example.capstone.Order;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

//주문서 목록 조회 DTO
@Getter
@Setter
@NoArgsConstructor
public class OrderListResponseDTO {

    // 모든 주문서 목록
    private List<OrderDTO> orderList;

    public OrderListResponseDTO(List<OrderDTO> orderList) {
        this.orderList = orderList;
    }

    // 각 주문서 stream으로 하나씩 orderDTO로 생성 그후 toList
    public static OrderListResponseDTO toDTO(List<Order> orderList) {

        // Order 객체를 OrderDTO로 변환하여 리스트에 추가
        List<OrderDTO> orderDTOList = new ArrayList<>();
        for (Order order : orderList) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setId(order.getId());
            orderDTO.setOrderedProducts(order.getOrderedProducts());
            orderDTO.setTotalPrice(order.getTotalPrice());
            orderDTO.setOrderType(order.getOrderType());
            orderDTOList.add(orderDTO);
        }
        // OrderListResponseDTO 객체 생성
        OrderListResponseDTO orderListResponseDto = new OrderListResponseDTO(orderDTOList);
        // 생성된 OrderListResponseDTO 객체 반환
        return orderListResponseDto;


    }

}
