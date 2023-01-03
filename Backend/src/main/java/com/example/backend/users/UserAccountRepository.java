package com.example.backend.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findUserAccountByEmail(String email);

    @Query("UPDATE UserAccount SET UserAccount.userRating = (SELECT AVG(Purchases.rating) FROM Purchases WHERE Purchases.userAccount.id=?1) WHERE UserAccount.id=?1")
    public void updateAvgUserRating(Long id);
}
