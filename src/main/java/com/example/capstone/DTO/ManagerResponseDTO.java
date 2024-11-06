package com.example.capstone.DTO;

import com.example.capstone.Manager.ManagerDTO;
import lombok.Builder;
import lombok.Data;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class ManagerResponseDTO<E extends ManagerDTO> {

    private List<E> dtoList;
    private List<ManagerDTO> managerList;
    private List<Integer> pageNumList;
    private PageRequestDTO pageRequestDTO;
    private boolean prev, next;
    private int totalCount, prevPage, nextPage, totalPage, current;

    @Builder(builderMethodName = "withAll")
    public ManagerResponseDTO(List<E> dtoList, List<ManagerDTO> managerList, PageRequestDTO pageRequestDTO, long total) {
        this.dtoList = dtoList.stream()
                .sorted(Comparator.comparingLong(ManagerDTO::getUserId))
                .collect(Collectors.toList());

        this.managerList = managerList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int) total;

        int start = Math.max(1, pageRequestDTO.getPage() - pageRequestDTO.getSize() / 2);
        int end = Math.min((int) (Math.ceil(total / (double) pageRequestDTO.getSize())), pageRequestDTO.getPage() + pageRequestDTO.getSize() / 2);
        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        // 마지막 페이지 계산
        end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10;
        start = end - 9;
        int last = (int) (Math.ceil(totalCount / (double) pageRequestDTO.getSize()));
        end = end > last ? last : end;

        this.prev = start > 1;
        this.next = totalCount > end * pageRequestDTO.getSize();

        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        this.prevPage = prev ? start - 1 : 0;
        this.nextPage = next ? end + 1 : 0;
    }
}