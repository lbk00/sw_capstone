package com.example.capstone.Order;

import com.example.capstone.Manager.Manager;
import com.example.capstone.Product.Product;
import com.example.capstone.Product.ProductDTO;
import com.example.capstone.Product.ProductRepository;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.tensorflow.Session;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private Session session;

    //jpa레포지토리 등록
    private final OrderRepository ordersRepository;
    private final ProductRepository productRepository;

    @Autowired
    private JavaMailSender emailSender;
    //임시 레포지토리
    //private final ListProductRepository productRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository ordersRepository, ProductRepository productRepository) {
        this.ordersRepository = ordersRepository;
        //this.productRepository = productRepository;
        this.productRepository = productRepository;
    }

    // Business methods for Orders
    // 상품이 구매가 진행된 후, 수요예측 수행
    @Transactional
    @Override
    public String purchase(List<OrderProductRequestDTO> orderProductRequestDtos) {

        // 현재는 반환값 void -> 수요예측 입력값을 저장하기위해 id, 수량 정보가 있는 List<OrderProductRequestDTO>로 수정해줘야함
        // or 구매한 뒤의 상품 수량을 넘겨준다 List<OrderProductRequestDTO>의 id를 조회하여 amount를 구하고 서로 빼주면됨

        decreaseProductAmount(orderProductRequestDtos);

        // 구매한 상품의 id와 현재 재고수량
        orderProductRequestDtos.forEach(orderProduct -> {
            Long id = orderProduct.getId();
            Product findProduct = productRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found: " + id));

            Integer amount = findProduct.getAmount();
            // 주문 진행 후 상품 수량 가져옴
            System.out.println("Product ID: " + id + ", Amount: " + amount);

            // 예: id와 amount를 가지고 추가 처리
        });
        // 장바구니이므로 db에 따로 저장 X
        // 구매 진행 후 상품의 수량이 변경되었으므로 수요예측 모델 호출
        // DB에 있는 상품 수량이 변경되면( 고객이 상품을 주문하면 / 상품의 총 수량이 감소되면) -> 예측 수행
        // 여러건의 주문시 입력데이터가 누적되도록
        // 입력데이터로 얻고자하는 출력데이터 -> 해당 상품의 다음날(일주일간) 수요량만큼 추가 주문


        return "order complete";
    }

    @Override
    public OrderResponseDTO forecasting() {
        // 3D 배열 생성
        //float[][][] inputData = new float[1][7][7]; // 1개의 샘플, 7일, 7개의 특성

        // 상품 id find
        List<Long> findProductIds = productRepository.findAllId();
        Long[] productIds = findProductIds.stream()
                .toArray(Long[]::new); // Long[] 배열로 수집

        // 상품 수량 find
        List<Integer> findProductAmounts = productRepository.findAllAmount();
        Long[] productAmounts = findProductAmounts.stream()
                .map(Integer::longValue)   // 각 Integer 값을 Long으로 변환
                .toArray(Long[]::new);     // Long[] 배열로 수집

        // 상품 ID
        //Long[] productIds = {22L, 23L, 24L , 25L , 26L ,27L, 28L};
        //Integer[] productIds = {22, 23, 24 , 25 , 26 ,27, 28};
        //임시 고정값
        float[][][] inputData = {{
                // 제품 id , 판매량 , 추가적 특성
                {4.0f, 12.0f, 3.0f, 4.0f, 5.0f, 6.0f, 7.0f},
                {5.0f, 6.0f, 3.0f, 4.0f, 5.0f, 6.0f, 7.0f},
                {6.0f, 3.0f, 3.0f, 4.0f, 5.0f, 6.0f, 7.0f},
                {7.0f, 7.0f, 3.0f, 4.0f, 5.0f, 6.0f, 7.0f},
                {19.0f, 16.0f, 3.0f, 4.0f, 5.0f, 6.0f, 7.0f},
                {20.0f, 20.0f, 3.0f, 4.0f, 5.0f, 6.0f, 7.0f},
                {21.0f, 9.0f, 3.0f, 4.0f, 5.0f, 6.0f, 7.0f}
        }
        };

        // Gson을 사용하여 inputData를 JSON 형식으로 변환
        Gson gson = new Gson();
        String inputJson = gson.toJson(new InputWrapper(inputData));

        // Flask API 호출 (주소 동적으로 바뀜)
        String apiUrl = "https://cf8e-35-199-20-23.ngrok-free.app//predict"; // ngrok URL
        RestTemplate restTemplate = new RestTemplate();

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HttpEntity 생성
        HttpEntity<String> entity = new HttpEntity<>(inputJson, headers);

        // POST 요청 보내기
        String response = restTemplate.postForObject(apiUrl, entity, String.class);
        System.out.println("Response from Flask API: " + response);

        // JsonArray로 응답 파싱
        JsonArray jsonArray = JsonParser.parseString(response).getAsJsonArray();
        JsonArray firstElement = jsonArray.get(0).getAsJsonArray(); // 첫 번째 배열

        // 정수 배열 생성
        int[] intAmounts = new int[firstElement.size()];

        // 주문서에 추가해야할 상품 수량
        for (int i = 0; i < firstElement.size(); i++) {
            double amount = firstElement.get(i).getAsDouble();
            intAmounts[i] = (int) Math.round(amount); // 반올림하여 정수로 변환
        }

        // 결과 JSON 배열을 List<OrderProductRequestDTO>로 변환
        List<OrderProductRequestDTO> orderProductRequestDtos = new ArrayList<>();

        for (int i = 0; i < productAmounts.length; i++) {
            if (intAmounts[i] >= 1) { // 음수가 아닌 경우만 추가
                OrderProductRequestDTO dto = new OrderProductRequestDTO();
                dto.setId(productIds[i]); // 상품의 id
                dto.setAmount(intAmounts[i]); // 상품의 수량
                orderProductRequestDtos.add(dto);
            }
        }

        // 생성된 주문서 반환
        OrderResponseDTO orderResponseDTO = createOrder(orderProductRequestDtos);
        return orderResponseDTO;
        // 결과


    }

    static class InputWrapper {
        float[][][] input;

        InputWrapper(float[][][] input) {
            this.input = input;
        }
    }


    // 주문서의 주문확인 버튼 클릭 ,주문서 상태 -> 주문 중(1)으로 변경
    // 공급업체의 이메일로 주문서 발송
    @Override
    public void order(Long id) throws MessagingException, IOException {
        //id -> 주문할 주문서
        Order order = ordersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        // 주문서 상태 주문중으로 변경
        order.setOrderType(OrderType.PROGRESS_ORDER);
        // 관리자 id 조회
        Manager supplier = order.getUserId();
        // 발송해야하는 관리자 이메일
        String Semail = supplier.getMEmail();
        // 공급업체 이메일 , 주문서
        sendHtmlEmail(Semail,order);

        //변경사항 저장
        ordersRepository.save(order);

    }

    // 메일 전송 양식 생성 메서드
    public void sendHtmlEmail(String to, Order order) throws MessagingException, IOException {
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String imagePath = "D:\\Dev\\IDE\\capstone\\src\\main\\frontend\\src\\components\\sample\\sample1.jpg"; // 임시 이미지 경로
        String base64Image = encodeImageToBase64(imagePath); // 임시 이미지 base64

        // 현재 시간과 날짜를 포맷
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
        String formattedNow = now.format(formatter);

        // 이메일 제목
        String subject = order.getUserId().getMName() + "님 " + formattedNow + " 납품서입니다." ;

        StringBuilder htmlMsg = new StringBuilder();
        // 주문 기본 정보 추가
        htmlMsg.append("<h1>납품 요청 내역</h1>")
                .append("<p>주문번호 : <b>") // 주문서 id
                .append(order.getId())
                .append("</b></p>")
                .append("<p>주문일자 : <b>") // 현재 날짜 및 시간
                .append(formattedNow)
                .append("</b></p>")
                .append("<h3>주문정보</h3>")
                .append("<hr style=\"border: 1px solid black; width: 450px; margin-left: 0;\">")
                .append("<p>수신인 : ") // 공급업체 이름
                .append(order.getUserId().getMName())
                .append("</p>")
                .append("<p>연락처 : ") // 공급업체 전화번호
                .append(order.getUserId().getMtel())
                .append("</p>");


        // 총 주문 금액
        int totalPrice = 0;
        htmlMsg.append("<h3>주문상품</h3>");
        // 반복문을 사용해 상품 정보 동적으로 추가
        for (Product product : order.getOrderedProducts()) {
            String imageBase64 = "";
            if (product.getItemImage() != null) {
                imageBase64 = Base64.getEncoder().encodeToString(product.getItemImage());
            }
            htmlMsg.append("<hr style=\"border: 0.1px groove gray; width: 450px; margin-left: 0;\">")
                    .append("<div style=\"display: flex; align-items: center; margin-bottom: 10px;\">") // Flexbox로 정렬
                    // 이미지 imageBase64 로 변경
                    .append("<img src=\"data:image/png;base64,").append(base64Image).append("\" alt=\"상품 이미지\" style=\"width: 100px; height: auto; margin-right: 10px;\" />")
                    .append("<div style=\"margin-left: 10px;\">") // 이미지와 텍스트 간의 여백
                    .append("<p style=\"margin: 0;\">상품명 : ")
                    .append(product.getName())
                    .append("</p>")
                    .append("<p style=\"margin: 0;\">상품유형 : ")
                    .append(product.getItemType())
                    .append("</p>")
                    .append("<p style=\"margin: 0;\">사이즈 : ")
                    .append(product.getSize())
                    .append("</p>")
                    .append("<p style=\"margin: 0;\">주문수량 : ")
                    .append(product.getAmount())
                    .append("</p>")
                    .append("<p style=\"margin: 0;\">주문금액 : ")
                    .append(product.getPrice())
                    .append("원</p>")
                    .append("</div>") // 텍스트를 감싸는 div 종료
                    .append("</div>"); // 상품 정보를 감싸는 div 종료
            totalPrice += product.getPrice() * product.getAmount();;

        }


        // 총 주문 금액 추가
        htmlMsg.append("<hr style=\"border: 1px solid black; width: 450px; margin-left: 0;\">")
                .append("<h2>총 주문금액 : ")
                .append(totalPrice)
                .append("원</h2>");

        // HTML 포맷 설정
        helper.setText(String.valueOf(htmlMsg), true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom("lbk6661@gmail.com");

        // 이메일 전송
        emailSender.send(mimeMessage);
    }

    // 이미지 파일 -> Base64로 변환
    public static String encodeImageToBase64(String imagePath) throws IOException {
        File file = new File(imagePath);
        byte[] fileContent = Files.readAllBytes(file.toPath());
        return Base64.getEncoder().encodeToString(fileContent);
    }



    // 주문서 상태가 주문완료 -> 상품 수량 추가
    @Override
    public OrderResponseDTO createOrder(List<OrderProductRequestDTO> orderProductRequestDtos) {
        // 주문서에 있는 상품 수를 레포지토리에 추가
        List<ProductDTO> orderedProductsDTO = makeOrderedProducts(orderProductRequestDtos);
        //requestDTO를 가지고 order 생성
        List<Product> orderedProducts = orderedProductsDTO.stream()
                .map(orderProductDTO -> {
                    // orderProductDTO에서 productId를 가져와 Product를 조회
                    Long productId = orderProductDTO.getId();
                    Product product = productRepository.findById(productId)
                            .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

                    // 주문 수량만 따로 사용하고 Product의 실제 amount는 변경하지 않음
                    // 주문서 생성 시에만 사용됨
                    Product productForOrder = new Product(); // 새로운 Product 객체 생성
                    productForOrder.setId(product.getId());
                    productForOrder.setName(product.getName());
                    productForOrder.setPrice(product.getPrice());
                    productForOrder.setSize(product.getSize());
                    productForOrder.setItemType(product.getItemType());
                    productForOrder.setItemImage(product.getItemImage());
                    productForOrder.setAmount(orderProductDTO.getAmount());
                    return productForOrder;
                }).toList();

        Order order = new Order(orderedProducts);
        ordersRepository.save(order);
        // 주문서를 가지고 responseDTO 생성 후 반환
        OrderResponseDTO orderResponseDTO = OrderResponseDTO.toDTO(order);
        return orderResponseDTO;
    }



    // 상품이 주문 수량만큼 재고가 있는지 확인
    @Override
    public List<ProductDTO> makeOrderedProducts(List<OrderProductRequestDTO> orderProductRequestDtos) {
        return orderProductRequestDtos
                .stream()// 하나의 map 연산마다 Product를 조회
                .map(orderProductRequestDto -> {
                    Long productId = orderProductRequestDto.getId();
                    ProductDTO productDTO = ProductDTO.toDTO(productRepository.findById(productId)
                            .orElseThrow(() -> new RuntimeException("Product not found: " + productId)));

                    Integer orderedAmount = orderProductRequestDto.getAmount();
                    //productDTO.checkEnoughAmount(orderedAmount);
                    productDTO.setAmount(orderedAmount);

                    // 재고가 충분한지 확인
                    return productDTO;
                }).toList(); // 생성한 Product들로 리스트 생성
    }

    @Override
    public void decreaseProductAmount(List<OrderProductRequestDTO> orderedProducts) {
        orderedProducts
                .stream()
                .forEach(orderedProduct -> {
                    Long productId = orderedProduct.getId();
                    Product product = productRepository.findById(productId)
                            .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

                    Integer orderedAmount = orderedProduct.getAmount();
                    product.decreaseAmount(orderedAmount);

                    //엔티티가 데이터베이스에 이미 존재하면 업데이트하고, 존재하지 않으면 새로 삽입
                    productRepository.save(product);
                });
    }

    @Override
    public void increaseProductAmount(List<Product> orderedProducts) {
        orderedProducts
                .stream()
                .forEach(orderedProduct -> {
                    Long productId = orderedProduct.getId();
                    Product product = productRepository.findById(productId)
                            .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

                    Integer orderedAmount = orderedProduct.getAmount();
                    product.increaseAmount(orderedAmount);

                    //엔티티가 데이터베이스에 이미 존재하면 업데이트하고, 존재하지 않으면 새로 삽입
                    productRepository.save(product);
                });
    }

    @Override
    public OrderResponseDTO complete(Long id) {
        // 주문서 조회
        Optional<Order> order = ordersRepository.findById(id);
        // 주문서에 있는 상품 수량 , 재고에 추가
        increaseProductAmount(order.get().getOrderedProducts());
        // 주문서 상태 -> 주문완료로 변경
        order.get().setOrderType(OrderType.COMPLETE_ORDER);
        ordersRepository.save(order.get());
        OrderResponseDTO orderResponseDTO = OrderResponseDTO.toDTO(order.get());
        return orderResponseDTO;
    }


    @Override
    public OrderResponseDTO orderDetail(Long id) {
        Optional<Order> order = ordersRepository.findById(id);
        OrderResponseDTO orderResponseDTO = OrderResponseDTO.toDTO(order.get());
        return orderResponseDTO;
    }

    @Override
    public OrderListResponseDTO orderList() {
        List<Order> orderList = ordersRepository.findAll();
        // 조회한 리스트들을 DTO 형태로 변경
        OrderListResponseDTO orderListResponseDTO = OrderListResponseDTO.toDTO(orderList);
        return orderListResponseDTO;
    }


    @Override
    public OrderListResponseDTO orderCategory(Long id) {
        //< 0 = 주문 전, 1 = 주문 중 , 2 = 납품(주문) 완료 , 3 = 반품 중 , 4 = 반품 완료 , 5 = 취소>
        // id 값에따라 특정 카테고리의 리스트 반환
        List<Order> list = null;
        if (id == 0) {
            list = ordersRepository.findByOrderType(OrderType.BEFORE_ORDER);
        } else if (id == 1) {
            list = ordersRepository.findByOrderType(OrderType.PROGRESS_ORDER);
        } else if (id == 2) {
            list = ordersRepository.findByOrderType(OrderType.COMPLETE_ORDER);
        } else if (id == 3) {
            list = ordersRepository.findByOrderType(OrderType.RETURNING);
        } else if (id == 4) {
            list = ordersRepository.findByOrderType(OrderType.COMPLETE_RETURN);
        } else if (id == 5) {
            list = ordersRepository.findByOrderType(OrderType.CANCELLED);
        }
        OrderListResponseDTO orderListResponseDTO = OrderListResponseDTO.toDTO(list);
        return orderListResponseDTO;

    }

    @Override
    public void deleteOrder(Long id) {
        // 해당 id의 주문서 삭제 , 없는번호면 오류발생
        Order order = ordersRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 주문이 존재하지 않습니다: " + id));
        ordersRepository.deleteById(id);
    }


    @Override
    @Transactional
    public OrderResponseDTO orderUpdate(Long id, OrderUpdateRequestDTO orderUpdateRequestDTO ) {
        //수정할 주문서 조회

        Order order = ordersRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 주문이 존재하지 않습니다: " + id));
        // 주문서 상태가 주문 전일때만 수정가능
        if (order.getOrderType() == OrderType.BEFORE_ORDER) {
            //주문서에서 수정될 id만 찾아서 변경
            // id 리스트 [] , 수량 리스트 []
            // 1. 주문서에 있는 상품리스트에서 id리스트와 일치하는 상품을 찾기
            // 2. 해당 상품리스트의 상품 수량을 변경
            // 3. setOrderProducts 후 저장
            // 새로운 상품id가 추가될수는 없음 , 모든 상품중 일부만 수정될수 있음
            // orderList를 만들고 setOrderedProducts에 넘겨줘야함
            // OrderUpdateRequestDTO에서 상품 id를 하나씩 가져와서 주문서에 있는 orderedProducts를 수정
            List orderList = order.getOrderedProducts();

            //orderList Set 하는 부분 확인
            // 현재는 입력값 , 수량이 적용되지않음
            orderUpdateRequestDTO.getId()
                    .forEach(pId -> {
                        boolean exists = order.getOrderedProducts().stream()
                                .anyMatch(product -> product.getId().equals(pId));
                        if (exists) { // 주문서에 변경하려는 상품id가 존재한다면
                            System.out.println("pId = " + pId);
                            int p_index = -1;
                            for (int i = 0; i < order.getOrderedProducts().size(); i++) {
                                if (order.getOrderedProducts().get(i).getId().equals(pId)) {
                                    p_index = i;
                                    break;
                                }
                            } // 변경하려는 상품의 인덱스
                            Product product = (Product) orderList.get(p_index); // 상품 객체
                            Integer pId_int = pId.intValue();
                            product.setAmount(orderUpdateRequestDTO.getAmount().get(p_index)); // 해당 상품의 수량 변경
                            orderList.set(p_index,product); // 변경내용 반영

                        }
                    });
            order.setOrderedProducts(orderList);
            // 수정된 객체
            // json 객체만 변경 후 save 할시 DB에 반영안됨
            order.changeOrderedProducts(order.getOrderedProducts());
            order.changeTotalAmount(order.calculateTotalAmount());
            order.changeTotalPrice(order.getTotalPrice());

            ordersRepository.save(order);
            OrderResponseDTO orderResponseDTO = OrderResponseDTO.toDTO(order);
            return orderResponseDTO;
        } else {
            new IllegalArgumentException("주문서 상태가 '주문 전'이 아닙니다.");
            return null;
        }

    }

}