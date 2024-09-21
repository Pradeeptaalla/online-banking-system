package com.springboot.dtomodel.users;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PinDTO {


    private Long accountNumber;
    private Integer oldPin;
    private Integer newPin;
    private Integer confirmPin;
}
