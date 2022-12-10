package com.example.backend.advertisements;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AdvertisementsDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String image;
    private Boolean isAdvertisementActive;
    private Long categoryId; //czy to potrzebne?
}
