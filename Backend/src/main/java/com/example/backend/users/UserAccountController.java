package com.example.backend.users;

import com.example.backend.advertisements.AdvertisementsDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserAccountController {
    private final UserAccountService userAccountService;
    private final UserAccountRepository userAccountRepository;

    @PostMapping("/register")
    public ResponseEntity<String> saveUser(@RequestBody UserRegisterRequest request) {
        try {
            userAccountService.registerUser(request);

            return ResponseEntity.ok("Register OK.");
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
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

    @GetMapping("/me")
    public ResponseEntity<UserAccountDTO> getMe(Authentication authentication) {
        try {
            UserAccountDTO loggedUser = Optional.ofNullable(authentication)
                    .filter(f -> f.getPrincipal() instanceof UserWrapper)
                    .map(Authentication::getPrincipal)
                    .map(UserWrapper.class::cast)
                    .map(UserWrapper::getUserAccount)
                    .map(userAccountService::convertUserAccountToUserAccountDTO)
                    .orElse(null);
            UserAccount userAccount = userAccountService.getUserAccountById(loggedUser.getId());
            UserAccountDTO userAccountDTO = userAccountService.convertUserAccountToUserAccountDTO(userAccount);
            return ResponseEntity.ok(userAccountDTO);
        }catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

    }

    @GetMapping("product/me")
    public ResponseEntity<UserAccountDTO> getMeInProduct(Authentication authentication) {
        UserAccountDTO loggedUser = Optional.ofNullable(authentication)
                .filter(f -> f.getPrincipal() instanceof UserWrapper)
                .map(Authentication::getPrincipal)
                .map(UserWrapper.class::cast)
                .map(UserWrapper::getUserAccount)
                .map(userAccountService::convertUserAccountToUserAccountDTO)
                .orElse(null);
        UserAccount userAccount = userAccountService.getUserAccountById(loggedUser.getId());
        UserAccountDTO userAccountDTO = userAccountService.convertUserAccountToUserAccountDTO(userAccount);
        return ResponseEntity.ok(userAccountDTO);
    }

//    @PutMapping("/updateUser/{id}")
//    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @RequestBody UserAccountDTO userAccountDTO) {
//        userAccountService.updateUserAddress(id, userAccountDTO);
//        return ResponseEntity.ok("Address update ok");
//    }

    @PutMapping("/updateUser/me")
    public ResponseEntity<?> updateUser(Authentication authentication, @RequestBody UserAccountDTO userAccountDTO) {
        UserAccount loggedUser = Optional.ofNullable(authentication)
                .filter(f -> f.getPrincipal() instanceof UserWrapper)
                .map(Authentication::getPrincipal)
                .map(UserWrapper.class::cast)
                .map(UserWrapper::getUserAccount)
                .orElse(null);
        userAccountService.updateUserAddress(loggedUser.getId(), userAccountDTO);
        return ResponseEntity.ok("Address update ok");
    }

    @PutMapping("/admin_panel/updateUserRole/{id}")
    public ResponseEntity<?> updateUserRole(@PathVariable("id") Long userId) {
        UserAccount userAccount = userAccountRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
        userAccountService.updateUserRole(userId);
        return ResponseEntity.ok("Role update ok");
    }

    @PutMapping("/admin_panel/banUnbanUser/{id}")
    public ResponseEntity<?> updateBanUnbanUser(@PathVariable("id") Long userId) {
        UserAccount userAccount = userAccountRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
        userAccountService.banUnbanUser(userId);
        return ResponseEntity.ok("Account state update ok");
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userAccountService.deleteUserAccountById(id);
    }
    //do AdControllera /ad/new dodawanie updateowanie

}
