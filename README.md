## 머신러닝 기반의 온라인 쇼핑몰 맞춤형 재고 예측 및 관리 시스템

### 개발 목적
- 온라인 의류 쇼핑몰의 제품별 수요예측을 통한 재고 최적화
- 재고 부족 현상을 해결하여 매진으로 인한 판매량 감소 예방 및 매출 성장 기대
  
### 주요 기능
- 제품별 수요예측을 통해 재고를 최적화하여 이익을 극대화할 수 있도록 도움을 주는 시스템
- (주요기능1) 주문 수요 예측을 통해 다음 주 주문 수량을 미리 파악
- (주요기능2) 상품의 현재 재고량과 예측 판매량이 차이가 있을 경우, 해당 상품을 (재고 공급업체에 발송될) 주문서에 추가 
- (주요기능3) 주문서는 쇼핑몰 관리자의 확인을 통해 공급업체에 발송

https://github.com/user-attachments/assets/40c704e4-f19d-403b-bfa2-495e3743661c

### 역할 분담
- 이본규 : 다이어그램 및  API 설계 , Order / Product 도메인 구현, 프론트엔드 및 백엔드 개발 , 메일 송수신 기능 구현
- 김재훈 : 수요예측 모델 개발 , 데이터 전처리
- 강민석 : User / Manager 도메인 구현 , Mysql 연동, 프론트엔드 및 백엔드 개발
  
### 개발 결과
- 데이터를 상품코드와 판매량, 사이즈, 유형으로 컬럼을 나누고, 특정 상품코드에 대한 선형회귀를 통한 판매량 예측
- 주문 수요 예측을 통해 현재 재고량이 충분하지 않다고 판단될 경우 자동 주문 발주
- 재고량을 최적으로 유지함으로써 상품의 가치하락을 방지하여 관리비용 최소화 

### 기술 스택
Spring ,Tensorflow ,React ,Anaconda ,Flask ,Mysql 

### 작품 구성도
![image](https://github.com/user-attachments/assets/05c0cdae-c1cf-40b1-9192-ea12eba59459)

### 관리자 메뉴 내비게이션 
![image](https://github.com/user-attachments/assets/2fa21f0c-651e-4a04-984b-8ed386f5794d)


