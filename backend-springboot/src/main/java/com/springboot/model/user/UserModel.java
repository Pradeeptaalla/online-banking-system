package com.springboot.model.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserModel {


    @NotNull
    @Size(min = 3, max = 25, message = "First name must be between 3 and 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "First name can only contain letters")
    private String firstName;

    @NotNull
    @Size(min = 3, max = 25, message = "Last name must be between 3 and 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "First name can only contain letters")
    private String lastName;

    @NotNull
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone number must be 10 digits, start with 6, 7, 8, or 9")
    private String phoneNumber;

    @NotNull
    @Size(min = 3, max = 25, message = "Last name must be between 3 and 25 characters")
    private String birthDate;

    @NotNull
    @Pattern(regexp = "^(male|female|MALE|FEMALE)$", message = "Gender must be 'male' or 'female'")
    private String gender;


}
