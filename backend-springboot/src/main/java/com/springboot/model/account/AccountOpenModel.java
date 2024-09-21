package com.springboot.model.account;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountOpenModel {

    @NotNull
    @Pattern(regexp = "^(HYDERABAD|MUMBAI|BENGALURU|CHENNAI|KOLKATA|PUNE|DELHI|GOA)$", message = "Please Select Correct Branch Type")
    private String branch;

    @NotNull
    @Pattern(regexp = "^(CURRENT|SAVINGS|SALARY|FIXED|RECURRING|NRI|STUDENT|SENIOR)$", message = "Please Select Correct Account Type")
    private String accountType;

    @AssertTrue(message = "You must agree to the terms and conditions.")
    private boolean termsAndConditions;

    @AssertTrue(message = "You must agree to the Valid Details")
    private boolean validDetails;


}
