package com.example.backend.images;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ImagesService {
    private final ImagesRepository imagesRepository;

    public void addImage(Images images) {
        imagesRepository.save(images);
    }

    public List<Images> getAllImages() {
        return imagesRepository.findAll();
    }

    public void deleteAllImages() {
        imagesRepository.deleteAll();
    }
}
