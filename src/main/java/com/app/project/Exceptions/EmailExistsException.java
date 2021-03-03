package com.app.project.Exceptions;

import lombok.Getter;

import java.io.IOException;

@Getter
public class EmailExistsException extends IOException {
    private String message;

    public EmailExistsException(String message) {
        this.message = message;
    }
}
