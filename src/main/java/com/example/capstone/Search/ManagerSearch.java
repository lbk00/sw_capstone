package com.example.capstone.Search;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.Manager.Manager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ManagerSearch {

    Page<Manager> search1(PageRequestDTO pageRequestDTO);
}
