package com.example.backend.advertisements;

import com.example.backend.images.ImagesDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class AdvertisementsDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Boolean isBought;
    private List<ImagesDTO> images;
}
