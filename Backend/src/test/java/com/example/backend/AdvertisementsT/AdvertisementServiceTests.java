package com.example.backend.AdvertisementsT;
import com.example.backend.advertisements.*;
import com.example.backend.categories.Categories;
import com.example.backend.categories.CategoriesRepository;
import com.example.backend.users.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("it")
public class AdvertisementServiceTests {

    @MockBean
    private AdvertisementsMapper advertisementsMapper;
    @MockBean
    private AdvertisementsRepository advertisementsRepository;
    @Autowired
    private AdvertisementsService advertisementsService;

    @MockBean
    private CategoriesRepository categoriesRepository;

    @MockBean
    private UserAccountRepository userAccountRepository;

    @Test
    void shouldAddAdvertisement() {

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

}
