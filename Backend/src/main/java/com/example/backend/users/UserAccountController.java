package com.example.backend.users;

import com.example.backend.advertisements.AdvertisementsDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/user")
public class UserAccountController {
    private final UserAccountService userAccountService;

    @PostMapping("/register")
    public ResponseEntity<String> saveUser(@RequestBody UserRegisterRequest request) {
        userAccountService.registerUser(request);

        return ResponseEntity.ok("Register OK.");
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserAccountDTO>> getAllUsers() {
        return ResponseEntity.ok(userAccountService.getAllUsers());
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<UserAccountDTO> getUserDetails(@PathVariable(value = "id") Long id) {
        UserAccount userAccount = userAccountService.getUserAccountById(id);
        UserAccountDTO userAccountDTO = userAccountService.convertUserAccountToUserAccountDTO(userAccount);
        return ResponseEntity.ok(userAccountDTO);
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody UserAccountDTO userAccountDTO) {
        userAccountService.updateUserAddress(userAccountDTO);
        return ResponseEntity.ok("Address upddate ok");
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userAccountService.deleteUserAccountById(id);
    }
    //do AdControllera /ad/new dodawanie updateowanie


}
