package com.example.backend.ratings;

import com.example.backend.advertisements.Advertisements;
import com.example.backend.advertisements.AdvertisementsDTO;
import com.example.backend.categories.Categories;
import com.example.backend.purchases.Purchases;
import com.example.backend.purchases.PurchasesRepository;
import com.example.backend.users.UserAccount;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class RatingsService {
    private final RatingsRepository ratingsRepository;
    private final PurchasesRepository purchasesRepository;
    private final RatingsMapper ratingsMapper;
    public void addRating(Long Id, RatingsDTO ratingsDTO) {
        Purchases purchases = purchasesRepository.findById(Id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
        Ratings ratings = ratingsMapper.mapDTOToEntity(ratingsDTO);
        ratings.setPurchases(purchases);
        ratingsRepository.save(ratings);
    }
}
