package com.example.capstone.Manager;


import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.DTO.ManagerResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public interface ManagerService {

    ManagerDTO get(Long userid);

    Long register(ManagerDTO dto);

    void modify(ManagerDTO dto);

    void remove(Long userid);

    ManagerResponseDTO<ManagerDTO> getManagerList(PageRequestDTO pageRequestDTO);


    default ManagerDTO entityToDTO(Manager manager){


        return ManagerDTO.builder()

                .userId(manager.getUserId())
                .mID(manager.getMID())
                .mPW(manager.getMPW())
                .mName(manager.getMName())
                .mGender(manager.getMGender())
                .mbirthDate(manager.getMbirthDate())
                .mtel(manager.getMtel())
                .mEmail(manager.getMEmail())
                .uAdr(manager.getUAdr())
                .build();

    }

    default Manager dtoToEntity(ManagerDTO managerDTO){

        return Manager.builder()

                .userId(managerDTO.getUserId())
                .mID(managerDTO.getMID())
                .mPW(managerDTO.getMPW())
                .mName(managerDTO.getMName())
                .mGender(managerDTO.getMGender())
                .mbirthDate(managerDTO.getMbirthDate())
                .mtel(managerDTO.getMtel())
                .mEmail(managerDTO.getMEmail())
                .uAdr(managerDTO.getUAdr())
                .build();

    }
}