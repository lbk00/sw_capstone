package com.example.capstone.Manager;



import com.example.capstone.Search.ManagerSearch;
import com.example.capstone.User.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long>, ManagerSearch{



}