package com.example.capstone.Manager;



import com.example.capstone.Search.ManagerSearch;
import com.example.capstone.User.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Long>, ManagerSearch{
    Optional<Manager> findByUserId(Long userId);

}