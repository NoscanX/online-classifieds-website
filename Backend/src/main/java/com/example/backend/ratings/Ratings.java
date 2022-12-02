package com.example.backend.ratings;

import com.example.backend.purchases.Purchases;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "ratings")
public class Ratings {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ratings_seq")
    @SequenceGenerator(name = "ratings_seq")
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "rating", nullable = false)
    private Double rating;

    @OneToOne(optional = false, orphanRemoval = true)
    @JoinColumn(name = "purchases_id", nullable = false)
    private Purchases purchases;

}