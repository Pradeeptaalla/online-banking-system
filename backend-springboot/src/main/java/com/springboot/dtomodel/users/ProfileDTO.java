package com.springboot.dtomodel.users;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProfileDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String birthDate;
    private String gender;

    private IdentityDTO identityDTO;
    private AddressDTO addressDTO;
    private PersonalDTO personalDTO;


}
