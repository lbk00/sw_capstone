package com.example.capstone.Manager;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.ManagerResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("api/manager")
public class ManagerController {

    private final ManagerService managerService;

    //관리자 조회 api
    @GetMapping("/{userId}")
    public ManagerDTO get(@PathVariable("userId") Long userId) {
        log.info("get............" + userId);
        return managerService.get(userId);
    }

    //관리자 목록 조회 api
    @GetMapping("/list")
    public ManagerResponseDTO<ManagerDTO> list(PageRequestDTO pageRequestDTO ) {
        log.info(pageRequestDTO);
        return managerService.getManagerList(pageRequestDTO);
    }
    //관리자 등록 api
    @PostMapping("/")
    public Map<String, Long> register(@RequestBody ManagerDTO dto) {
        log.info("register............" + dto);
        Long userId = managerService.register(dto);
        return Map.of("userId", userId);
    }
    //관리자 정보 수정 api
    @PutMapping("/{userId}")
    public Map<String, String> modify(@PathVariable("userId") Long userId,
                                      @RequestBody ManagerDTO dto) {
        log.info("modify............" + userId + " " + dto);
        managerService.modify(dto);
        return Map.of("result", "success");
    }
    //관리자 삭제 api
    @DeleteMapping("/{userId}")
    public Map<String, String> remove(@PathVariable("userId") Long userId) {
        log.info("remove............" + userId);
        managerService.remove(userId);
        return Map.of("result", "success");
    }




}