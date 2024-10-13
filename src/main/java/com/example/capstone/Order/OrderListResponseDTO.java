package com.example.capstone.Order;

import com.example.capstone.DTO.PageRequestDTO;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class OrderListResponseDTO<E extends OrderDTO>{

    private List<E> dtoList;

    private List<OrderDTO> orderList;

    private List<Integer> pageNumList;

    private PageRequestDTO pageRequestDTO;

    private boolean prev,next;

    private int totalCount, prevPage, nextPage, totalPage, current;

    public static OrderListResponseDTO toDTO(List<Order> orderList) {
        List<OrderDTO> orderDTOList = new ArrayList<>();
        for (Order order : orderList) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setId(order.getId());
            orderDTO.setOrderedProducts(order.getOrderedProducts());
            orderDTO.setTotalPrice(order.getTotalPrice());
            orderDTO.setOrderType(order.getOrderType());
            orderDTOList.add(orderDTO);
        }
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        long total = orderDTOList.size();
        return new OrderListResponseDTO(orderDTOList, orderDTOList, pageRequestDTO, total);
    }

    @Builder(builderMethodName = "withAll")
    public OrderListResponseDTO(List<E> dtoList, List<OrderDTO> orderList, PageRequestDTO pageRequestDTO, long total) {
        this.dtoList = dtoList.stream()
                .sorted(Comparator.comparingLong(OrderDTO::getId))
                .collect(Collectors.toList());

        this.orderList = orderList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int) total;
        int start = Math.max(1, pageRequestDTO.getPage() - pageRequestDTO.getSize());
        int end = Math.min((int) (Math.ceil(total / (double) pageRequestDTO.getSize())), pageRequestDTO.getPage() + pageRequestDTO.getSize());
        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10;

        start = end - 9;

        int last = (int) (Math.ceil(totalCount / (double) pageRequestDTO.getSize()));

        end = end > last ? last : end;

        this.prev = start > 1;

        this.next = totalCount > end * pageRequestDTO.getSize();

        IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        this.prevPage = prev ? start - 1 : 0;

        this.nextPage = next ? end + 1 : 0;
    }
}