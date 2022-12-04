package com.example.backend.users;

import com.example.backend.advertisements.AdvertisementsMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserAccountMapper {
    private final AdvertisementsMapper advertisementsMapper;
    public UserAccountDTO mapEntityToDTO(UserAccount user) {
        return UserAccountDTO.builder()
                .email(user.getEmail())
                .city(user.getCity())
                .address(user.getAddress())
                .name(user.getName())
                .build();
    }

    public UserAccount mapRegisterRequestToEntity(UserRegisterRequest request) {
        return UserAccount.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .name(request.getName())
                .city(request.getCity())
                .address(request.getAddress())
                .userRole(UserRole.USER)
                .userRating(0.0)
                .build();
    }
}
