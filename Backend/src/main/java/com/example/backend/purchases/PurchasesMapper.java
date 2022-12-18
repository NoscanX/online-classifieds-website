package com.example.backend.purchases;

import org.springframework.stereotype.Component;

@Component
public class PurchasesMapper {
    public Purchases mapDTOToEntity(PurchasesDTO dto) {
        return Purchases.builder()
                .id(dto.getId())
                .payment(dto.getPayment())
                .date(dto.getDate())
                .build();
    }

    public PurchasesDTO mapEntityToDTO(Purchases dto) {
        return PurchasesDTO.builder()
                .date(dto.getDate())
                .build();
    }
}
