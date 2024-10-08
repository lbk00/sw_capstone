package com.example.capstone.Search;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.Manager.Manager;
import com.example.capstone.Supplier.Supplier;
import org.springframework.data.domain.Page;

public interface SupplierSearch {

    Page<Supplier> search2(PageRequestDTO pageRequestDTO);
}
