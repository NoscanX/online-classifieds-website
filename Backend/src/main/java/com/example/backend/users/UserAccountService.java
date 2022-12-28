package com.example.backend.users;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class UserAccountService {
    private final UserAccountRepository userAccountRepository;
    private final UserAccountMapper userAccountMapper;
    private final PasswordEncoder encoder;

    public void registerUser(UserRegisterRequest request){
        UserAccount userAccount = userAccountMapper.mapRegisterRequestToEntity(request);
        userAccount.setEmail(userAccount.getEmail());
        userAccount.setPassword(encoder.encode(userAccount.getPassword()));
        userAccount.setName(userAccount.getName());
        userAccount.setUserRole(UserRole.USER);
        userAccount.setUserRating(0.0);
        userAccount.setIsAccountActive(true);
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

    public UserAccountDTO convertUserAccountToUserAccountDTO(UserAccount userAccount){
        return userAccountMapper.mapEntityToDTO(userAccount);
    }

    public void updateUserAddress(Long id, UserAccountDTO userAccountDTO) {
        UserAccount userAccount = userAccountRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userAccount.setCity(userAccountDTO.getCity());
        userAccount.setAddress(userAccountDTO.getAddress());
//        userAccount.setName(userAccountDTO.getName());
        userAccountRepository.save(userAccount);
    }

    public void deleteUserAccountById(Long userAccountId) {
        UserAccount userAccount = userAccountRepository.findById(userAccountId).orElseThrow(() -> new UsernameNotFoundException("Not found"));
        userAccountRepository.delete(userAccount);
    }

}
