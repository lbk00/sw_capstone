package com.example.capstone.User;

import com.example.capstone.DTO.LoginDTO;
import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.UserResponseDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private final UserService userservice;


    //사용자 조회 api
    @GetMapping("/{user_Id}")
    public UserDTO get(@PathVariable("user_Id") Long user_Id) {
        log.info("get............" + user_Id);
        return userservice.get(user_Id);
    }

    //사용자 목록 조회 api
    @GetMapping("/list")
    public UserResponseDTO<UserDTO> list(PageRequestDTO pageRequestDTO ) {
        log.info(pageRequestDTO);
        return userservice.getUserList(pageRequestDTO);
    }
    //사용자 등록 api
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody UserDTO dto) {
        log.info("register............" + dto);
        Long user_Id = userservice.register(dto);
        return Map.of("user_Id", user_Id);
    }
    //사용자 정보 수정 api
    @PutMapping("/{user_Id}")
    public Map<String, String> modify(@PathVariable("user_Id") Long user_Id,
                                      @RequestBody UserDTO dto) {
        log.info("modify............" + user_Id + " " + dto);
        userservice.modify(dto);
        return Map.of("result", "success");
    }
    //사용자 삭제 api
    @DeleteMapping("/{user_Id}")
    public Map<String, String> remove(@PathVariable("user_Id") Long user_Id) {
        log.info("remove............" + user_Id);
        userservice.remove(user_Id);
        return Map.of("result", "success");
    }

    //사용자 회원가입 api
    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO dto) {
        userservice.registerUser(dto);
        return ResponseEntity.ok("회원가입 성공");
    }

    //사용자 로그인 api
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpSession session) {
        Optional<User> userOptional = userservice.findBycID(loginDTO.getCID());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (loginDTO.getCPW().equals(user.getCPW())) { // 비밀번호 비교
                // 로그인 성공 시 세션에 사용자 정보 저장
                session.setAttribute("loggedInUser", user);
                // Session의 유효 시간 설정 (1800초 = 30분)
                session.setMaxInactiveInterval(1800);
                return ResponseEntity.ok(new UserApiResponse(true, "로그인 성공")); // 성공 응답
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new UserApiResponse(false, "로그인 실패")); // 실패 응답
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new UserApiResponse(false, "로그\n" +
                    "\n" +
                    "\n인 실패")); // 실패 응답
        }
    }

    // 로그아웃 api 추가 , 세션 무효화
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // 세션 무효화
        return ResponseEntity.ok(new UserApiResponse(true, "로그아웃 성공"));
    }

    //현재 로그인된 사용자 정보 반환 api
    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser");

        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser); // 로그인된 사용자 정보 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 로그인되지 않은 경우
        }
    }

}


