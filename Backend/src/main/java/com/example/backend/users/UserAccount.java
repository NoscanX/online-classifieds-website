package com.example.backend.users;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "user_account")
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

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "adress", nullable = false)
    private String adress;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated
    @Column(name = "role", nullable = false)
    private UserRole userRole;

    @Column(name = "user_rating")
    private Double userRating;

}