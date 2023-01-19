package com.example.backend.users;

import com.example.backend.advertisements.AdvertisementsRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class UserAccountService implements UserDetailsService {
    private final UserAccountRepository userAccountRepository;
    private final UserAccountMapper userAccountMapper;
    private final PasswordEncoder encoder;
    private final AdvertisementsRepository advertisementsRepository;

    public void registerUser(UserRegisterRequest request) throws UsernameNotFoundException {
        UserAccount userAccount = userAccountMapper.mapRegisterRequestToEntity(request);
        userAccount.setEmail(userAccount.getEmail());

        Optional<UserAccount> existingUser = userAccountRepository.findUserAccountByEmail(userAccount.getEmail());
        if (existingUser.isPresent()) {
            throw new UsernameNotFoundException("Email already exists.");
        } else {
            userAccount.setPassword(encoder.encode(userAccount.getPassword()));
            userAccount.setName(userAccount.getName());
            userAccount.setUserRole(UserRole.USER);
            userAccount.setUserRating(0.0);
            userAccount.setIsUserAccountNonLocked(true);
            userAccountRepository.save(userAccount);

        }
    }
    public List<UserAccountDTO> getAllUsers() {
        return userAccountRepository.findAll(Sort.by("email"))
                .stream()
                .map(userAccountMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public UserAccount getUserAccountById(Long id){
        return userAccountRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userAccountRepository.findUserAccountByEmail(username).map(UserWrapper::new).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

//    public UserAccount getUserAdvertisements(Long id){
//        userAccountRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("User not found"));
//        return advertisementsRepository.findById(id)
//    }

    public UserAccountDTO convertUserAccountToUserAccountDTO(UserAccount userAccount){
        return userAccountMapper.mapEntityToDTO(userAccount);
    }

    public void updateUserAddress(Long id, UserAccountDTO userAccountDTO) {
        UserAccount userAccount = userAccountRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userAccount.setCity(userAccountDTO.getCity());
        userAccount.setAddress(userAccountDTO.getAddress());
        userAccountRepository.save(userAccount);
    }

    public void updateUserRole(Long id) {
        UserAccount userAccount = userAccountRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (userAccount.getUserRole()==UserRole.USER) {
            userAccount.setUserRole(UserRole.ADMIN);
        } else {
            userAccount.setUserRole(UserRole.USER);
        }
        userAccountRepository.save(userAccount);
    }

    public void banUnbanUser(Long id) {
        UserAccount userAccount = userAccountRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userAccount.setIsUserAccountNonLocked(!userAccount.getIsUserAccountNonLocked());
        userAccountRepository.save(userAccount);
    }

    public void deleteUserAccountById(Long id) {
        userAccountRepository.deleteById(id);
    }

}
