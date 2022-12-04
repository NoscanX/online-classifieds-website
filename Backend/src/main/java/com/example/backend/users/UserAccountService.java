package com.example.backend.users;

import com.example.backend.advertisements.Advertisements;
import com.example.backend.advertisements.AdvertisementsDTO;
import com.example.backend.advertisements.AdvertisementsMapper;
import com.example.backend.advertisements.AdvertisementsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class UserAccountService {
    private final UserAccountRepository userAccountRepository;
    private final AdvertisementsRepository advertisementsRepository;
    private final AdvertisementsMapper advertisementsMapper;
    private final UserAccountMapper userAccountMapper;
    private final PasswordEncoder encoder;
    public void registerUser(UserRegisterRequest request){
        UserAccount userAccount = userAccountMapper.mapRegisterRequestToEntity(request);
        userAccount.setPassword(encoder.encode(userAccount.getPassword()));

        userAccountRepository.save(userAccount);
    }

    public List<UserAccountDTO> getAllUsers() {
        return userAccountRepository.findAll()
                .stream()
                .map(userAccountMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public void addAdvertisement(Long userId, AdvertisementsDTO advertisementsDTO) {
        UserAccount userAccount = userAccountRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "No user"));

        Advertisements advertisements = advertisementsMapper.mapDTOToEntity(advertisementsDTO);
        advertisements.setUserAccount(userAccount);

        advertisementsRepository.save(advertisements);
    }
}
