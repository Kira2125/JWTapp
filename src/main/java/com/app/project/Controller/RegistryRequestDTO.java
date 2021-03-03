package com.app.project.Controller;

import lombok.Data;

@Data
public class RegistryRequestDTO {
    private String name;
    private String lastname;
    private String password;
    private String email;
}
