package com.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.springboot.dtomodel.users.AccountDTO;
import com.springboot.entity.User;
import com.springboot.repository.UserRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
class AccountsServiceTest {

    @Autowired
    private UserRepository userRepository;



    @Test
    @Transactional
    void getAccountDetails() {
        String email = "Test@pradeep.com";
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            System.out.println("USER NOT FOUND. PLEASE CHECK LOGIN DETAILS.");
            return;
        }

        User user = userOptional.get();

        if (user.getAccountStatus() != User.AccountStatus.OPEN) {
            System.out.println("ACCOUNT NOT FOUND. PLEASE CREATE A NEW ACCOUNT.");
            return;
        }

        List<AccountDTO> accountDTOs = user.getAccounts().stream()
                .map(account -> AccountDTO.builder()
                        .accountNumber(account.getAccountNumber())
                        .ifscCode(account.getIfscCode())
                        .branch(account.getBranch())
                        .accountType(account.getAccountType())
                        .funds(account.getFunds())
                        .build())
                .collect(Collectors.toList());

        System.out.println("Account details: " + accountDTOs);
    }



    @Test
    void accountCreate() {
    }

    @Test
    void getAccount() {
    }

    @Test
    void getPinDetails() {
    }

    @Test
    void updatePin() {
    }

    @Test
    void getFunds() {
    }
}