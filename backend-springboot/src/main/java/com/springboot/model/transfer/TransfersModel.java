package com.springboot.model.transfer;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransfersModel {

    @NotNull
    @Min(value = 200000000000L, message = "PLEASE ENTER CORRECT ACCOUNT NUMBER")
    @Max(value = 300000000000L, message = "PLEASE ENTER CORRECT ACCOUNT NUMBER")
    private Long userAccountNumber;

    @NotNull
    @Min(value = 200000000000L, message = "PLEASE ENTER CORRECT ACCOUNT NUMBER")
    @Max(value = 300000000000L, message = "PLEASE ENTER CORRECT ACCOUNT NUMBER")
    private Long recipientAccountNumber;

    @NotNull
    @Min(value = 200000000000L, message = "PLEASE ENTER CORRECT ACCOUNT NUMBER")
    @Max(value = 300000000000L, message = "PLEASE ENTER CORRECT ACCOUNT NUMBER")
    private Long confirmRecipientAccountNumber;


    @NotNull
    @Size(min=5 , max=25 , message = "PLEASE ENTER CORRECT IFSC CODE")
    private String ifscCode;

    @NotNull
    @DecimalMin(value = "100.00", message = "MINIMUM AMOUNT SHOULD BE 100")
    @DecimalMax(value = "100000.00", message = "MAXIMUM AMOUNT SHOULD BE 100000")
    private Float amount;



    @NotNull
    @Size(min = 3, max = 25, message = "PLEASE ENTER CORRECT REASON")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "PLEASE ENTER CORRECT REASON")
    private String reason;

    @NotNull
    @Size(min = 3, max = 25, message = "PLEASE ENTER CORRECT NAME")
    private String recipientName;

    @NotNull
    @Min(value = 1000, message = "PLEASE ENTER CORRECT PIN")
    @Max(value = 9999, message = "PLEciASE ENTER CORRECT PIN")
    private Integer pin;



}
