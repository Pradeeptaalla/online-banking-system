package com.springboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "personal_info")
public class Personal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;



    private String occupation;
    private String  incomeDetails;
    private String maritalStatus;
    private String nomineeName;
    private String relationship;




}
