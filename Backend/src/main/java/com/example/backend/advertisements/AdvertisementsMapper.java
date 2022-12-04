package com.example.backend.advertisements;

import com.example.backend.images.ImagesDTO;
import org.springframework.stereotype.Component;

@Component
public class AdvertisementsMapper {
    public Advertisements mapDTOToEntity(AdvertisementsDTO dto) {
        return Advertisements.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .isBought(false)
                .build();
    }

    public AdvertisementsDTO mapEntityToDTO(Advertisements dto) {
        return AdvertisementsDTO.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .isBought(false)
                .build();
    }
}
