package com.example.backend.categories;

import com.example.backend.advertisements.AdvertisementsDTO;
import com.example.backend.users.UserAccount;
import com.example.backend.users.UserAccountDTO;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    public Categories getCategoryById(Long id){
        return categoriesRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }

    public CategoriesDTO convertCategoryToCategoryDTO(Categories categories){
        return categoriesMapper.mapEntityToDTO(categories);
    }
}
