package com.example.capstone.Search;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.User.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface UserSearch {

    Page<User> search3(PageRequestDTO pageRequestDTO);
}
