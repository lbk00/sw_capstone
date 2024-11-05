package com.example.capstone.Manager;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;



@Entity
@Table(name = "Manager")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId; // 사용자 ID, 기본 키



    @Column(nullable = true, length = 20)
    private String mName; // 관리자 이름



    @Column(nullable = true, length = 20)
    private String mtel; // 관리자 전화번호

    @Column(length = 50)
    private String mEmail; // 관리자 이메일

    @Lob
    private byte[] mProfileImage; // 관리자 프로필 이미지

    @Column(nullable = true, length = 20)
    private String uAdr; // 관리자 주소



    public void changemName(String mName) {
        this.mName = mName;
    }



    public void changemtel(String mtel) {
        this.mtel = mtel;
    }

    public void changemEmail(String mEmail) {
        this.mEmail = mEmail;
    }

    public void changeuAdr(String uAdr) {
        this.uAdr = uAdr;
    }
}