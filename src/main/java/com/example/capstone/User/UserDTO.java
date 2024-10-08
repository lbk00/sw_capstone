package com.example.capstone.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {

    private Long user_Id; // 사용자 ID, 기본 키
    private String cID; // 관리자 ID
    private String cPW; // 관리자 비밀번호
    private String cName; // 관리자 이름
    private String cGender; // 관리자 성별
    private Date cbirthDate; // 관리자 생년월일
    private String ctel; // 관리자 전화번호
    private String cEmail; // 관리자 이메일
    private String cAdr; // 관리자 주소
    private byte[] cProfileImage;






    // getters and setters
}