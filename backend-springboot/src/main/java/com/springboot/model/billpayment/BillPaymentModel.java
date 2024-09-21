package com.springboot.model.billpayment;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BillPaymentModel {

    @NotNull
    @Pattern(regexp = "^(ELECTRICITY|WATER|MOBILE|BROADBAND|DTH|FASTTAG|GAS)$", message = "Please Select Correct Category Type")
    private String category;

    @NotNull
    @Size(min = 3, max = 25, message = "Please Enter Correct Company Name")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Please Enter Correct Company Name.It Contains only contain letters")
    private String companyName;

    @Min(value = 1000000L , message = "Invalid UserId Number")
    @Max(value = 900000000000L , message = "Invalid UserId Number")
    private Long userId;


    @NotNull
    @DecimalMin(value = "100.00", message = "MINIMUM AMOUNT SHOULD BE 100")
    @DecimalMax(value = "50000.00", message = "MAXIMUM AMOUNT SHOULD BE 10000")
    private Float amount;


    @Min(value = 10000000000L , message = "Invalid Account Number")
    @Max(value = 9000000000000000L , message = "Invalid Account Number")
    private Long accountNumber;


    @Min(value = 1000 , message = "Invalid pin Number")
    @Max(value = 9999 , message = "Invalid pin Number")
    private Integer pin;




}
