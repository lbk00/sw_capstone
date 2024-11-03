package com.example.capstone.Search;

import com.example.capstone.DTO.PageRequestDTO;
import com.example.capstone.User.User;
import com.example.capstone.User.QUser;
import com.querydsl.jpa.JPQLQuery;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

@Log4j2
public class UserSearchImpl extends QuerydslRepositorySupport implements UserSearch{

    public UserSearchImpl() {
        super(User.class);
    }

    @Override
    public Page<User> search3(PageRequestDTO pageRequestDTO) {
        log.info("UserSearchImpl search3............");

        QUser user = QUser.user;

        JPQLQuery<User> query = from(user);

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("user_Id").ascending()); // 올바른 필드 이름 사용

        this.getQuerydsl().applyPagination(pageable, query);

        List<User> list = query.fetch(); // 목록 데이터

        long total = query.fetchCount(); // 전체 개수

        return new PageImpl<>(list, pageable, total); // 페이지 처리 결과 반환
    }
}