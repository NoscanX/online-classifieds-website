package com.example.backend.categories;

import com.example.backend.purchases.Purchases;
import com.example.backend.purchases.PurchasesDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CategoriesMapper {

    public CategoriesDTO mapEntityToDTO(Categories dto) {
        return CategoriesDTO.builder()
                .id(dto.getId())
                .parentCategoryName(dto.getParentCategoryName())
                .subcategoryName(dto.getSubcategoryName())
                .build();
    }
}
