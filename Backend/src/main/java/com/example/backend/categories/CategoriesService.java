package com.example.backend.categories;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class CategoriesService {
    private final CategoriesRepository categoriesRepository;

    public void addCategory(Categories categories) {
        categories.setParentCategoryName(categories.getParentCategoryName());
        categories.setSubcategoryName(categories.getSubcategoryName());

        categoriesRepository.save(categories);
    }
}
