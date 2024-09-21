package com.springboot.dtomodel.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostStatus {
    private String title;
    private String message;
}
