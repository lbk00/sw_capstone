package com.example.capstone.Order;


import com.example.capstone.Product.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //mappedBy 주인 엔터티가 반대쪽인 many
    //@OneToMany(mappedBy = "order", orphanRemoval = true)
    @Lob
    @Convert(converter = JsonArrayConverter.class) // json 형태로 상품 저장
    private List<Product> orderedProducts;


    private Integer totalPrice;
    private OrderType orderType; //< 0 = 주문 전, 1 = 주문 중 , 2 = 납품(주문) 완료 , 3 = 반품 중 , 4 = 반품 완료 , 5 = 취소>

    // 총 수량
    private Integer totalAmount;


    // 공급업체 id
    //@ManyToOne
    //@JoinColumn(name = "userId")
    private long userId;


    // 추가해야할 필드
    // 공급업체 id , 관리자 id
    
    public Order(List<Product> orderedProducts) {
        this.orderedProducts = orderedProducts;
        this.totalPrice = calculateTotalPrice(orderedProducts);
        this.orderType = OrderType.BEFORE_ORDER;
        this.totalAmount = calculateTotalAmount();

        this.userId = 1L;

    }

    public void changeOrderedProducts(List<Product> orderedProducts) {this.orderedProducts = orderedProducts;}
    public void changeTotalPrice(Integer totalPrice) {this.totalPrice = calculateTotalPrice(this.orderedProducts);}
    public void changeOrderType(OrderType orderType) {this.orderType = orderType;}
    public void changeTotalAmount(Integer totalAmount) {this.totalAmount = totalAmount;}


    // 주문 생성 시 총 수량 계산
    public int calculateTotalAmount() {
        return orderedProducts.stream().mapToInt(Product::getAmount).sum();
    }



    private Integer calculateTotalPrice(List<Product> orderedProducts) {
        return orderedProducts
                .stream()
                .mapToInt(orderedProduct -> orderedProduct.getPrice() *orderedProduct.getAmount())
                .sum();
    }

    public Boolean sameId(Long id) {
        return this.id.equals(id);
    }
    public void changeStateForce(OrderType orderType) {
        this.orderType = orderType;
    }

    /* 임시 주석처리
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Manager manager;

    @ManyToOne
    @JoinColumn(name = "supplierId", nullable = false)
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "itemId", nullable = false)
    private Product item;

    @Column(nullable = false, length = 20)
    private String quantity;

    @Column(nullable = false, length = 20)
    private String price;

    @Column(nullable = false)
    private int totalPrice;

    @Column(nullable = false, length = 20)
    private String type;

    @Column(nullable = false, length = 20)
    private String to;

    @Column(nullable = false)
    private int tag;
    */

    // getters and setters
}