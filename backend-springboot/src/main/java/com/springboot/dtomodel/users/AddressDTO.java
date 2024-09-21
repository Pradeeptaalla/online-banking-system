package com.springboot.dtomodel.users;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddressDTO {

    private String permanentVillage;
    private String permanentMandal;
    private String permanentDistrict;
    private String permanentState;
    private Integer permanentPinCode;

    private String residentialVillage;
    private String residentialMandal;
    private String residentialDistrict;
    private String residentialState;
    private Integer residentialPinCode;


}
