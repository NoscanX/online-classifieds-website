package com.example.backend.ratings;

import com.example.backend.advertisements.AdvertisementsDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/ratings")
public class RatingsController {
    private final RatingsService ratingsService;
    @PostMapping("/add/{id}")
    public ResponseEntity<?> addRating(@PathVariable("id") Long id, @RequestBody RatingsDTO ratingsDTO) {
        ratingsService.addRating(id, ratingsDTO);
        return ResponseEntity.ok("Dodano ogloszenie");
    }
}
