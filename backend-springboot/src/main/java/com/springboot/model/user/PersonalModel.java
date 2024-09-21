package com.springboot.model.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonalModel {

    @NotNull
    @Pattern(regexp = "^(JOB|SELFEMPLOYED|BUSINESS|STUDENT|OTHER )$", message = "Please Select Correct Income Details")
    private String occupation;

    @NotNull
    @Pattern(regexp = "^(1L-5L|5L-10L|10L-15L|15L-ABOVE )$", message = "Please Select Correct Income Details")
    private String incomeDetails;

    @NotNull
    @Pattern(regexp = "^(SINGLE|MARRIED)$", message = "Please Select Correct Marital Status ")
    private String maritalStatus;

    @NotNull
    @Size(min = 3, max = 25, message = "Nominee Should Have Min 3 - 25 characters")
    private String nomineeName;

    @NotNull
    @Pattern(regexp = "^(MOTHER|FATHER|BROTHER|SISTER|WIFE|SON|DAUGHTER|COUSIN|FRIEND)$", message = "Please Select Correct RelationShip")
    private String relationship;

}
