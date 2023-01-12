package com.example.backend.UserAds;
import com.example.backend.advertisements.*;
import com.example.backend.categories.Categories;
import com.example.backend.categories.CategoriesDTO;
import com.example.backend.categories.CategoriesRepository;
import com.example.backend.categories.CategoriesService;
import com.example.backend.purchases.*;
import org.mockito.ArgumentMatchers;
import com.example.backend.users.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.util.Assert;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("it")
public class UserAdvertisementsTest {

    @Autowired
    private CategoriesService categoriesService;
    @MockBean
    private CategoriesRepository categoriesRepository;

    @Autowired
    private UserAccountService userAccountService;
    @MockBean
    private UserAccountRepository userAccountRepository;

    @MockBean
    private AdvertisementsMapper advertisementsMapper;
    @MockBean
    private AdvertisementsRepository advertisementsRepository;
    @Autowired
    private AdvertisementsService advertisementsService;

    @MockBean
    private PurchasesMapper purchasesMapper;
    @MockBean
    private PurchasesRepository purchasesRepository;
    @Autowired
    private PurchasesService purchasesService;

    @Test
    void addUser() {
        UserRegisterRequest userAccount = UserRegisterRequest.builder()
                .email("test@test.pl")
                .password("test")
                .name("Test")
                .build();
        userAccountService.registerUser(userAccount);
//        when(userAccountMapper.mapRegisterRequestToEntity(any())).thenReturn(UserAccount.builder().build());
//        userAccountService.registerUser(mock(UserRegisterRequest.class));
        verify(userAccountRepository, atLeastOnce()).save(any());
    }

    @Test
    void updateUser() {
        UserRegisterRequest userAccount = UserRegisterRequest.builder()
                .email("test2@test.pl")
                .password("test")
                .name("Test")
                .build();
        userAccountService.registerUser(userAccount);
        verify(userAccountRepository, atLeastOnce()).save(any());

//        userAccount.setId(1L);
//        userAccount.setEmail("test@test.pl");
//        userAccount.setPassword("test");
//        userAccount.setName("Test");
//        userAccount.setCity(null);
//        userAccount.setAddress(null);
        UserAccountDTO userAccountDTO = UserAccountDTO.builder()
                .city("Kraków")
                .address("Krakowska 12")
                .build();
//        userAccountDTO.setCity("Kraków");
//        userAccountDTO.setAddress("Krakowska 12");
        when(userAccountRepository.findById(1L)).thenReturn(Optional.of(UserAccount.builder().build()));
        userAccountService.updateUserAddress(1L, userAccountDTO);
        assertEquals("Kraków", userAccountDTO.getCity());
        assertEquals("Krakowska 12", userAccountDTO.getAddress());
    }

    @Test
    void addCategory() {
        Categories category = Categories.builder()
                .parentCategoryName("Elektronika")
                .subcategoryName("Telefony")
                .build();
        categoriesService.addCategory(category);
        verify(categoriesRepository, atLeastOnce()).save(any());
    }

    @Test
    void addAdvertisement() {

        AdvertisementsDTO advertisement = AdvertisementsDTO.builder()
                .name("Testowe ogloszenie")
                .description("Testowy opis ogloszenia")
                .price(1999.99)
                .image("image string AHDJSAHVDHSJADSAYUWAGDUAW")
                .build();

        when(advertisementsMapper.mapDTOToEntity(any())).thenReturn(Advertisements.builder().build());
        when(categoriesRepository.findById(any())).thenReturn(Optional.of(Categories.builder().build()));
        when(userAccountRepository.findById(any())).thenReturn(Optional.of(UserAccount.builder().build()));
        advertisementsService.addAdvertisement(1L, 2L, advertisement);
        verify(advertisementsRepository, atLeastOnce()).save(any());
    }

    @Test
    void addPurchase() {

        PurchasesDTO purchase = PurchasesDTO.builder().build();

        when(purchasesMapper.mapDTOToEntity(any())).thenReturn(Purchases.builder().build());
        when(userAccountRepository.findById(any())).thenReturn(Optional.of(UserAccount.builder().build()));
        when(advertisementsRepository.findById(any())).thenReturn(Optional.of(Advertisements.builder().build()));
        purchasesService.addPurchase(1L, 2L, purchase);
        verify(purchasesRepository, atLeastOnce()).save(any());
    }

    @Test
    void deleteAdvertisementShouldBeSuccessfulWhenThereIsAdvertisement() {
        AdvertisementsDTO advertisement = AdvertisementsDTO.builder()
                .name("Testowe ogloszenie")
                .description("Testowy opis ogloszenia")
                .price(1999.99)
                .image("image string AHDJSAHVDHSJADSAYUWAGDUAW")
                .build();

        when(advertisementsMapper.mapDTOToEntity(any())).thenReturn(Advertisements.builder().build());
        when(categoriesRepository.findById(any())).thenReturn(Optional.of(Categories.builder().build()));
        when(userAccountRepository.findById(any())).thenReturn(Optional.of(UserAccount.builder().build()));
        advertisementsService.addAdvertisement(1L, 2L, advertisement);
        verify(advertisementsRepository, atLeastOnce()).save(any());
        when(advertisementsRepository.findById(advertisement.getId())).thenReturn(Optional.of(Advertisements.builder().build()));
        advertisementsService.deleteAdvertisementById(advertisement.getId());

    }

    @Test
    void deleteAdvertisementShouldBeSuccessfulWhenThereIsNoAdvertisement() {
        AdvertisementsDTO advertisement = AdvertisementsDTO.builder()
                .id(1L)
                .name("Testowe ogloszenie")
                .description("Testowy opis ogloszenia")
                .price(1999.99)
                .image("image string AHDJSAHVDHSJADSAYUWAGDUAW")
                .build();

        when(advertisementsMapper.mapDTOToEntity(any())).thenReturn(Advertisements.builder().build());
        when(categoriesRepository.findById(any())).thenReturn(Optional.of(Categories.builder().build()));
        when(userAccountRepository.findById(any())).thenReturn(Optional.of(UserAccount.builder().build()));
        advertisementsService.addAdvertisement(1L, 2L, advertisement);
        verify(advertisementsRepository, atLeastOnce()).save(any());
        when(advertisementsRepository.findById(advertisement.getId())).thenReturn(Optional.of(Advertisements.builder().build()));
        assertThrows(Exception.class, () -> {
            advertisementsService.deleteAdvertisementById(2L);
        });
    }

    @Test
    void getAllCategoriesDTO() {
        List<CategoriesDTO> categoriesDTO = new ArrayList<>();
        CategoriesDTO category1 = CategoriesDTO.builder()
                .id(1L)
                .parentCategoryName("Elektronika")
                .subcategoryName("Telefony")
                .build();
        CategoriesDTO category2 = CategoriesDTO.builder()
                .id(2L)
                .parentCategoryName("Elektronika")
                .subcategoryName("Karty graficzne")
                .build();
        categoriesDTO.add(category1);
        categoriesDTO.add(category2);
        assertEquals(2,categoriesDTO.size());
    }

}
