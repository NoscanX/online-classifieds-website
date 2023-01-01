package com.example.backend.advertisements;

import com.example.backend.users.UserAccount;
import com.example.backend.users.UserAccountDTO;
import com.example.backend.users.UserWrapper;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/advertisement")
public class AdvertisementsController {
    private final AdvertisementsService advertisementsService;

    //proper postmapping
    @PostMapping("/add/me/{idCat}")
    public ResponseEntity<?> addAdvertisement(Authentication authentication, @PathVariable("idCat") Long idCat, @RequestBody AdvertisementsDTO advertisementsDTO) {
        UserAccount loggedUser = Optional.ofNullable(authentication)
                .filter(f -> f.getPrincipal() instanceof UserWrapper)
                .map(Authentication::getPrincipal)
                .map(UserWrapper.class::cast)
                .map(UserWrapper::getUserAccount)
                .orElse(null);
        advertisementsService.addAdvertisement(loggedUser.getId(), idCat, advertisementsDTO);
        return ResponseEntity.ok("Dodano ogloszenie");
    }

    //image
//    @PostMapping("/add/me/{idCat}")
//    public ResponseEntity<?> addAdvertisement(Authentication authentication, @PathVariable("idCat") Long idCat, @RequestParam MultipartFile image, @RequestBody AdvertisementsDTO advertisementsDTO) throws IOException {
//        UserAccount loggedUser = Optional.ofNullable(authentication)
//                .filter(f -> f.getPrincipal() instanceof UserWrapper)
//                .map(Authentication::getPrincipal)
//                .map(UserWrapper.class::cast)
//                .map(UserWrapper::getUserAccount)
//                .orElse(null);
//        advertisementsService.addAdvertisement(loggedUser.getId(), idCat, advertisementsDTO, image);
//        return ResponseEntity.ok("Dodano ogloszenie");
//    }


    @GetMapping("/getAllAdvertisements")
    public ResponseEntity<List<AdvertisementsDTO>> getAllAdvertisements() {
        return ResponseEntity.ok(advertisementsService.getAllAdvertisements());
    }

    @GetMapping("/getAllAdvertisementsByUserId/me")
    public ResponseEntity<List<AdvertisementsDTO>> getAllAdvertisementsByUserId(Authentication authentication) {
        UserAccount loggedUser = Optional.ofNullable(authentication)
                .filter(f -> f.getPrincipal() instanceof UserWrapper)
                .map(Authentication::getPrincipal)
                .map(UserWrapper.class::cast)
                .map(UserWrapper::getUserAccount)
                .orElse(null);
        return ResponseEntity.ok(advertisementsService.getAllAdvertisementsByUserId(loggedUser.getId()));
    }

    @PutMapping("/updateAdvertisementState/{id}")
    public ResponseEntity<?> updateAdvertisementState(@PathVariable("id")Long id, @RequestParam Boolean isActive) {
        advertisementsService.updateAdvertisementState(id, isActive);
        return ResponseEntity.ok("Update advert state ok");
    }

    @PutMapping("/updateAdvertisement/{id}")
    public ResponseEntity<?> updateAdvertisement(@PathVariable("id") Long id, @RequestBody AdvertisementsDTO advertisementDTO) {
        advertisementsService.updateAdvertisementDetails(id, advertisementDTO);
        return ResponseEntity.ok("Advert update ok");
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdvertisement(@PathVariable("id") Long id) {
        advertisementsService.deleteAdvertisementById(id);
    }

    @DeleteMapping("/deleteAdvertisements")
    public void deleteAdvertisements(){
        advertisementsService.deleteAdvertisements();
    }
}
