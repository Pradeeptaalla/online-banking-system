package com.springboot.service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.dtomodel.users.AccountDTO;
import com.springboot.dtomodel.users.PostStatus;
import com.springboot.entity.Accounts;
import com.springboot.entity.User;
import com.springboot.model.account.AccountOpenModel;
import com.springboot.model.account.PinModel;
import com.springboot.repository.UserRepository;

@Service
public class AccountsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OAuthDetails oAuthDetails;





    public ResponseEntity<?> getAccountDetails() {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getAccountStatus() == User.AccountStatus.OPEN) {

                List<AccountDTO> accountDTOs = user.getAccounts().stream()
                        .map(account -> AccountDTO.builder()
                                .accountNumber(account.getAccountNumber())
                                .ifscCode(account.getIfscCode())
                                .branch(account.getBranch())
                                .accountType(account.getAccountType())
                                .funds(account.getFunds())
                                .build())
                        .collect(Collectors.toList());

                return ResponseEntity.ok(accountDTOs);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new PostStatus("ACCOUNT NOT FOUND", "PLEASE CREATE A NEW ACCOUNT "));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PostStatus("USER NOT FOUND", "PLEASE CHECK LOGIN DETAILS"));
        }
    }


    public ResponseEntity<?> accountCreate(AccountOpenModel accountOpenModel) {
        String email = oAuthDetails.getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getAccountStatus() == User.AccountStatus.OPEN) {

                // Check if the user already has the same account type in the same branch
                boolean hasSameAccountInBranch = user.getAccounts().stream()
                        .anyMatch(account ->
                                account.getAccountType().equals(accountOpenModel.getAccountType()) &&
                                        account.getBranch().equals(accountOpenModel.getBranch())
                        );

                if (hasSameAccountInBranch) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new PostStatus("ACCOUNT EXIST" ,"You already have the same account type in this branch."));
                }

                // Proceed to create and save the new account
                Accounts accounts = new Accounts();
                long accountNumber = generateRandomAccountNumber();
                accounts.setAccountNumber(accountNumber);

                String ifscCode = generateRandomIFSCCode();
                accounts.setIfscCode(ifscCode);

                accounts.setFunds(generateRandomFundsNumber());
                accounts.setAccountType(accountOpenModel.getAccountType());
                accounts.setBranch(accountOpenModel.getBranch());

                accounts.setUser(user);
                user.getAccounts().add(accounts);
                userRepository.save(user);

                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new PostStatus("APPLIED", "YOUR ACCOUNT WILL OPEN SUCCESSFULLY IN FEW MOMENTS"));

            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("PLEASE COMPLETE ACCOUNT PROCESS");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid User");
        }
    }



    public ResponseEntity<?> getAccount(Long accountNumber) {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getAccountStatus() == User.AccountStatus.OPEN) {
                Optional<Accounts> accountOptional = user.getAccounts().stream()
                        .filter(acc -> acc.getAccountNumber().equals(accountNumber))
                        .findFirst();

                if (accountOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.OK).body(accountOptional.get());
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new PostStatus("ACCOUNT NOT FOUND", "PLEASE CREATE A NEW ACCOUNT"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new PostStatus("ACCOUNT PENDING", "YOUR ACCOUNT IS NOT OPENED"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PostStatus("USER NOT FOUND", "PLEASE CHECK LOGIN DETAILS"));
        }
    }


    public ResponseEntity<?> getPinDetails(Long accountNumber) {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getAccountStatus() == User.AccountStatus.OPEN) {
                Optional<Accounts> accountOptional = user.getAccounts().stream()
                        .filter(acc -> acc.getAccountNumber().equals(accountNumber))
                        .findFirst();

                if (accountOptional.isPresent()) {
                    Accounts accounts = accountOptional.get();
                    accounts.getPin();
                    System.out.println(accounts.getPin());
                    if (accounts.getPin() != null) {
                        return ResponseEntity.status(HttpStatus.OK).body(new PostStatus("PinStatus", "Exist"));

                    } else {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new PostStatus("PinStatus", "Empty"));
                    }

                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new PostStatus("ACCOUNT NOT FOUND", "PLEASE CREATE A NEW ACCOUNT"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new PostStatus("ACCOUNT PENDING", "YOUR ACCOUNT IS NOT OPENED"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PostStatus("USER NOT FOUND", "PLEASE CHECK LOGIN DETAILS"));
        }
    }


    public ResponseEntity<?> updatePin(PinModel pinModel) {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getAccountStatus() == User.AccountStatus.OPEN) {
                Optional<Accounts> accountOptional = user.getAccounts().stream()
                        .filter(acc -> acc.getAccountNumber().equals(pinModel.getAccountNumber()))
                        .findFirst();

                if (accountOptional.isPresent()) {
                    Accounts accounts = accountOptional.get();
                    System.out.println(accounts.getPin());
                    if (accounts.getPin() != null) {
                        if (pinModel.getOldPin().equals(accounts.getPin())) {
                            accounts.setPin(pinModel.getNewPin());
                            userRepository.save(user);
                            System.out.println("hello");
                            return ResponseEntity.status(HttpStatus.OK)
                                    .body(new PostStatus("Pin Status", "Updated Successfully"));
                        } else {
                            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                    .body(new PostStatus("Pin Status", "Old PIN is incorrect"));
                        }
                    } else {

                        accounts.setPin(pinModel.getNewPin());
                        userRepository.save(user);
                        return ResponseEntity.status(HttpStatus.OK)
                                .body(new PostStatus("Pin Status", "PIN set successfully"));
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new PostStatus("Account Not Found", "Please create a new account"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new PostStatus("Account Pending", "Your account is not opened yet"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new PostStatus("User Not Found", "Please check your login details"));
        }
    }


    private long generateRandomAccountNumber() {
        long min = 200000000000L;
        long max = 299999999999L;
        return min + (long) (Math.random() * (max - min));
    }

    private Float generateRandomFundsNumber() {
        float min = 10000f;
        float max = 100000f;
        return min + (float) (Math.random() * (max - min));
    }

    private String generateRandomIFSCCode() {
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String digits = "0123456789";
        SecureRandom random = new SecureRandom();

        StringBuilder ifscCode = new StringBuilder(9);

        // First 5 characters (letters)
        for (int i = 0; i < 5; i++) {
            ifscCode.append(letters.charAt(random.nextInt(letters.length())));
        }

        // Next 4 characters (digits)
        for (int i = 0; i < 4; i++) {
            ifscCode.append(digits.charAt(random.nextInt(digits.length())));
        }

        return ifscCode.toString();
    }


}
