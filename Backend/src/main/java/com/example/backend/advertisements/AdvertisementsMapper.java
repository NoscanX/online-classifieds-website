package com.example.backend.advertisements;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class AdvertisementsMapper {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
    public Advertisements mapDTOToEntity(AdvertisementsDTO dto) {
        return Advertisements.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .image(dto.getImage())
                .isAdvertisementActive(dto.getIsAdvertisementActive())
                .advertisementDate(LocalDateTime.now().format(formatter))
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
                .advertisementerEmail(dto.getUserAccount().getEmail())
                .categoryId(dto.getCategories().getId())
                .build();
    }
}
