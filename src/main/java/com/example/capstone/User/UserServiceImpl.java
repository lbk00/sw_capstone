package com.example.capstone.User;

import com.example.capstone.DTO.UserResponseDTO;
import com.example.capstone.DTO.PageRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User registerUser(UserDTO dto) {

        User user = new User();
        user.setCID(dto.getCID());
        user.setCPW(dto.getCPW());
        user.setCName(dto.getCName());
        user.setCGender(dto.getCGender());

        user.setCtel(dto.getCtel());
        user.setCEmail(dto.getCEmail());
        user.setCProfileImage(dto.getCProfileImage());
        user.setCAdr(dto.getCAdr());
        user.setRole(dto.getRole());

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findBycID(String cID) {
        return Optional.ofNullable(userRepository.findBycID(cID));
    }

    private PageRequest dtoToPageRequest(PageRequestDTO dto) {
        return PageRequest.of(dto.getPage() - 1, dto.getSize(), Sort.by("user_Id"));
    }

    @Override
    public UserDTO get(Long user_Id) {

        Optional<User> result = userRepository.findById(user_Id);

        User user = result.orElseThrow();

        return entityToDTO(user);
    }

    @Override
    public void modify(UserDTO dto) {

        Optional<User> result = userRepository.findById(dto.getUser_Id());

        User User = result.orElseThrow();
        User.changecID(dto.getCID());
        User.changecPW(dto.getCPW());
        User.changecName(dto.getCGender());
        User.changecGender(dto.getCGender());

        User.changectel(dto.getCtel());
        User.changecEmail(dto.getCEmail());
        User.changecAdr(dto.getCAdr());

        userRepository.save(User);


    }

    @Override
    public void remove(Long user_Id) {

        userRepository.deleteById(user_Id);
    }

    @Override
    public UserResponseDTO<UserDTO> getUserList(PageRequestDTO pageRequestDTO) {
        PageRequest pageable = dtoToPageRequest(pageRequestDTO);
        Page<User> result = userRepository.search3(pageRequestDTO);

        List<UserDTO> dtoList = result.get().map(user -> entityToDTO(user)).collect(Collectors.toList());

        UserResponseDTO<UserDTO> responseDTO =
                UserResponseDTO.<UserDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .total(result.getTotalElements())
                        .build();

        return responseDTO;
    }


}

