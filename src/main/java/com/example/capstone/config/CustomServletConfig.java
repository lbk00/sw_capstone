package com.example.capstone.config;

import com.example.capstone.Controller.formatter.LocalDateFormatter;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Log4j2
public class CustomServletConfig implements WebMvcConfigurer{
    @Override
    public void addFormatters(FormatterRegistry registry) {

        log.info("addFormatters............");

        registry.addFormatter(new LocalDateFormatter());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // React 앱이 실행 중인 주소 (CORS 허용 도메인)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(true) // 세션 쿠키 전달 허용
                .maxAge(500); // 캐싱 시간 설정
    }
}
