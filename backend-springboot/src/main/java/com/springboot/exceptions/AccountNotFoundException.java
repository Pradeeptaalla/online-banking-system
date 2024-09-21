package com.springboot.exceptions;

public class AccountNotFoundException extends RuntimeException {
    private final String title;

    public AccountNotFoundException(String title, String message) {
        super(message);
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
