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
    private String sName; // 공급업체 이름
    private String stel; // 공급업체 전화번호
    private String sEmail; // 공급업체 이메일
    private byte[] sProfileImage; // 공급업체 프로필 이미지
    private String sAdr; // 공급업체 주소

}
