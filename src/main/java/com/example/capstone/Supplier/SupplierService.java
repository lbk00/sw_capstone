package com.example.capstone.Supplier;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.ManagerResponseDTO;
import com.example.capstone.DTO.SupplierResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;



@Transactional
public interface SupplierService {
    SupplierDTO get(Long supplierId);

    Long register(SupplierDTO dto);

    void modify(SupplierDTO dto);

    void remove(Long supplierId);

    SupplierResponseDTO<SupplierDTO> getSupplierList(PageRequestDTO pageRequestDTO);


    default SupplierDTO entityToDTO(Supplier supplier){


        return SupplierDTO.builder()

                .supplierId(supplier.getSupplierId())
                .sID(supplier.getSID())
                .sPW(supplier.getSPW())
                .sGender(supplier.getSGender())
                .sName(supplier.getSName())
                .stel(supplier.getStel())
                .sEmail(supplier.getSEmail())
                .sAdr(supplier.getSAdr())
                .sProfileImage(supplier.getSProfileImage())
                .build();



    }

    default Supplier dtoToEntity(SupplierDTO supplierDTO){

        return Supplier.builder()

                .supplierId(supplierDTO.getSupplierId())
                .sID(supplierDTO.getSID())
                .sPW(supplierDTO.getSPW())
                .sGender(supplierDTO.getSGender())
                .sName(supplierDTO.getSName())
                .stel(supplierDTO.getStel())
                .sEmail(supplierDTO.getSEmail())
                .sAdr(supplierDTO.getSAdr())
                .sProfileImage(supplierDTO.getSProfileImage())
                .build();

    }


}
