package com.example.capstone.Product;

import com.example.capstone.DTO.PageRequestDTO;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class ProductListResponseDTO<E extends ProductDTO>{

    private List<E> dtoList;

    private List<ProductDTO> productList;

    private List<Integer> pageNumList;

    private PageRequestDTO pageRequestDTO;

    private boolean prev,next;

    private int totalCount, prevPage, nextPage, totalPage, current;

    public static ProductListResponseDTO toDTO(List<Product> productList) {
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (Product product : productList) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setPrice(product.getPrice());
            productDTO.setAmount(product.getAmount());
            productDTO.setSize(product.getSize());
            productDTO.setItemType(product.getItemType());
            productDTO.setItemImage(product.getItemImage());
            productDTOList.add(productDTO);
        }
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        long total = productDTOList.size();
        return new ProductListResponseDTO(productDTOList, productDTOList, pageRequestDTO, total);
    }

    @Builder(builderMethodName = "withAll")
    public ProductListResponseDTO(List<E> dtoList, List<ProductDTO> productList, PageRequestDTO pageRequestDTO, long total) {
        this.dtoList = dtoList.stream()
                .sorted(Comparator.comparingLong(ProductDTO::getId))
                .collect(Collectors.toList());

        this.productList = productList;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int) total;
        int start = Math.max(1, pageRequestDTO.getPage() - pageRequestDTO.getSize());
        int end = Math.min((int) (Math.ceil(total / (double) pageRequestDTO.getSize())), pageRequestDTO.getPage() + pageRequestDTO.getSize());
        this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10;

        start = end - 9;

        int last = (int) (Math.ceil(totalCount / (double) pageRequestDTO.getSize()));

        end = end > last ? last : end;

        this.prev = start > 1;

        this.next = totalCount > end * pageRequestDTO.getSize();

        IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        this.prevPage = prev ? start - 1 : 0;

        this.nextPage = next ? end + 1 : 0;
    }
}