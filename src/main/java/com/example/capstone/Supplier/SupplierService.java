package com.example.capstone.Supplier;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.ManagerResponseDTO;
import com.example.capstone.DTO.SupplierResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;


@Service
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
                .sName(supplier.getSName())
                .stel(supplier.getStel())
                .sEmail(supplier.getSEmail())
                .sAdr(supplier.getSAdr())
                .build();



    }

    default Supplier dtoToEntity(SupplierDTO supplierDTO){

        return Supplier.builder()

                .supplierId(supplierDTO.getSupplierId())
                .sName(supplierDTO.getSName())
                .stel(supplierDTO.getStel())
                .sEmail(supplierDTO.getSEmail())
                .sAdr(supplierDTO.getSAdr())
                .build();

    }


}
