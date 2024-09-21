package com.springboot.exceptions;

public class AccountPendingException extends RuntimeException {
    private String title;

    public AccountPendingException(String title, String message) {
        super(message);
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
