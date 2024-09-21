package com.springboot.dtomodel.users;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class IdentityDTO {
    private Long aadhaarNumber;
    private String panCard;
}
