package com.springboot.model.card;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplyCards {

    @NotNull
    @Pattern(regexp = "^(DEBIT|CREDIT|PREPAID|GIFT|FOREX|VIRTUAL)$", message = "Please Select Correct CARD TYPE")
    private String cardTypes;

    @NotNull
    @Pattern(regexp = "^(VISA|MASTER|RUPAY|AMERICAN|DISCOVER)$", message = "Please Select CORRECT CARD NETWORK")
    private String cardNetWork;

    @NotNull
    @Size(min = 3, max = 25, message = "First name must be between 5 and 30 characters")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Card holder  name can only contain letters")
    private String cardholderName;

    @NotNull
    @Pattern(regexp = "^(10K-25K|25K-50K|50K-1L|1L-2L|2L-5L|5L-ABOVE )$", message = "Please Select Correct Income Details")
    private String incomeDetails;


    @AssertTrue(message = "You must agree to the terms and conditions.")
    private boolean termsAndConditions;

    @AssertTrue(message = "You must agree to the Valid Details")
    private boolean validDetails;


}