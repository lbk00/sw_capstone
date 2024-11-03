package com.example.capstone.Supplier;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.Date;

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
    private Long supplierId; // 사용자 ID, 기본 키

    @Column(unique = true, nullable = true, length = 20, name = "sID")
    private String sID; // 관리자 ID

    @Column(nullable = true, length = 20, name = "sPW")
    private String sPW; // 관리자 비밀번호

    @Column(nullable = true, length = 20, name = "sName")
    private String sName; // 관리자 이름

    @Column(nullable = true, length = 20, name = "sGender")
    private String sGender; // 관리자 성별

    @Column(nullable = true, length = 20, name = "stel")
    private String stel; // 관리자 전화번호

    @Column(unique = true, length = 50, name = "sEmail")
    private String sEmail; // 관리자 이메일

    @Lob
    private byte[] sProfileImage; // 관리자 프로필 이미지

    @Column(nullable = true, length = 20,   name = "sAdr")
    private String sAdr; // 관리자 주소

    private Integer role; // 사용자 권한 1 = 일반 고객 , 2 = 쇼핑몰 관리자

    @CreationTimestamp
    private Timestamp createDate; // 관리자 생성일



}
