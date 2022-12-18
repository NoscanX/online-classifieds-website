package com.example.backend.purchases;

import com.example.backend.advertisements.Advertisements;
import com.example.backend.advertisements.AdvertisementsDTO;
import com.example.backend.advertisements.AdvertisementsRepository;
import com.example.backend.users.UserAccount;
import com.example.backend.users.UserAccountRepository;
import com.example.backend.users.UserWrapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class PurchasesService {
    private final AdvertisementsRepository advertisementsRepository;
    private final PurchasesRepository purchasesRepository;
    private final PurchasesMapper purchasesMapper;
    private final UserAccountRepository userAccountRepository;
    public void addPurchase(Long userId, PurchasesDTO purchasesDTO, UserWrapper userWrapper) {
        UserAccount userAccount = userAccountRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
        Purchases purchases = purchasesMapper.mapDTOToEntity(purchasesDTO);
        purchases.setUserAccount(userWrapper.getUserAccount());
        purchases.setDate(LocalDateTime.now());
        //advertisements.setUserAccount(userAccount);
        purchasesRepository.save(purchases);
    }

    public List<PurchasesDTO> getAllPurchases() {
        return purchasesRepository.findAll()
                .stream()
                .map(purchasesMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }
}
