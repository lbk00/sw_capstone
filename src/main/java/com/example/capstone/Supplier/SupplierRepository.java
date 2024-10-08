package com.example.capstone.Supplier;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.Manager.Manager;
import com.example.capstone.Search.SupplierSearch;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long>, SupplierSearch {


}
