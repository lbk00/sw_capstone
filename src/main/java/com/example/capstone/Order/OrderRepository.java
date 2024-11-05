// com.example.capstone.Orders.OrdersRepository.java
package com.example.capstone.Order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderType(OrderType orderType);

}