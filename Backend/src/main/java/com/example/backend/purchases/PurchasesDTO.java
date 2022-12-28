package com.example.backend.purchases;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class PurchasesDTO {
    private Long id;
    private String date;
    private Payment payment;
    private Long userId;
    private Long advertisementId;
}
