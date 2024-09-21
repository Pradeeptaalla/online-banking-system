package com.springboot.dtomodel.users.user;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class DashboardDTO {
    private int totalAccounts;
    private int totalCards;
    private int totalTransactions;
    private float totalBalance;
    private float highestAccountBalance;
    private String highestAccountNumber;
    private String highestAccountType;
    private float highestCardBalance;
    private String highestCardNumber;
    private String highestCardType;
    private float highestCreditAmount;
    private float highestDebitAmount;
    private List<String> loginDate;
    private List<String> accountDate;
    private Map<String, Long> category;
}
