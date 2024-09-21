package com.springboot.model.billpayment;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CompanyModel {

    @NotNull
    @Size(min = 3, max = 25, message = "Please Enter Correct Company Name")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Please Enter Correct Company Name.It Contains only contain letters")
    private String companyName;

    @Size(min = 3, max = 25, message = "Please Enter Correct Company Address")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Please Enter Correct Company Address.It Contains only contain letters")
    private String companyAddress;

    @Size(min = 3, max = 25, message = "Please Enter Correct Company City")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Please Enter Correct Company City.It Contains only contain letters")
    private String companyCity;

    @Size(min = 3, max = 25, message = "Please Enter Correct Company State")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Please Enter Correct Company State.It Contains only contain letters")
    private String companyState;

    @NotNull
    @Pattern(regexp = "^(INDIA|USA|UAE|CANADA|CHINA|ENGLAND)$", message = "Please Select Correct Country")
    private String companyCountry;

    @NotNull
    @Pattern(regexp = "^(ELECTRICITY|WATER|RECHARGE|BROADBRAND|DTH|FASTTAG|GAS)$", message = "Please Select Correct Category Type")
    private String category;

    @Min(value = 100000000000L , message = "Invalid Account Number")
    @Max(value = 900000000000L , message = "Invalid Account Number")
    private Long companyAccountNumber;

    @NotNull
    @Size(min = 5, max = 25, message = "Enter Correct Company IFSC Code")
    @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$", message = "Enter Correct Company IFSC Code")
    private String companyIfscCode;

}
