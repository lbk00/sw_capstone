package com.example.capstone.Supplier;


import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.SupplierResponseDTO;
import com.example.capstone.User.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("api/supplier")
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping("/{supplierId}")
    public SupplierDTO get(@PathVariable("userId") Long supplierId) {
        log.info("get............" + supplierId);
        return supplierService.get(supplierId);
    }

    @GetMapping("/list")
    public SupplierResponseDTO<SupplierDTO> list(PageRequestDTO pageRequestDTO ) {
        log.info(pageRequestDTO);
        return supplierService.getSupplierList(pageRequestDTO);
    }

    @PostMapping("/signup") // 관리자 회원가입 api
    public Map<String, Long> register(@RequestBody SupplierDTO dto) {
        log.info("register............" + dto);
        Long supplierId = supplierService.register(dto);
        return Map.of("supplierIdrId", supplierId);
    }

    @PutMapping("/{supplierId}")
    public Map<String, String> modify(@PathVariable("supplierId") Long supplierId,
                                      @RequestBody SupplierDTO dto) {
        log.info("modify............" + supplierId + " " + dto);
        supplierService.modify(dto);
        return Map.of("result", "success");
    }

    @DeleteMapping("/{supplierId}")
    public Map<String, String> remove(@PathVariable("supplierId") Long supplierId) {
        log.info("remove............" + supplierId);
        supplierService.remove(supplierId);
        return Map.of("result", "success");
    }



}
