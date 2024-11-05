package com.example.capstone.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Simple broker를 통해 메시지를 보낼 대상을 설정
        config.enableSimpleBroker("/topic"); // 클라이언트가 구독할 수 있는 주제
        config.setApplicationDestinationPrefixes("/app"); // 클라이언트가 서버로 메시지를 보낼 때 사용할 접두사
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // WebSocket 엔드포인트 설정
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:3000") // 리액트 앱의 출처
                .withSockJS(); // CORS 설정 포함
    }
}
