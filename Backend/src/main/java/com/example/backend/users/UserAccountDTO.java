package com.example.backend.users;

import com.example.backend.advertisements.AdvertisementsDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
    private Boolean isNonLocked;
    private List<AdvertisementsDTO> advertisementsList;
}
