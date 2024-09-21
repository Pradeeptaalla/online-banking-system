package com.springboot.model.user;

import jakarta.validation.constraints.AssertTrue;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TermConditionsModle {

    @AssertTrue(message = "You must agree to the terms and conditions.")
    private boolean agreeTerms;

    @AssertTrue(message = "You must agree to provide valid documents.")
    private boolean vailddetails;

    @AssertTrue(message = "You must confirm that you are an Indian citizen.")
    private boolean indiacitizen;
}
