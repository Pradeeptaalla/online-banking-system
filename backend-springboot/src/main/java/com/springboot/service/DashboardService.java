package com.springboot.service;


import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.dtomodel.users.user.DashboardDTO;
import com.springboot.entity.Accounts;
import com.springboot.entity.Cards;
import com.springboot.entity.Transactions;
import com.springboot.entity.User;
import com.springboot.repository.UserRepository;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OAuthDetails oAuthDetails;


    public ResponseEntity<?> getDashboard() {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Accounts
            Set<Accounts> accounts = user.getAccounts();
            int totalAccounts = accounts.size();
            float totalAccountBalance = accounts.stream().map(Accounts::getFunds).reduce(0f, Float::sum);

            // Find highest account balance and its details
            Accounts highestAccount = accounts.stream()
                    .max(Comparator.comparing(Accounts::getFunds))
                    .orElse(null); // Handle null if no accounts exist
            float highestAccountBalance = (highestAccount != null) ? highestAccount.getFunds() : 0f;
            String highestAccountNumber = (highestAccount != null) ? getLastSixDigitsFromLong(highestAccount.getAccountNumber()) : "";
            String highestAccountType = (highestAccount != null) ? highestAccount.getAccountType() : "";

            // Cards
            Set<Cards> cards = user.getCards();
            int totalCards = cards.size();
            float totalCardBalance = cards.stream().map(Cards::getBalance).reduce(0f, Float::sum);

            // Find highest card balance and its details
            Cards highestCard = cards.stream()
                    .max(Comparator.comparing(Cards::getBalance))
                    .orElse(null); // Handle null if no cards exist
            float highestCardBalance = (highestCard != null) ? highestCard.getBalance() : 0f;
            String highestCardNumber = (highestCard != null) ? getLastSixDigitsFromLong(highestCard.getCardNumber()) : "";
            String highestCardType = (highestCard != null) ? highestCard.getCardType() : "";

            // Total balance is sum of account and card balances
            float totalBalance = totalAccountBalance + totalCardBalance;

            // Transactions: using groupingBy for categories
            Set<Transactions> transactions = user.getTransactions();
            int totalTransactions = transactions.size();
            Map<String, Long> categoryCount = transactions.stream()
                    .collect(Collectors.groupingBy(tx -> tx.getCategory().toUpperCase(), Collectors.counting()));

            // Sample login and account dates (static data as in the original code)
            List<String> accountDates = List.of("20-SEP-2024", "20-SEP-2024", "20-SEP-2024", "20-SEP-2024" );
            List<String> loginDates = List.of("20-SEP-2024 9.30 AM", "20-MAR-SEP 10.30 AM", "20-SEP-2024 9.30 PM", "20-SEP-2024 10.30 PM" , "20-SEP-2024 11.30 PM");

            // Building the DTO
            DashboardDTO dashboardDTO = DashboardDTO.builder()
                    .totalAccounts(totalAccounts)
                    .totalCards(totalCards)
                    .totalTransactions(totalTransactions)
                    .totalBalance(totalBalance)
                    .highestAccountBalance(highestAccountBalance)
                    .highestAccountNumber(highestAccountNumber)  // New field for highest account number
                    .highestAccountType(highestAccountType)      // New field for highest account type
                    .highestCardBalance(highestCardBalance)
                    .highestCardNumber(highestCardNumber)        // New field for highest card number
                    .highestCardType(highestCardType)            // New field for highest card type
                    .highestCreditAmount(12323.f)  // Static value as in the original
                    .highestDebitAmount(233324f)   // Static value as in the original
                    .loginDate(loginDates)
                    .accountDate(accountDates)
                    .category(categoryCount)
                    .build();
            return ResponseEntity.ok(dashboardDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    private String getLastSixDigitsFromLong(long number) {
        String numberStr = Long.toString(number);
        if (numberStr.length() <= 4) {
            return numberStr; 
        }
        return numberStr.substring(numberStr.length() - 4); 
    }



}
