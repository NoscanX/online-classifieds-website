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
    private String advertisementName;
    private String advertisementDescription;
    private Double advertisementPrice;
    private String advertisementImage;
    private String advertisementDate;
    private Boolean advertisementIsActive;
    private String advertisementerEmail;
    private Long advertisementerId;
    private Long buyerId;
    private Long advertisementId;
    private Double rating;
    private String buyerName;
    private String buyerEmail;
    private String buyerAddress;
    private String buyerCity;
}
