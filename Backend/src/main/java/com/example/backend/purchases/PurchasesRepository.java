package com.example.backend.purchases;

import com.example.backend.advertisements.Advertisements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchasesRepository extends JpaRepository<Purchases, Long> {
    List<Purchases> findAllByUserAccountId(Long userId);

    @Query("SELECT c FROM Purchases c WHERE c.advertisements.userAccount.id=?1")
    List<Purchases> findAllByAdvertisementerId(Long id);
    //ratings test + RatingResponse test
//    @Query("SELECT AVG(r.rating) FROM Purchases p JOIN Ratings r")
//    public Double getAvgRating();
}
