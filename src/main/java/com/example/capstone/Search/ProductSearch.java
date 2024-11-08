package com.example.capstone.Search;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.Product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ProductSearch {

    Page<Product> search4(PageRequestDTO pageRequestDTO);
}
