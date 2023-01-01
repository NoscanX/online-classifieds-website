package com.example.backend.advertisements;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class AdvertisementsDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
//    private byte[] image;
    private String image;
    private Boolean isAdvertisementActive;
    private Long categoryId; //czy to potrzebne?
    private Long userId;
    private String data;
    private String advertisementerEmail;
}
