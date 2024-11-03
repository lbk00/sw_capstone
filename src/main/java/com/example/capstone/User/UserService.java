package com.example.capstone.User;


import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.UserResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Transactional
public interface UserService {


    UserDTO get(Long user_Id);

    Long register(UserDTO dto);



    void modify(UserDTO dto);

    void remove(Long userid);

    User registerUser(UserDTO dto);
    Optional<User> findBycID(String cID);






    UserResponseDTO<UserDTO> getUserList(PageRequestDTO pageRequestDTO);


    default UserDTO entityToDTO(User User){


        return UserDTO.builder()

                .user_Id(User.getUser_Id())
                .cID(User.getCID())
                .cPW(User.getCPW())
                .cName(User.getCName())
                .cGender(User.getCGender())
                .ctel(User.getCtel())
                .cEmail(User.getCEmail())
                .cAdr(User.getCAdr())
                .role(User.getRole())
                .build();

    }

    default User dtoToEntity(UserDTO UserDTO){

        return User.builder()

                .user_Id(UserDTO.getUser_Id())
                .cID(UserDTO.getCID())
                .cPW(UserDTO.getCPW())
                .cName(UserDTO.getCName())
                .cGender(UserDTO.getCGender())
                .ctel(UserDTO.getCtel())
                .cEmail(UserDTO.getCEmail())
                .cAdr(UserDTO.getCAdr())
                .role(UserDTO.getRole())
                .build();

    }


}