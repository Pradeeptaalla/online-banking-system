package com.springboot.model.card;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardApplyModel {

    @NotNull
    @Pattern(regexp = "^(DEBIT|CREDIT|PREPAID|VIRTUAL|FOREX|GIFT)$", message = "Please Select Correct Branch Type")
    private String cardTypes;

    @NotNull
    @Pattern(regexp = "^(VISA|MASTER|RUPAY|AMERICAN|RECURRING|DISCOVER)$", message = "Please Select Correct Account Type")
    private String cardNetWork;

    @NotNull
    @Pattern(regexp = "^(10K-25K|25K-50K|50K-1L|1L-2.5L|2.5L-5L|5L-ABOVE)$", message = "Please Select Correct Account Type")
    private String incomeDetails;

    @NotNull
    @Size(min = 5, max = 25, message = "Card Holder name must be between 3 and 25 characters")
    private String cardholderName;

    @AssertTrue(message = "You must agree to the terms and conditions.")
    private boolean termsAndConditions;

    @AssertTrue(message = "You must agree to the Valid Details")
    private boolean validDetails;



}
