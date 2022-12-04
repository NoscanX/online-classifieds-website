package com.example.backend.users;

import com.example.backend.advertisements.AdvertisementsDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/user")
public class UserAccountController {
    private final UserAccountService userAccountService;

    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody UserRegisterRequest request) {
        userAccountService.registerUser(request);

        return ResponseEntity.ok("Register OK.");
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserAccountDTO>> getAllUsers() {
        return ResponseEntity.ok(userAccountService.getAllUsers());
    }

    @PostMapping("/{id}/advertisement")
    public ResponseEntity<?> addAdvertisement(@PathVariable("id") Long id, @RequestBody AdvertisementsDTO advertisementsDTO) {
        userAccountService.addAdvertisement(id, advertisementsDTO);
        return ResponseEntity.ok("Dodano ogloszenie");
    }
}
