package com.example.backend.advertisements;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AdvertisementsMapper {
    public Advertisements mapDTOToEntity(AdvertisementsDTO dto) {
        return Advertisements.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .image(dto.getImage())
                .isAdvertisementActive(dto.getIsAdvertisementActive())
                .advertisementDate(LocalDateTime.now())
                .build();
    }

    public AdvertisementsDTO mapEntityToDTO(Advertisements dto) {
        return AdvertisementsDTO.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .image(dto.getImage())
                .isAdvertisementActive(dto.getIsAdvertisementActive())
                .data(dto.getAdvertisementDate())
                .userId(dto.getUserAccount().getId())
                .categoryId(dto.getCategories().getId())
                .build();
    }
}
