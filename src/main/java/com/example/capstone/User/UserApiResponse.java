package com.example.capstone.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserApiResponse {
    private boolean success;
    private String message;
}
