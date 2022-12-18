package com.example.backend.advertisements;

import org.springframework.stereotype.Component;

@Component
public class AdvertisementsMapper {
    public Advertisements mapDTOToEntity(AdvertisementsDTO dto) {
        return Advertisements.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .isAdvertisementActive(dto.getIsAdvertisementActive())
                .build();
    }

    public AdvertisementsDTO mapEntityToDTO(Advertisements dto) {
        return AdvertisementsDTO.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .isAdvertisementActive(dto.getIsAdvertisementActive())
                .build();
    }
}
