package com.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.dtomodel.users.PostStatus;
import com.springboot.entity.Accounts;
import com.springboot.entity.BillPayments;
import com.springboot.entity.Cards;
import com.springboot.entity.Transactions;
import com.springboot.entity.User;
import com.springboot.model.billpayment.BillPaymentModel;
import com.springboot.model.billpayment.CompanyModel;
import com.springboot.repository.AccountsRepository;
import com.springboot.repository.BillPaymentRepository;
import com.springboot.repository.CardsRepository;
import com.springboot.repository.TransactionsRepository;
import com.springboot.repository.UserRepository;


@Service
public class BillPaymentService {

    @Autowired
    private BillPaymentRepository billPaymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OAuthDetails oAuthDetails;

    @Autowired
    private TransactionsRepository transactionsRepository;


    @Autowired
    private AccountsRepository accountsRepository;
 
    @Autowired
    private CardsRepository cardsRepository;


    public ResponseEntity<?> getCompanyDetails(){

        List<BillPayments> billPayments = billPaymentRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(billPayments);

    }


    public ResponseEntity<?> getAllAccounts(){

        String email = oAuthDetails.getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(optionalUser.get().getAccounts());
        }
        else{
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PostStatus("User Not Found" , "Please Check User Details !!!"));

    }

    }


    public ResponseEntity<?> addCompany(CompanyModel companyModel){

        BillPayments bill = BillPayments.builder()

                .category(companyModel.getCategory())

                .companyName(companyModel.getCompanyName())
                .companyAddress(companyModel.getCompanyAddress())
                .companyCity(companyModel.getCompanyCity())
                .companyState(companyModel.getCompanyState())
                .companyCountry(companyModel.getCompanyCountry())

                .companyAccountNumber(companyModel.getCompanyAccountNumber())
                .companyIfscCode(companyModel.getCompanyIfscCode())
                .build();

        billPaymentRepository.save(bill);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PostStatus("Company Added" , "Company Added Successfully !!!"));
    }



    public ResponseEntity<?> billpayment(BillPaymentModel billPaymentModel) {

        String email = oAuthDetails.getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isPresent()) {
            User user = optionalUser.get();

            Optional<BillPayments> billPayments = billPaymentRepository.findByCategoryAndCompanyName(
                    billPaymentModel.getCategory(), billPaymentModel.getCompanyName());

            if(billPayments.isPresent()) {
                // Check for valid bank account
                Optional<Accounts> matchingBankAccount = user.getAccounts().stream()
                        .filter(account -> account.getAccountNumber().equals(billPaymentModel.getAccountNumber())
                                && account.getPin().equals(billPaymentModel.getPin()))
                        .findFirst();

                // Check for valid card account
                Optional<Cards> matchingCardAccount = user.getCards().stream()
                        .filter(card -> card.getCardNumber().equals(billPaymentModel.getAccountNumber()))
                        .findFirst();

                if (matchingBankAccount.isEmpty() && matchingCardAccount.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new PostStatus("Invalid Account", "Please check the account/card details!"));
                }

                float paymentAmount = billPaymentModel.getAmount();

                // Deduct funds from the valid bank or card account
                if (matchingBankAccount.isPresent()) {
                    Accounts bankAccount = matchingBankAccount.get();

                    if (bankAccount.getFunds() < paymentAmount) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(new PostStatus("Insufficient Funds", "Not enough balance in the account!"));
                    }

                  
                    bankAccount.setFunds(bankAccount.getFunds() - paymentAmount);
                    accountsRepository.save(bankAccount);
                } else if (matchingCardAccount.isPresent()) {
                    Cards cardAccount = matchingCardAccount.get();

                    if (cardAccount.getBalance() < paymentAmount) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(new PostStatus("Insufficient Funds", "Not enough balance on the card!"));
                    }

                    cardAccount.setBalance(cardAccount.getBalance() - paymentAmount);
                    cardsRepository.save(cardAccount);
                }

       
                Transactions transactions = Transactions.builder()
                        .user(user)
                        .userAccountNumber(billPaymentModel.getAccountNumber())
                        .recipientAccountNumber(billPayments.get().getCompanyAccountNumber())
                        .ifscCode(billPayments.get().getCompanyIfscCode())
                        .amount(paymentAmount)
                        .reason("BILL")
                        .recipientName(billPayments.get().getCompanyName())
                        .status("Success")
                        .transactionId(generateRandomTransactionId())
                        .category(billPaymentModel.getCategory())
                        .build();


                transactionsRepository.save(transactions);

                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new PostStatus("Payment Successful", "Payment was successful!"));

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new PostStatus("Company Not Found", "Please check the company name and category!"));
            }

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new PostStatus("User Not Found", "Please check user details!"));
        }
    }



    private long generateRandomTransactionId() {
        long min = 100000000000000L;
        long max = 999999999999999L;
        return min + (long) (Math.random() * (max - min));
    }

}
