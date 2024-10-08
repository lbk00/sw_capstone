package com.example.capstone.Supplier;


import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.ManagerResponseDTO;
import com.example.capstone.DTO.SupplierResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService{

    private final SupplierRepository supplierRepository;

    private PageRequest dtoToPageRequest(PageRequestDTO dto) {
        return PageRequest.of(dto.getPage() - 1, dto.getSize(), Sort.by("userId"));
    }

    @Override
    public SupplierDTO get(Long supplierId) {

        Optional<Supplier> result = supplierRepository.findById(supplierId);

        Supplier supplier = result.orElseThrow();

        return entityToDTO(supplier);
    }

    @Override
    public Long register(SupplierDTO dto) {

        Supplier supplier = dtoToEntity(dto);

        Supplier result = supplierRepository.save(supplier);

        return result.getSupplierId();
    }

    @Override
    public void modify(SupplierDTO dto) {

    }

    @Override
    public void remove(Long supplierId) {

        supplierRepository.deleteById(supplierId);
    }

    @Override
    public SupplierResponseDTO<SupplierDTO> getSupplierList(PageRequestDTO pageRequestDTO) {
        PageRequest pageable = dtoToPageRequest(pageRequestDTO);
        Page<Supplier> result = supplierRepository.search2(pageRequestDTO);

        List<SupplierDTO> dtoList = result.get().map(supplier -> entityToDTO(supplier)).collect(Collectors.toList());

        SupplierResponseDTO<SupplierDTO> responseDTO =
                SupplierResponseDTO.<SupplierDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .total(result.getTotalElements())
                        .build();

        return responseDTO;
    }


}
