package com.example.capstone.config;

import com.example.capstone.User.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionManager {

    public static final String SESSION_COOKIE_NAME = "mySessionId";
    private Map<String, Object> sessionStore = new ConcurrentHashMap<>();

    // 세션 만료 메서드
    public void expire(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 기존 세션 가져오기
        if (session != null) {
            session.invalidate(); // 세션 무효화


        }
    }

    // 세션 생성 메서드
    public void createSession(User user, HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(); // 요청에서 세션 가져오기
        session.setAttribute("loggedInUser", user); // 사용자 정보를 세션에 저장
        session.setMaxInactiveInterval(1800); // 세션 유효 시간 설정 (1800초 = 30분)

        // 세션 쿠키 설정 (옵션)
        Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
        sessionCookie.setPath("/");
        sessionCookie.setHttpOnly(true);
        response.addCookie(sessionCookie); // 쿠키를 응답에 추가
    }


    public Object getSession(HttpServletRequest request) {
        Cookie cookie = findCookie(request, SESSION_COOKIE_NAME);
        if (cookie == null) {
            return null;
        }
        return sessionStore.get(cookie.getValue());
    }


    public Cookie findCookie(HttpServletRequest request, String cookieName) {
        if (request.getCookies() == null) {
            return null;
        }

        return Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals(cookieName))
                .findAny()
                .orElse(null);
    }
}