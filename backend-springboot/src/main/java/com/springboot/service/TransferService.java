package com.springboot.service;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.dtomodel.users.PostStatus;
import com.springboot.dtomodel.users.transaction.AllAccountDTO;
import com.springboot.dtomodel.users.transaction.TransactionDTO;
import com.springboot.entity.Accounts;
import com.springboot.entity.Cards;
import com.springboot.entity.Transactions;
import com.springboot.entity.User;
import com.springboot.model.transfer.TransfersModel;
import com.springboot.repository.AccountsRepository;
import com.springboot.repository.TransactionsRepository;
import com.springboot.repository.UserRepository;

@Service
public class TransferService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private OAuthDetails oAuthDetails;




    public ResponseEntity<?> getAccount() {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getAccountStatus() == User.AccountStatus.OPEN) {
                Set<Accounts> accounts = user.getAccounts();
          
                Set<AllAccountDTO> set = new HashSet<>();

                for (Accounts account : accounts) {
                    AllAccountDTO all = AllAccountDTO.builder()
                                    .label(account.getAccountType())
                            .accountNumber(account.getAccountNumber())
                            .build();

                    set.add(all);

                }

                return ResponseEntity.ok(set);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new PostStatus("ACCOUNT NOT FOUND", "PLEASE CREATE A NEW ACCOUNT"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new PostStatus("USER NOT FOUND", "PLEASE CHECK LOGIN DETAILS"));
        }
    }


    public ResponseEntity<?> getAccountCards() {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getAccountStatus() == User.AccountStatus.OPEN) {
                Set<Accounts> accounts = user.getAccounts();
                Set<Cards> cards = user.getCards();
                

                Set<AllAccountDTO> set = new HashSet<>();


                for (Accounts account : accounts) {
                    AllAccountDTO all = AllAccountDTO.builder()
                            .label(account.getAccountType())
                            .accountNumber(account.getAccountNumber())
                            .build();

                    set.add(all);
                }

                for (Cards card : cards) {
                    AllAccountDTO all = AllAccountDTO.builder()
                            .label(card.getCardType())
                            .accountNumber(card.getCardNumber())
                            .build();

                    set.add(all);
                }



                return ResponseEntity.ok(set);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new PostStatus("ACCOUNT NOT FOUND", "PLEASE CREATE A NEW ACCOUNT"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new PostStatus("USER NOT FOUND", "PLEASE CHECK LOGIN DETAILS"));
        }
    }





    public ResponseEntity<?> getTransferDetails() {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);
    
        if (userOptional.isPresent()) {
            User user = userOptional.get();
    
            if (user.getAccountStatus() == User.AccountStatus.OPEN) {
    
                // Get user's accounts and cards
                Set<Accounts> userAccounts = user.getAccounts();
                Set<Long> userAccountNumbers = userAccounts.stream()
                        .map(Accounts::getAccountNumber)
                        .collect(Collectors.toSet());
    
                Set<Cards> userCards = user.getCards();
                Set<Long> userCardNumbers = userCards.stream()
                        .map(Cards::getCardNumber)
                        .collect(Collectors.toSet());
    
                // Fetch all transactions
                List<Transactions> allTransactions = transactionsRepository.findAll();
    
                // Filter and map transactions
                List<TransactionDTO> transactionDTOs = allTransactions.stream()
                        .filter(transaction ->
                                userAccountNumbers.contains(transaction.getUserAccountNumber()) ||
                                userAccountNumbers.contains(transaction.getRecipientAccountNumber()) ||
                                userCardNumbers.contains(transaction.getUserAccountNumber()) ||
                                userCardNumbers.contains(transaction.getRecipientAccountNumber())
                        )
                        // Sort by dateTime in descending order (latest to oldest)
                        .sorted(Comparator.comparing(Transactions::getDateTime).reversed())
                        .map(transaction -> {
                            String transactionType = userAccountNumbers.contains(transaction.getUserAccountNumber()) ||
                                    userCardNumbers.contains(transaction.getUserAccountNumber())
                                    ? "DEBIT" : "CREDIT";
    
                            // Map the transaction to a DTO
                            return TransactionDTO.builder()
                                    .userAccountNumber(transaction.getUserAccountNumber())
                                    .recipientAccountNumber(transaction.getRecipientAccountNumber())
                                    .recipientName(transaction.getRecipientName())
                                    .ifscCode(transaction.getIfscCode())
                                    .amount(transaction.getAmount())
                                    .transactionId(transaction.getTransactionId())
                                    .dateTime(transaction.getDateTime())
                                    .reason(transaction.getReason())
                                    .status(transaction.getStatus())
                                    .transactionType(transactionType)
                                    .category(transaction.getCategory())
                                    .build();
                        })
                        .collect(Collectors.toList());
    
                // Return the transaction details in the response
                return ResponseEntity.ok(transactionDTOs);
    
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new PostStatus("ACCOUNT NOT FOUND", "PLEASE CREATE A NEW ACCOUNT"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new PostStatus("USER NOT FOUND", "PLEASE CHECK LOGIN DETAILS"));
        }
    }
    











    public ResponseEntity<?> transferAmount(TransfersModel transfersModel) {
        String email = oAuthDetails.getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Step 1: Check if the user account exists
            Optional<Accounts> userAccount = user.getAccounts().stream()
                    .filter(account -> account.getAccountNumber().equals(transfersModel.getUserAccountNumber()))
                    .findFirst();

            if (userAccount.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new PostStatus("Invalid Account", "Invalid User Account Number"));
            }

            // Step 2: Check if the recipient account exists in the database
            Optional<Accounts> recipientAccount = accountsRepository.findByAccountNumberAndIfscCode(
                    transfersModel.getRecipientAccountNumber(),
                    transfersModel.getIfscCode());

            if (recipientAccount.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new PostStatus("Invalid Recipient Account", "Please check account number and IFSC code"));
            }

            // Step 3: Validate if the user has enough funds for the transaction
            if (userAccount.get().getFunds() < transfersModel.getAmount()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new PostStatus("Insufficient Funds", "Please check account balance"));
            }

            // Step 4: Ensure the user has set a PIN
            if (userAccount.get().getPin() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new PostStatus("Pin Not Set", "Please set a new pin to transfer funds"));
            }

            // Step 5: Validate the PIN
            if (!userAccount.get().getPin().equals(transfersModel.getPin())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new PostStatus("Invalid Pin", "Please check your pin"));
            }

            // Step 6: Perform the transaction
            userAccount.get().setFunds(userAccount.get().getFunds() - transfersModel.getAmount());
            recipientAccount.get().setFunds(recipientAccount.get().getFunds() + transfersModel.getAmount());

            // Save both accounts with updated funds
            accountsRepository.save(userAccount.get());
            accountsRepository.save(recipientAccount.get());

            // Step 7: Determine if the transfer is a "Self Transfer" or "External Transfer"
            boolean isSelfTransfer = user.getAccounts().stream()
                    .anyMatch(account -> account.getAccountNumber().equals(transfersModel.getRecipientAccountNumber()));

            String transferCategory = isSelfTransfer ? "Self" : "Other";

            // Step 8: Save the transaction in the Transactions entity
            Transactions transactions = new Transactions();
            transactions.setUser(user);
            transactions.setTransactionId(generateRandomTransactionId());
            transactions.setUserAccountNumber(transfersModel.getUserAccountNumber());
            transactions.setRecipientAccountNumber(transfersModel.getRecipientAccountNumber());
            transactions.setIfscCode(transfersModel.getIfscCode());
            transactions.setAmount(transfersModel.getAmount());
            transactions.setReason(transfersModel.getReason());
            transactions.setRecipientName(transfersModel.getRecipientName());
            transactions.setStatus("SUCCESS");
            transactions.setCategory(transferCategory);  // Set the category (Self Transfer or External Transfer)

            transactionsRepository.save(transactions);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new PostStatus("SUCCESS", "Transaction completed successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new PostStatus("Invalid User", "Please check user email"));
        }
    }





    private long generateRandomTransactionId() {
        long min = 100000000000000L;
        long max = 999999999999999L;
        return min + (long) (Math.random() * (max - min));
    }

}
