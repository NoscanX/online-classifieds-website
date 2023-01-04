package com.example.backend.categories;

import com.example.backend.advertisements.AdvertisementsDTO;
import com.example.backend.users.UserAccount;
import com.example.backend.users.UserAccountDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoriesController {
    private final CategoriesService categoriesService;

    @PostMapping("/addCategory")
    public void saveCategory(@RequestBody Categories categories) {
        categoriesService.addCategory(categories);
    }

    @GetMapping("/getAllCategories")
    public ResponseEntity<List<CategoriesDTO>> getAllCategories() {
        return ResponseEntity.ok(categoriesService.getAllCategories());
    }

    @GetMapping("/category/getCategoryById/{id}")
    public ResponseEntity<CategoriesDTO> getCategoryDetails(@PathVariable(value = "id") Long id) {
        Categories categories = categoriesService.getCategoryById(id);
        CategoriesDTO categoriesDTO = categoriesService.convertCategoryToCategoryDTO(categories);
        return ResponseEntity.ok(categoriesDTO);
    }
}
