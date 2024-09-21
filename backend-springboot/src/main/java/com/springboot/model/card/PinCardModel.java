package com.springboot.model.card;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PinCardModel {


    @NotNull
    @Min(value = 1000000000000000L , message = "Invalid Account Number")
    @Max(value = 9000000000000000L , message = "Invalid Account Number")
    private Long cardNumber;

    private Integer oldPin;

    @Min(value=1000 , message = "PLEASE ENTER 4 Digits")
    @Max(value = 9999 , message = "PLEASE ENTER 4 Digits")
    private Integer newPin;

    @Min(value=1000 , message = "PLEASE ENTER 4 Digits")
    @Max(value = 9999 , message = "PLEASE ENTER 4 Digits")
    private Integer confirmPin;


}