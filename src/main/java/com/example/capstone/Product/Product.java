package com.example.capstone.Product;

import com.example.capstone.Order.Order;
import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "Product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer price;
    private Integer amount;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private String size;
    private String itemType;
    private String itemImage;

    public Boolean sameId(Long id) {
        return this.id.equals(id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(id, product.id);
    }

    public void checkEnoughAmount(Integer orderedAmount) {
        if (amount < orderedAmount)
            throw new RuntimeException(this.id + "번 상품의 수량이 부족합니다.");
    }

    public void decreaseAmount(Integer orderedAmount) {
        this.amount = this.amount - orderedAmount;
    }

    public void increaseAmount(Integer orderedAmount) {
        this.amount = this.amount + orderedAmount;
    }
}