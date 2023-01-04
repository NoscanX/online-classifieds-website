package com.example.backend.purchases;

import com.example.backend.advertisements.Advertisements;
import com.example.backend.advertisements.AdvertisementsDTO;
import com.example.backend.advertisements.AdvertisementsRepository;
import com.example.backend.users.UserAccount;
import com.example.backend.users.UserAccountRepository;
import com.example.backend.users.UserWrapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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


    public void addPurchase(Long userId, Long adId, PurchasesDTO purchasesDTO) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
        UserAccount userAccount = userAccountRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
        Advertisements advertisements = advertisementsRepository.findById(adId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
        Purchases purchases = purchasesMapper.mapDTOToEntity(purchasesDTO);
        purchases.setUserAccount(userAccount);
        purchases.setAdvertisements(advertisements);
        advertisements.setIsAdvertisementActive(false);
        purchases.setDate(LocalDateTime.now().format(formatter));
        purchases.setPayment(Payment.CASH_ON_DELIVERY);
        purchases.setRating(0.0);
        advertisementsRepository.save(advertisements);
        purchasesRepository.save(purchases);
    }
//    public void addPurchase(Long userId, PurchasesDTO purchasesDTO, UserWrapper userWrapper) {
//        UserAccount userAccount = userAccountRepository.findById(userId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
//        Purchases purchases = purchasesMapper.mapDTOToEntity(purchasesDTO);
//        purchases.setUserAccount(userWrapper.getUserAccount());
//        purchases.setDate(LocalDateTime.now());
//        //advertisements.setUserAccount(userAccount);
//        purchasesRepository.save(purchases);
//    }

    public void updatePurchaseRating(Long id, PurchasesDTO purchasesDTO) {
        Purchases purchases = purchasesRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Purchase not found"));
        purchases.setRating(purchasesDTO.getRating());
        purchasesRepository.save(purchases);
        userAccountRepository.updateAvgUserRating(purchases.getAdvertisements().getUserAccount().getId());
    }

    public List<PurchasesDTO> getAllPurchases() {
        return purchasesRepository.findAll()
                .stream()
                .map(purchasesMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    //do poprawy
    public List<PurchasesDTO> getAllPurchasesByUserId(Long userId) {
        return purchasesRepository.findAllByUserAccountId(userId)
                .stream()
                .map(purchasesMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public List<PurchasesDTO> getAllPurchasesByAdvertisementerId(Long userId) {
        return purchasesRepository.findAllByAdvertisementerId(userId)
                .stream()
                .map(purchasesMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }
}
