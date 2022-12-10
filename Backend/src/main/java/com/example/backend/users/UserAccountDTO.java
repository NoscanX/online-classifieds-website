package com.example.backend.users;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserAccountDTO {
    private Long id;
    private String email;
    private String city;
    private String address;
    private String name;
    private Double userRating;
    private UserRole userRole;
    private Boolean isActive;
}
