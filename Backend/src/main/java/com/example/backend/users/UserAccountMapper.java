package com.example.backend.users;

import com.example.backend.advertisements.AdvertisementsMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserAccountMapper {
    public UserAccountDTO mapEntityToDTO(UserAccount user) {
        return UserAccountDTO.builder()
                .email(user.getEmail())
                .city(user.getCity())
                .address(user.getAddress())
                .name(user.getName())
                .userRating(user.getUserRating())
                .userRole(user.getUserRole())
                .isActive(user.getIsAccountActive())
                .build();
    }

    public UserAccount mapDTOToEntity(UserAccountDTO userAccountDTO) {
        return UserAccount.builder()
                .id(userAccountDTO.getId())
                .name(userAccountDTO.getName())
                .address(userAccountDTO.getAddress())
                .city(userAccountDTO.getCity())
                .build();
    }

    public UserAccount mapRegisterRequestToEntity(UserRegisterRequest request) {
        return UserAccount.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .name(request.getName())
                .build();
    }

}