package com.example.capstone.Manager;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.ManagerResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class ManagerServiceImpl implements ManagerService{

    private final ManagerRepository managerRepository;

    private PageRequest dtoToPageRequest(PageRequestDTO dto) {
        return PageRequest.of(dto.getPage() - 1, dto.getSize(), Sort.by("userId"));
    }

    @Override
    public ManagerDTO get(Long userid) {

        Optional<Manager> result = managerRepository.findById(userid);

        Manager manager = result.orElseThrow();

        return entityToDTO(manager);
    }

    @Override
    public Long register(ManagerDTO dto) {

        Manager manager = dtoToEntity(dto);

        Manager result = managerRepository.save(manager);

        return result.getUserId();
    }

    @Override
    public void modify(ManagerDTO dto) {

        Optional<Manager> result = managerRepository.findById(dto.getUserId());

        Manager manager = result.orElseThrow();
        manager.changemID(dto.getMID());
        manager.changemPW(dto.getMPW());
        manager.changemName(dto.getMName());
        manager.changemGender(dto.getMGender());
        manager.changembirthDate(dto.getMbirthDate());
        manager.changemtel(dto.getMtel());
        manager.changemEmail(dto.getMEmail());
        manager.changeuAdr(dto.getUAdr());

        managerRepository.save(manager);




    }

    @Override
    public void remove(Long userid) {

        managerRepository.deleteById(userid);
    }

    @Override
    public ManagerResponseDTO<ManagerDTO> getManagerList(PageRequestDTO pageRequestDTO) {
        PageRequest pageable = dtoToPageRequest(pageRequestDTO);
        Page<Manager> result = managerRepository.search1(pageRequestDTO);

        List<ManagerDTO> dtoList = result.get().map(manager -> entityToDTO(manager)).collect(Collectors.toList());

        ManagerResponseDTO<ManagerDTO> responseDTO =
                ManagerResponseDTO.<ManagerDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .total(result.getTotalElements())
                        .build();

        return responseDTO;
    }


}