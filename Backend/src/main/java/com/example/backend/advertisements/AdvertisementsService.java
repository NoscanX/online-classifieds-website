package com.example.backend.advertisements;

import com.example.backend.categories.Categories;
import com.example.backend.categories.CategoriesRepository;
import com.example.backend.users.UserAccount;
import com.example.backend.users.UserAccountRepository;
import com.example.backend.users.UserWrapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class AdvertisementsService {
    private final AdvertisementsRepository advertisementsRepository;
    private final AdvertisementsMapper advertisementsMapper;
    private final UserAccountRepository userAccountRepository;
    private final CategoriesRepository categoriesRepository;

//    public void addAdvertisement(Long userId, AdvertisementsDTO advertisementsDTO) {
//        UserAccount userAccount = userAccountRepository.findById(userId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
//        Advertisements advertisements = advertisementsMapper.mapDTOToEntity(advertisementsDTO);
//        advertisements.setIsAdvertisementActive(true);
//        advertisements.setUserAccount(userAccount);
//        advertisements.setCategories(advertisementsDTO.getCategoryId());
//        advertisementsRepository.save(advertisements);
//    }


    //proper function
    public void addAdvertisement(Long userId, Long catId, AdvertisementsDTO advertisementsDTO) {
        UserAccount userAccount = userAccountRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
        Categories category = categoriesRepository.findById(catId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No cat"));
        Advertisements advertisements = advertisementsMapper.mapDTOToEntity(advertisementsDTO);
        advertisements.setIsAdvertisementActive(true);
        advertisements.setUserAccount(userAccount);
        advertisements.setCategories(category);
        advertisementsRepository.save(advertisements);
    }

//    public void addAdvertisement(Long userId, AdvertisementsDTO advertisementsDTO, UserWrapper userWrapper) {
//        UserAccount userAccount = userAccountRepository.findById(userId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));
//        Advertisements advertisements = advertisementsMapper.mapDTOToEntity(advertisementsDTO);
//        advertisements.setUserAccount(userWrapper.getUserAccount());
//        advertisements.setName(advertisements.getName());
//        advertisements.setDescription(advertisements.getDescription());
//        advertisements.setPrice(advertisements.getPrice());
//        advertisements.setImage(advertisements.getImage());
//        advertisements.setIsAdvertisementActive(true);
//        advertisements.setAdvertisementDate(LocalDateTime.now());
//        advertisementsRepository.save(advertisements);
//    }

    public List<AdvertisementsDTO> getAllAdvertisements() {
        return advertisementsRepository.findAll()
                .stream()
                .map(advertisementsMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public void updateAdvertisementDetails(Long id, AdvertisementsDTO advertisementsDTO) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
        Advertisements advertisements = advertisementsRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Ad not found"));
        advertisements.setName(advertisementsDTO.getName());
        advertisements.setDescription(advertisementsDTO.getDescription());
        advertisements.setPrice(advertisementsDTO.getPrice());
        advertisements.setImage(advertisementsDTO.getImage());
        advertisements.setAdvertisementDate(LocalDateTime.now().format(formatter));
        advertisementsRepository.save(advertisements);
    }

    public void deleteAdvertisementById(Long advertisementsId) {
        Advertisements advertisements = advertisementsRepository.findById(advertisementsId).orElseThrow(() -> new UsernameNotFoundException("Not found"));
        advertisementsRepository.delete(advertisements);
    }

    public void deleteAdvertisements() {
        advertisementsRepository.deleteAll();
    }

    public void updateAdvertisementState(Long id, Boolean isActive) {
        Advertisements advertisements = advertisementsRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Not found"));
        advertisements.setIsAdvertisementActive(isActive);
        advertisementsRepository.save(advertisements);
    }
}
