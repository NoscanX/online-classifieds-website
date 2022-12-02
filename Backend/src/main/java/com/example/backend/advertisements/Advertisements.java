package com.example.backend.advertisements;

import com.example.backend.categories.Categories;
import com.example.backend.images.Images;
import com.example.backend.users.UserAccount;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "advertisements")
public class Advertisements {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "advertisements_seq")
    @SequenceGenerator(name = "advertisements_seq")
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "is_bought")
    private Boolean isBought;

    @OneToMany(mappedBy = "advertisements", orphanRemoval = true)
    private List<Images> imageses = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "categories_id", nullable = false)
    private Categories categories;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_account_id", nullable = false)
    private UserAccount userAccount;

}