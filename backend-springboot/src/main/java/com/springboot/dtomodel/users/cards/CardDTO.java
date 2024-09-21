package com.springboot.dtomodel.users.cards;

import lombok.Builder;
import lombok.Data;



@Data
@Builder
public class CardDTO {

    private String cardHolderName;

    private Long cardNumber;
    private String expiryDate;
    private Integer cvv;

    private String cardType;
    private String cardNetWork;

    private Float cardLimit;
    private Float balance;


    private String status;



}
