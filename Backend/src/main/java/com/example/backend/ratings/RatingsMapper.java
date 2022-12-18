package com.example.backend.ratings;

import com.example.backend.advertisements.Advertisements;
import com.example.backend.advertisements.AdvertisementsDTO;
import org.springframework.stereotype.Component;

@Component
public class RatingsMapper {
    public Ratings mapDTOToEntity(RatingsDTO dto) {
        return Ratings.builder()
                .rating(dto.getRating())
                .build();
    }

    public RatingsDTO mapEntityToDTO(Ratings dto) {
        return RatingsDTO.builder()
                .rating(dto.getRating())
                .build();
    }
}
