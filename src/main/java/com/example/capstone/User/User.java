package com.example.capstone.User;
import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;



@Entity
@Table(name = "User")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_Id; // 사용자 ID, 기본 키

    @Column(unique = true, nullable = true, length = 20, name = "cID")
    private String cID; // 관리자 ID

    @Column(nullable = true, length = 20, name = "cPW")
    private String cPW; // 관리자 비밀번호

    @Column(nullable = true, length = 20, name = "cName")
    private String cName; // 관리자 이름

    @Column(nullable = true, length = 20, name = "cGender")
    private String cGender; // 관리자 성별

    @Column(nullable = true, name = "cbirthDate")
    private Date cbirthDate; // 관리자 생년월일

    @Column(nullable = true, length = 20, name = "ctel")
    private String ctel; // 관리자 전화번호

    @Column(unique = true, length = 50, name = "cEmail")
    private String cEmail; // 관리자 이메일

    @Lob
    private byte[] cProfileImage; // 관리자 프로필 이미지

    @Column(nullable = true, length = 20,   name = "cAdr")
    private String cAdr; // 관리자 주소

    private Integer role; // 사용자 권한 1 = 일반 고객 , 2 = 쇼핑몰 관리자

    @CreationTimestamp
    private Timestamp createDate; // 사용자 생성일

    public void changecID(String cID) {
        this.cID = cID;
    }

    public void changecPW(String cPW) {
        this.cPW = cPW;
    }


    public void changecName(String cName) {
        this.cName = cName;
    }

    public void changecGender(String cGender) {
        this.cGender = cGender;
    }

    public void changecbirthDate(Date cbirthDate) {
        this.cbirthDate = cbirthDate;
    }

    public void changectel(String ctel) {
        this.ctel = ctel;
    }

    public void changecEmail(String cEmail) {
        this.cEmail = cEmail;
    }

    public void changecAdr(String cAdr) {
        this.cAdr = cAdr;
    }


}