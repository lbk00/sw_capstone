package com.example.capstone.Search;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.Supplier.QSupplier;
import com.example.capstone.Supplier.Supplier;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@Log4j2
public class SupplierSearchImpl extends QuerydslRepositorySupport implements SupplierSearch{

    public SupplierSearchImpl() {
        super(Supplier.class);
    }



    @Override
    public Page<Supplier> search2(PageRequestDTO pageRequestDTO) {
        log.info("SupplierSearchImpl search2............");

        QSupplier supplier = QSupplier.supplier;

        JPQLQuery<Supplier> query = from(supplier);

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(),
                Sort.by("supplierId").ascending());


        this.getQuerydsl().applyPagination(pageable, query);

        List<Supplier> list = query.fetch(); // 목록 데이터

        long total = query.fetchCount(); // 전체 개수

        return new PageImpl<>(list, pageable, total); // 페이지 처리 결과 반환
    }
}