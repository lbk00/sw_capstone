package com.example.capstone.User;



import com.example.capstone.Search.UserSearch;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long>, UserSearch {

    User findBycID(String cID);
}
