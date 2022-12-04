package com.example.backend.images;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/v1/image")
@RestController
@AllArgsConstructor
public class ImagesController {
    private final ImagesService imagesService;

    //image parameter in reqparam should be String???
    @PostMapping("/upload/image")
    public void addImage(@RequestParam("image") Images image) throws IOException {
        imagesService.addImage(image);
    }


    @GetMapping("/getAllImages")
    public List<Images> getAllImages() {
        return imagesService.getAllImages();
    }

    @DeleteMapping("/deleteAllImages")
    public void deleteAllImages() {
        imagesService.deleteAllImages();
    }
}
