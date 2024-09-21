package com.springboot.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "addresse") 
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


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