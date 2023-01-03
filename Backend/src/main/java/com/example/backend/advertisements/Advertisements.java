package com.example.backend.advertisements;

import com.example.backend.categories.Categories;
import com.example.backend.purchases.Purchases;
import com.example.backend.users.UserAccount;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    @Lob
    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "advertisement_date", nullable = false)
    private String advertisementDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "categories_id", nullable = false)
    private Categories categories;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_account_id", nullable = false)
    private UserAccount userAccount;

    @Column(name = "is_advertisement_active", nullable = false)
    private Boolean isAdvertisementActive = true;

}