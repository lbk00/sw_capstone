package com.example.capstone.Manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ManagerDTO {

    private Long userId; // 사용자 ID, 기본 키

    private String mName; // 관리자 이름

    private String mtel; // 관리자 전화번호
    private String mEmail; // 관리자 이메일
    private String uAdr; // 관리자 주소






    // getters and setters
}