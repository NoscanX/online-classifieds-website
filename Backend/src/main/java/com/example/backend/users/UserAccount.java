package com.example.backend.users;

import com.example.backend.advertisements.Advertisements;
import com.example.backend.ratings.Ratings;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "user_account")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_account_seq")
    @SequenceGenerator(name = "user_account_seq")
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "city")
    private String city;

    @Column(name = "address")
    private String address;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole userRole;

    @Column(name = "user_rating")
    private Double userRating;

    @Column(name = "is_account_active", nullable = false)
    private Boolean isAccountActive = false;

    //czy to potrzebne?
    @OneToMany(mappedBy = "userAccount", orphanRemoval = true)
    private List<Advertisements> advertisements = new ArrayList<>();

    @OneToMany(mappedBy = "userAccount", orphanRemoval = true)
    private List<Ratings> ratingses = new ArrayList<>();

}