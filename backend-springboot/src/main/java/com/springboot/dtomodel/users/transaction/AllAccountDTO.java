package com.springboot.dtomodel.users.transaction;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AllAccountDTO {
    private String label;
    private Long accountNumber;
}
