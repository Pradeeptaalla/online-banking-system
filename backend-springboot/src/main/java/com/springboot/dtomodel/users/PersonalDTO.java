package com.springboot.dtomodel.users;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PersonalDTO {

    private String occupation;
    private String  incomeDetails;
    private String maritalStatus;
    private String nomineeName;
    private String relationship;


}
