package com.springboot.model.user;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressModel {

    @NotNull
    @Size(min = 3, max = 25, message = "Permanent Village Should Have Min 3 - 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Permanent Village can only contain letters")
    private String permanentVillage;

    @NotNull
    @Size(min = 3, max = 25, message = "Permanent Mandal Should Have Min 3 - 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Permanent Mandal can only contain letters")
    private String permanentMandal;

    @NotNull
    @Size(min = 3, max = 25, message = "Permanent District Should Have Min 3 - 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Permanent District can only contain letters")
    private String permanentDistrict;

    @NotNull
    @Size(min = 3, max = 25, message = "Permanent State Should Have Min 3 - 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Permanent State can only contain letters")
    private String permanentState;

    @NotNull
    @Min(value = 100000 , message = "PLEASE ENTER CORRECT PIN CODE")
    @Max(value = 999999 , message = "PLEASE ENTER CORRECT PIN CODE")
    private Integer permanentPinCode;


    // THIS IS Residential Address
    @NotNull
    @Size(min = 3, max = 25, message = "Residential Village Should Have Min 3 - 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Residential Village can only contain letters")
    private String residentialVillage;

    @NotNull
    @Size(min = 3, max = 25, message = "Residential Mandal Should Have Min 3 - 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Residential Mandal can only contain letters")
    private String residentialMandal;

    @NotNull
    @Size(min = 3, max = 25, message = "Residential District Should Have Min 3 - 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Residential District can only contain letters")
    private String residentialDistrict;

    @NotNull
    @Size(min = 3, max = 25, message = "Residential State Should Have Min 3 - 25 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Residential State can only contain letters")
    private String residentialState;

    @NotNull
    @Min(value = 100000 , message = "PLEASE ENTER CORRECT PIN CODE")
    @Max(value = 999999 , message = "PLEASE ENTER CORRECT PIN CODE")
    private Integer residentialPinCode;




}
