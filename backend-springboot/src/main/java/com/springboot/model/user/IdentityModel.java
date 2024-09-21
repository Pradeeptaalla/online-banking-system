package com.springboot.model.user;

import jakarta.validation.constraints.*;
import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
public class IdentityModel {


    @NotNull
    @Min(value = 100000000000L, message = "Aadhaar number must be at least 1000000000000000")
    @Max(value = 500000000000L, message = "Aadhaar number must be at most 5000000000000000")
    private Long aadhaarNumber;

    @NotNull
    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "PAN card format is invalid")
    private String panCard;




}
