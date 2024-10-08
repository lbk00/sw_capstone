package com.example.capstone.Supplier;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Supplier")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long supplierId; // 공급업체 고유번호

    @Column(nullable = true, length = 20)
    private String sName; // 공급업체 이름

    @Column(nullable = true, length = 20)
    private String stel; // 공급업체 전화번호

    @Column(length = 50)
    private String sEmail; // 공급업체 이메일

    @Lob
    private byte[] sProfileImage; // 공급업체 프로필 이미지

    @Column(nullable = true, length = 20)
    private String sAdr; // 공급업체 주소



}
