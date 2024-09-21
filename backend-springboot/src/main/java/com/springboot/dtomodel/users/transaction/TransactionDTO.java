package com.springboot.dtomodel.users.transaction;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TransactionDTO {

    private Long userAccountNumber;
    private Long recipientAccountNumber;
    private String recipientName;
    private String ifscCode;
    private Float amount;
    private Long transactionId;
    private LocalDateTime dateTime;
    private String reason;
    private String status;
    private String category;
    private String transactionType; // Indicates if it's a debit or credit transaction
}
