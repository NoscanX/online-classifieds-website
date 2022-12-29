package com.example.backend.purchases;

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
//    private final PurchasesRepository purchasesRepository;

    @PostMapping("/{idUser}/{idAd}")
    public ResponseEntity<?> addPurchase(@PathVariable("idUser") Long idUser,@PathVariable("idAd") Long idAd, @RequestBody PurchasesDTO purchasesDTO) {

        purchasesService.addPurchase(idUser, idAd, purchasesDTO);
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

    //ratings test
//    @GetMapping("/get")
//    public ResponseEntity<Double> get() {
//        return ResponseEntity.ok(purchasesRepository.getAvgRating());
//    }
}
