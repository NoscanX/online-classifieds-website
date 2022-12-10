package com.example.backend.users;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserRegisterRequest {
    private String email;
    private String password;
}
