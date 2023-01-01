package com.example.backend.users;

import com.example.backend.advertisements.AdvertisementsRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class UserAccountService implements UserDetailsService {
    private final UserAccountRepository userAccountRepository;
    private final UserAccountMapper userAccountMapper;
    private final PasswordEncoder encoder;
    private final AdvertisementsRepository advertisementsRepository;

    public void registerUser(UserRegisterRequest request){
        UserAccount userAccount = userAccountMapper.mapRegisterRequestToEntity(request);
        userAccount.setEmail(userAccount.getEmail());
        userAccount.setPassword(encoder.encode(userAccount.getPassword()));
        userAccount.setName(userAccount.getName());
        userAccount.setUserRole(UserRole.USER);
        userAccount.setUserRating(0.0);
        userAccount.setIsUserAccountNonLocked(true);
        userAccountRepository.save(userAccount);
    }
    public List<UserAccountDTO> getAllUsers() {
        return userAccountRepository.findAll()
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

    public void deleteUserAccountById(Long id) {
        userAccountRepository.deleteById(id);
    }

}
