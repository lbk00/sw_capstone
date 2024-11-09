package com.example.capstone.Order;

//< 0 = 주문 전, 1 = 주문 중 , 2 = 납품(주문) 완료 , 3 = 반품 중 , 4 = 반품 완료 , 5 = 취소>
// 주문서 발송 전 , 주문서 발송 완료 , 납품 완료 , 반품 진행 중 , 반품 완료
public enum OrderType {
    BEFORE_ORDER, PROGRESS_ORDER, COMPLETE_ORDER , RETURNING ,COMPLETE_RETURN , CANCELLED
    // 납품 완료 시 -> 재고에 반영되야함
}
