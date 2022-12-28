package com.example.backend.purchases;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class PurchasesMapper {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
    public Purchases mapDTOToEntity(PurchasesDTO dto) {
        return Purchases.builder()
                .id(dto.getId())
                .payment(dto.getPayment())
                .date(LocalDateTime.now().format(formatter))
                .build();
    }

    public PurchasesDTO mapEntityToDTO(Purchases dto) {
        return PurchasesDTO.builder()
                .id(dto.getId())
                .date(dto.getDate())
                .payment(dto.getPayment())
                .advertisementId(dto.getAdvertisements().getId())
                .userId(dto.getUserAccount().getId())
                .build();
    }
}
