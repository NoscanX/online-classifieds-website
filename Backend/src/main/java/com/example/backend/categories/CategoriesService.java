package com.example.backend.categories;

import com.example.backend.advertisements.AdvertisementsDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class CategoriesService {
    private final CategoriesRepository categoriesRepository;
    private final CategoriesMapper categoriesMapper;
    public void addCategory(Categories categories) {
        categories.setParentCategoryName(categories.getParentCategoryName());
        categories.setSubcategoryName(categories.getSubcategoryName());

        categoriesRepository.save(categories);
    }

    public List<CategoriesDTO> getAllCategories() {
        return categoriesRepository.findAll()
                .stream()
                .map(categoriesMapper::mapEntityToDTO)
                .collect(Collectors.toList());
    }
}
