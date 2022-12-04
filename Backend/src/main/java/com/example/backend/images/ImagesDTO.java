package com.example.backend.images;

import com.example.backend.advertisements.Advertisements;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ImagesDTO {
    private Long id;
    private String name;
    private String image;
}
