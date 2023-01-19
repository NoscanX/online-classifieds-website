package com.example.backend.UserAccountT;
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
public class UserServiceTests {

    @Autowired
    private UserAccountService userAccountService;
    @MockBean
    private UserAccountRepository userAccountRepository;

    @Test
    void shouldRegisterUser() {
        UserRegisterRequest userAccount = UserRegisterRequest.builder()
                .email("test@test.pl")
                .password("test")
                .name("Test")
                .build();
        userAccountService.registerUser(userAccount);
        verify(userAccountRepository, atLeastOnce()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenEmailIsInvalid() {
        UserAccount userModel = mock(UserAccount.class);
        doThrow(IllegalStateException.class).when(userModel).setEmail("user@ocw.pl");
        assertThrows(IllegalStateException.class, () -> {
            userModel.setEmail("user@ocw.pl");
        });
    }

    @Test
    void shouldUpdateUser() {
        UserRegisterRequest userAccount = UserRegisterRequest.builder()
                .email("test2@test.pl")
                .password("test")
                .name("Test")
                .build();
        userAccountService.registerUser(userAccount);
        verify(userAccountRepository, atLeastOnce()).save(any());

        UserAccountDTO userAccountDTO = UserAccountDTO.builder()
                .city("Kraków")
                .address("Krakowska 12")
                .build();

        when(userAccountRepository.findById(any())).thenReturn(Optional.of(UserAccount.builder().build()));
        userAccountService.updateUserAddress(any(), userAccountDTO);
        assertEquals("Kraków", userAccountRepository.findById(any()).get().getCity());
        assertEquals("Krakowska 12", userAccountRepository.findById(any()).get().getAddress());
    }
}
