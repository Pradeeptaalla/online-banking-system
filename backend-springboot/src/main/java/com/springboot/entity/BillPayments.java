package com.springboot.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "billpayments")
public class BillPayments extends BaseEntity {

    private String category;

    @Column(unique = true, nullable = false)
    private String companyName;
    private String companyAddress;
    private String companyCity;
    private String companyState;
    private String companyCountry;

    @Column(unique = true, nullable = false)
    private Long companyAccountNumber;
    private String companyIfscCode;





}
