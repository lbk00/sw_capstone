package com.example.capstone.Supplier;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDTO {

    private Long supplierId; // 공급업체 고유번호
    private String sID; // 관리자 ID
    private String sPW; // 관리자 비밀번호
    private String sGender; // 관리자 성별
    private String sName; // 관리자 이름
    private String stel; // 관리자 전화번호
    private String sEmail; // 관리자 이메일
    private byte[] sProfileImage; // 관리자 프로필 이미지
    private String sAdr; // 관리자 주소

}
