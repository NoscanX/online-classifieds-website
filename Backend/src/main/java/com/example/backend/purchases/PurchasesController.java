package com.example.backend.purchases;

import com.example.backend.advertisements.AdvertisementsDTO;
import com.example.backend.users.UserAccount;
import com.example.backend.users.UserAccountRepository;
import com.example.backend.users.UserWrapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/purchase")
public class PurchasesController {
    private final PurchasesService purchasesService;

    //ratings test
    private final UserAccountRepository userAccountRepository;

    @PostMapping("/product/me/{idAd}")
    public ResponseEntity<?> addPurchase(Authentication authentication,@PathVariable("idAd") Long idAd, @RequestBody PurchasesDTO purchasesDTO) {
        UserAccount loggedUser = Optional.ofNullable(authentication)
                .filter(f -> f.getPrincipal() instanceof UserWrapper)
                .map(Authentication::getPrincipal)
                .map(UserWrapper.class::cast)
                .map(UserWrapper::getUserAccount)
                .orElse(null);
        purchasesService.addPurchase(loggedUser.getId(), idAd, purchasesDTO);
        return ResponseEntity.ok("Dodano ogloszenie");
    }

//    @PostMapping("/{id}")
//    public ResponseEntity<?> addPurchase(@PathVariable("id") Long id, @RequestBody PurchasesDTO purchasesDTO, Authentication authentication) {
//        UserWrapper loggedUser = Optional.ofNullable(authentication)
//                .filter(filter -> filter.getPrincipal() instanceof UserWrapper)
//                .map(Authentication::getPrincipal)
//                .map(UserWrapper.class::cast)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Add ad bad request"));
//        purchasesService.addPurchase(id, purchasesDTO, loggedUser);
//        return ResponseEntity.ok("Dodano ogloszenie");
//    }

    @GetMapping("/getAllPurchases")
    public ResponseEntity<List<PurchasesDTO>> getAllPurchases() {
        return ResponseEntity.ok(purchasesService.getAllPurchases());
    }

    @GetMapping("/getAllPurchasesByUserId/me")
    public ResponseEntity<List<PurchasesDTO>> getAllPurchasesByUserId(Authentication authentication) {
        UserAccount loggedUser = Optional.ofNullable(authentication)
                .filter(f -> f.getPrincipal() instanceof UserWrapper)
                .map(Authentication::getPrincipal)
                .map(UserWrapper.class::cast)
                .map(UserWrapper::getUserAccount)
                .orElse(null);
        return ResponseEntity.ok(purchasesService.getAllPurchasesByUserId(loggedUser.getId()));
    }

    @GetMapping("/getAllPurchasesByAdvertisementerId/me")
    public ResponseEntity<List<PurchasesDTO>> getAllPurchasesByAdvertisementerId(Authentication authentication) {
        UserAccount loggedUser = Optional.ofNullable(authentication)
                .filter(f -> f.getPrincipal() instanceof UserWrapper)
                .map(Authentication::getPrincipal)
                .map(UserWrapper.class::cast)
                .map(UserWrapper::getUserAccount)
                .orElse(null);
        return ResponseEntity.ok(purchasesService.getAllPurchasesByAdvertisementerId(loggedUser.getId()));
    }

    @PutMapping("/updateRating/{purchaseId}")
    public ResponseEntity<?> updatePurchaseRating(@PathVariable("purchaseId") Long id, @RequestBody PurchasesDTO purchasesDTO) {
        purchasesService.updatePurchaseRating(id, purchasesDTO);
        return ResponseEntity.ok("Purchase rating changed");
    }
}
