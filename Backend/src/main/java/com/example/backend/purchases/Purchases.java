package com.example.backend.purchases;

import com.example.backend.advertisements.Advertisements;
import com.example.backend.users.UserAccount;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "purchases")
public class Purchases {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "purchases_seq")
    @SequenceGenerator(name = "purchases_seq")
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_account_id", nullable = false)
    private UserAccount userAccount;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @OneToOne(optional = false, orphanRemoval = true)
    @JoinColumn(name = "advertisements_id", nullable = false)
    private Advertisements advertisements;

    @Enumerated
    @Column(name = "payment", nullable = false)
    private Payment payment;

}