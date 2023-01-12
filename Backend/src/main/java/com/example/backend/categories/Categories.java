package com.example.backend.categories;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
public class Categories {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categories_seq")
    @SequenceGenerator(name = "categories_seq")
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "parent_category_name", nullable = false)
    private String parentCategoryName;

    @Column(name = "subcategory_name", nullable = false)
    private String subcategoryName;

}