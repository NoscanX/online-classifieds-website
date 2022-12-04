package com.example.backend.categories;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CategoriesDTO {
    private Long id;
    private String parentCategoryName;
    private String subcategoryName;
}
