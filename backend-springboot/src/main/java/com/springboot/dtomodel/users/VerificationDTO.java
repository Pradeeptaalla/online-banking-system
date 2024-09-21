package com.springboot.dtomodel.users;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VerificationDTO {

    private Boolean isVerified;
    private String profilePic;
    private String accountStatus;

}
