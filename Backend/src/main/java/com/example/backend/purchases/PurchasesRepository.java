package com.example.backend.purchases;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasesRepository extends JpaRepository<Purchases, Long> {

    //ratings test + RatingResponse test
//    @Query("SELECT AVG(r.rating) FROM Purchases p JOIN Ratings r")
//    public Double getAvgRating();
}
