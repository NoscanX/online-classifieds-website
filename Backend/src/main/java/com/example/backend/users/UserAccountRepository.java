package com.example.backend.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findUserAccountByEmail(String email);

    @Modifying
    @Query("UPDATE UserAccount c SET c.userRating = (SELECT AVG(p.rating) FROM Purchases p WHERE p.advertisements.userAccount.id=?1) WHERE c.id=?1")
    public void updateAvgUserRating(Long id);
}
