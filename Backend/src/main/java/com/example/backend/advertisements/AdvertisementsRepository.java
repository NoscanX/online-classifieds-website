package com.example.backend.advertisements;

import com.example.backend.purchases.Purchases;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdvertisementsRepository extends JpaRepository<Advertisements, Long> {
    List<Advertisements> findAllByUserAccountId(Long userId);

    @Query("SELECT c FROM Advertisements c WHERE c.categories.id=?1")
    List<Advertisements> findAllByCategoryId(Long id);
}
