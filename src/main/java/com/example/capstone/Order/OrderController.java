package com.example.capstone.Order;

import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/orders")
public class OrderController {

    private final OrderServiceImpl ordersService;

    private final SimpMessagingTemplate messagingTemplate;

    public OrderController(OrderServiceImpl ordersService, SimpMessagingTemplate messagingTemplate) {
        this.ordersService = ordersService;
        this.messagingTemplate = messagingTemplate;
    }
    //장바구니 상품 구매 api ( 고객이 상품 구입시, db에 따로 저장 X , 상품 수량 바로 업데이트)
    @RequestMapping(value = "/purchase", method = RequestMethod.POST)
    public String purchase(@RequestBody List<OrderProductRequestDTO> orderProductRequestDtos) {
        //상품 번호 리스트로 입력 받고 , order complete 출력
        String str = ordersService.purchase(orderProductRequestDtos);
        //messagingTemplate.convertAndSend("/topic/notifications", "주문서 생성이 완료되었습니다.");
        return str;
    }


    // 주문서를 갱신해주는 api ( 하루마다 or 일주일마다 , 현재는 임시로 해당 메서드를 호출하면 주문서 생성 )
    // 매주 수요일 자정(00:00)에 forecasting() 메서드를 호출
    @Scheduled(cron = "0 0 0 * * WED")
    @RequestMapping(value = "/forecasting", method = RequestMethod.GET)
    public void forecasting() {
        //String str = ordersService.renewOrder();
        //수요예측 모델에는 해당 상품의 수량 전체를 전달해야함
        OrderResponseDTO orderResponseDTO = ordersService.forecasting();
        // 주문서 알림 추가
        System.out.println(orderResponseDTO);
        //알림 전송
        String orderAlarm = orderResponseDTO.getId() + "번 주문서 생성이 완료되었습니다.";
        messagingTemplate.convertAndSend("/topic/notifications", orderAlarm);
    }

    // forecasting 으로 주문서 생성 후
    //주문서 조회 화면에서 주문 클릭시 -> 해당 Supplier의 이메일로 전송
    //해당 주문서를 주문중(1)으로 타입 변환
    // url로 주문서 id 넘겨줌
    @RequestMapping(value = "/order/{id}", method = RequestMethod.GET)
    public String order(@PathVariable("id") Long id) throws MessagingException, IOException {
        ordersService.order(id);
        return "Order Shipment Completed";
    }



    //주문서 생성 api
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<OrderResponseDTO> createOrder(@RequestBody List<OrderProductRequestDTO> orderProductRequestDtos) {
        //상품 번호 리스트로 입력 받고 , 해당 정보를 가지고있는 주문서 생성
        OrderResponseDTO orderResponseDto = ordersService.createOrder(orderProductRequestDtos);
        return ResponseEntity.ok(orderResponseDto);
    }

    //납품확인 버튼 클릭 api ( 주문서 상태를 주문완료로 바꾸고 , 상품 수를 추가 )
    @RequestMapping(value = "/complete/{id}", method = RequestMethod.GET)
    public ResponseEntity<OrderResponseDTO> complete(@PathVariable("id") Long id) {
        //상품 번호 리스트로 입력 받고 , 해당 정보를 가지고있는 주문서 생성
        OrderResponseDTO orderResponseDto = ordersService.complete(id);
        return ResponseEntity.ok(orderResponseDto);
    }

    //주문서 목록 조회 api
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity<OrderListResponseDTO> orderList() {
        OrderListResponseDTO orderListResponseDTO = ordersService.orderList();
        return ResponseEntity.ok(orderListResponseDTO);
    }

    //주문서번호로 조회 api
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<OrderResponseDTO> orderDetail(@PathVariable("id") Long id) {
        //주문서의 번호를 입력 받고, 해당 주문서의 정보를 출력
        OrderResponseDTO orderResponseDTO = ordersService.orderDetail(id);
        return ResponseEntity.ok(orderResponseDTO);
    }

    //특정 카테고리 주문서 정보 조회 api
    @RequestMapping(value = "category/{id}", method = RequestMethod.GET)
    public ResponseEntity<OrderListResponseDTO> orderCategory(@PathVariable("id") Long id) {
        // 해당 카테고리에 속하는 주문서들만 조회
        OrderListResponseDTO orderListResponseDTO = ordersService.orderCategory(id);
        return ResponseEntity.ok(orderListResponseDTO);
    }

    //주문서 수정 api
    // 상품번호와 해당 상품수량을 입력받고 주문서에 반영되도록
    // 주문서 상태가 '주문 전' 인 상태만 수정 가능
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<OrderResponseDTO> updateOrder(
            @PathVariable("id") Long id,
            @RequestBody OrderUpdateRequestDTO orderUpdateRequestDTO) { // orderUpdateRequestDTO로 수정해야함
        // 수정할 주문서 id / 상품 id 및 수량
        // 여러개 상품 수정가능하므로 리스트로 입력 받아야함
        OrderResponseDTO orderResponseDTO = ordersService.orderUpdate(id,orderUpdateRequestDTO);
        // 수정된 주문서 반환
        System.out.println("orderResponseDTO_Controller = " + orderResponseDTO);
        return ResponseEntity.ok(orderResponseDTO);

    }

    //주문서 삭제 api
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteOrder(@PathVariable("id") Long id) {
        ordersService.deleteOrder(id);
        return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
    }

    // Endpoints for Orders
}