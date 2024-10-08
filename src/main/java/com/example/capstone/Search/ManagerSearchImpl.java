package com.example.capstone.Search;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.Manager.Manager;
import com.example.capstone.Manager.QManager;
import com.querydsl.jpa.JPQLQuery;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

@Log4j2
public class ManagerSearchImpl extends QuerydslRepositorySupport implements ManagerSearch{

    public ManagerSearchImpl() {

           super(Manager.class);
    }


    @Override
    public Page<Manager> search1(PageRequestDTO pageRequestDTO) {

        log.info("ManagerSearchImpl search1............");

        QManager manager = QManager.manager;

        JPQLQuery<Manager> query = from(manager);



        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(),
                Sort.by("userId").ascending());

        this.getQuerydsl().applyPagination(pageable, query);

        List<Manager> list = query.fetch(); // 목록 데이터

        long total = query.fetchCount(); // 전체 개수

        return new PageImpl<>(list, pageable, total); // 페이지 처리 결과 반환
    }
}
