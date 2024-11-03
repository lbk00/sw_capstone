package com.example.capstone.User;


import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.UserResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Transactional
public interface UserService {


    UserDTO get(Long user_Id);


    void modify(UserDTO dto);

    void remove(Long user_Id);

    User registerUser(UserDTO dto);
    Optional<User> findBycID(String cID);


    UserResponseDTO<UserDTO> getUserList(PageRequestDTO pageRequestDTO);


    default UserDTO entityToDTO(User user){


        return UserDTO.builder()

                .user_Id(user.getUser_Id())
                .cID(user.getCID())
                .cPW(user.getCPW())
                .cName(user.getCName())
                .cGender(user.getCGender())
                .ctel(user.getCtel())
                .cEmail(user.getCEmail())
                .cAdr(user.getCAdr())
                .role(user.getRole())
                .build();

    }

    default User dtoToEntity(UserDTO userDTO){

        return User.builder()

                .user_Id(userDTO.getUser_Id())
                .cID(userDTO.getCID())
                .cPW(userDTO.getCPW())
                .cName(userDTO.getCName())
                .cGender(userDTO.getCGender())
                .ctel(userDTO.getCtel())
                .cEmail(userDTO.getCEmail())
                .cAdr(userDTO.getCAdr())
                .role(userDTO.getRole())
                .build();

    }


}