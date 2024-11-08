package com.example.capstone.Search;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.Product.Product;
import com.example.capstone.Product.QProduct;
import com.querydsl.jpa.JPQLQuery;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

@Log4j2
public class ProductSearchImpl extends QuerydslRepositorySupport implements ProductSearch{

    public ProductSearchImpl() {

        super(Product.class);
    }


    @Override
    public Page<Product> search4(PageRequestDTO pageRequestDTO) {

        log.info("ProductSearchImpl search4............");

        QProduct product = QProduct.product;

        JPQLQuery<Product> query = from(product);



        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(),
                Sort.by("id").ascending());

        this.getQuerydsl().applyPagination(pageable, query);

        List<Product> list = query.fetch(); // 목록 데이터

        long total = query.fetchCount(); // 전체 개수

        return new PageImpl<>(list, pageable, total); // 페이지 처리 결과 반환
    }
}
