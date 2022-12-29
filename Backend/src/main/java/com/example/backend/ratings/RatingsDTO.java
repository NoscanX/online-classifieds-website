package com.example.backend.ratings;

import com.example.backend.purchases.Purchases;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RatingsDTO {
    private Long id;
    private Double rating;
    private Long purchaseId;
}
