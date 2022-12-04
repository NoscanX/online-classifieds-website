package com.example.backend.advertisements;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvertisementsRepository extends JpaRepository<Advertisements, Long> {

}
