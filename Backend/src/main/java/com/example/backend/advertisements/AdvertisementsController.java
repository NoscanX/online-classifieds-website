package com.example.backend.advertisements;

import com.example.backend.users.UserWrapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/advertisement")
public class AdvertisementsController {
    private final AdvertisementsService advertisementsService;

    //logged user cos tam??
//    @PostMapping("/{id}")
//    public ResponseEntity<?> addAdvertisement(@PathVariable("id") Long id, @RequestBody AdvertisementsDTO advertisementsDTO) {
//        advertisementsService.addAdvertisement(id, advertisementsDTO);
//        return ResponseEntity.ok("Dodano ogloszenie");
//    }

    @PostMapping("/{id}")
    public ResponseEntity<?> addAdvertisement(@PathVariable("id") Long id, @RequestBody AdvertisementsDTO advertisementsDTO, Authentication authentication) {
        UserWrapper loggedUser = Optional.ofNullable(authentication)
                .filter(filter -> filter.getPrincipal() instanceof UserWrapper)
                .map(Authentication::getPrincipal)
                .map(UserWrapper.class::cast)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Add ad bad request"));
        advertisementsService.addAdvertisement(id, advertisementsDTO, loggedUser);
        return ResponseEntity.ok("Dodano ogloszenie");
    }

    @GetMapping("/getAllAdvertisements")
    public ResponseEntity<List<AdvertisementsDTO>> getAllAdvertisements() {
        return ResponseEntity.ok(advertisementsService.getAllAdvertisements());
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAdvertisement(@RequestBody AdvertisementsDTO advertisementsDTO) {
        advertisementsService.updateAdvertisement(advertisementsDTO);
        return ResponseEntity.ok("Update advert ok");
    }

    @PutMapping("/updateAdvertisementState/{id}")
    public ResponseEntity<?> updateAdvertisementState(@PathVariable("id")Long id, @RequestParam Boolean isActive) {
        advertisementsService.updateAdvertisementState(id, isActive);
        return ResponseEntity.ok("Update advert ok");
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdvertisement(@PathVariable("id") Long id) {
        advertisementsService.deleteAdvertisementById(id);
    }

    @DeleteMapping("/deleteAdvertisements")
    public void deleteReviews(){
        advertisementsService.deleteAdvertisements();
    }
}
