package com.springboot.exceptions;

public class UserNotFoundException extends RuntimeException {
    private String title;

    public UserNotFoundException(String title, String message) {
        super(message);
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
