package com.example.backend.CategoriesT;

import com.example.backend.categories.Categories;
import com.example.backend.categories.CategoriesDTO;
import com.example.backend.categories.CategoriesRepository;
import com.example.backend.categories.CategoriesService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;


@SpringBootTest
@ActiveProfiles("it")
public class CategoriesServiceTests {
    @Autowired
    private CategoriesService categoriesService;

    @MockBean
    private CategoriesRepository categoriesRepository;

    @Test
    void shouldAddCategory() {
        Categories category = Categories.builder()
                .parentCategoryName("Elektronika")
                .subcategoryName("Telefony")
                .build();
        categoriesService.addCategory(category);
        verify(categoriesRepository, atLeastOnce()).save(any());
    }

    @Test
    void shouldGetAllCategoriesDTO() {
        List<CategoriesDTO> categoriesDTO = new ArrayList<>();
        CategoriesDTO category1 = CategoriesDTO.builder()
                .id(1L)
                .parentCategoryName("Elektronika")
                .subcategoryName("Telefony")
                .build();
        CategoriesDTO category2 = CategoriesDTO.builder()
                .id(2L)
                .parentCategoryName("Elektronika")
                .subcategoryName("Karty graficzne")
                .build();
        categoriesDTO.add(category1);
        categoriesDTO.add(category2);
        assertEquals(2,categoriesDTO.size());
    }
}
