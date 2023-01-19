package com.example.backend.PurchasesT;

import com.example.backend.advertisements.Advertisements;
import com.example.backend.advertisements.AdvertisementsRepository;
import com.example.backend.categories.Categories;
import com.example.backend.categories.CategoriesDTO;
import com.example.backend.categories.CategoriesRepository;
import com.example.backend.categories.CategoriesService;
import com.example.backend.purchases.*;
import com.example.backend.users.UserAccount;
import com.example.backend.users.UserAccountDTO;
import com.example.backend.users.UserAccountRepository;
import com.example.backend.users.UserRegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import static org.mockito.BDDMockito.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@SpringBootTest
@ActiveProfiles("it")
public class PurchasesServiceTests {

    @MockBean
    private PurchasesMapper purchasesMapper;
    @MockBean
    private PurchasesRepository purchasesRepository;
    @Autowired
    private PurchasesService purchasesService;
    @MockBean
    private AdvertisementsRepository advertisementsRepository;

    @MockBean
    private UserAccountRepository userAccountRepository;

    @Test
    void shouldAddPurchase() {

        PurchasesDTO purchase = PurchasesDTO.builder().build();

        when(purchasesMapper.mapDTOToEntity(any())).thenReturn(Purchases.builder().build());
        when(userAccountRepository.findById(any())).thenReturn(Optional.of(UserAccount.builder().build()));
        when(advertisementsRepository.findById(any())).thenReturn(Optional.of(Advertisements.builder().build()));
        purchasesService.addPurchase(1L, 2L, purchase);
        verify(purchasesRepository, atLeastOnce()).save(any());
    }

    @Test
    void shouldThrowExceptionUpdateRatingIfIdNotFound() {

        given(purchasesRepository.findById(any())).willReturn(Optional.ofNullable(null));
        PurchasesDTO purchasesDTO = PurchasesDTO.builder().id(1L).build();
        assertThrows(Exception.class, () -> {
            purchasesService.updatePurchaseRating(1L, purchasesDTO);
        });
    }

    @Test
    void shouldThrowExceptionWhenAdvertisementDoesNotExists() {
        PurchasesDTO purchasesDTO = PurchasesDTO.builder().id(1L).build();
        when(purchasesRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(Exception.class, () -> {
            purchasesService.addPurchase(1L, null, purchasesDTO);
        });
    }

//    @Test
//    void shouldUpdateRating() {
//        PurchasesDTO purchase = PurchasesDTO.builder().id(any()).build();
//        when(purchasesMapper.mapDTOToEntity(any())).thenReturn(Purchases.builder().build());
//        when(userAccountRepository.findById(any())).thenReturn(Optional.of(UserAccount.builder().build()));
//        when(advertisementsRepository.findById(any())).thenReturn(Optional.of(Advertisements.builder().build()));
//        purchasesService.addPurchase(any(), 1L, purchase);
//        verify(purchasesRepository, atLeastOnce()).save(any());
//
//
//        PurchasesDTO purchaseRating = PurchasesDTO.builder().rating(4.5).build();
//        when(purchasesRepository.findById(any())).thenReturn(Optional.of(Purchases.builder().build()));
//        purchasesService.updatePurchaseRating(any(), purchaseRating);
//        assertEquals(4.5, purchase.getRating());
//    }
}
