package com.springboot.dtomodel.users;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountDTO {

    private Long accountNumber;
    private String ifscCode;
    private String branch;
    private String accountType;
    private Float funds;



}
