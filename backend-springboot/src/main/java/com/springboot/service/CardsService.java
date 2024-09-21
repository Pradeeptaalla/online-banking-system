package com.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springboot.dtomodel.users.PostStatus;
import com.springboot.dtomodel.users.cards.CardDTO;
import com.springboot.entity.Cards;
import com.springboot.entity.User;
import com.springboot.model.card.CardApplyModel;
import com.springboot.model.card.PinCardModel;
import com.springboot.repository.UserRepository;

@Service
public  class CardsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OAuthDetails oAuthDetails;

    public ResponseEntity<?> getCardsDetails() {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getAccountStatus() == User.AccountStatus.OPEN) {

                List<CardDTO> cardDTOS = user.getCards().stream()
                        .map(cards -> CardDTO.builder()

                                .cardHolderName(cards.getCardHolderName())

                                .cardNumber(cards.getCardNumber())
                                .expiryDate(cards.getExpiryDate())
                                .cvv(cards.getCvv())

                                .cardType(cards.getCardType())
                                .cardNetWork(cards.getCardNetWork())

                                .cardLimit(cards.getCardLimit())
                                .balance(cards.getBalance())

                                .status(cards.getCardStatus())

                                .build())
                        .collect(Collectors.toList());

                return ResponseEntity.ok(cardDTOS);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new PostStatus("ACCOUNT NOT FOUND", "PLEASE CREATE A NEW ACCOUNT "));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PostStatus("USER NOT FOUND", "PLEASE CHECK LOGIN DETAILS"));
        }
    }

    public ResponseEntity<?> cardCreate(CardApplyModel cardApplyModel) {
        String email = oAuthDetails.getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getAccountStatus() == User.AccountStatus.OPEN) {

                boolean hasSameCardinNetwork = user.getCards().stream()
                        .anyMatch(cards ->
                                cards.getCardType().equals(cardApplyModel.getCardTypes()) &&
                                        cards.getCardNetWork().equals(cardApplyModel.getCardNetWork())
                        );
                if (hasSameCardinNetwork) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new PostStatus("CARD EXIST" ,"You already have the same card type in this network."));
                }


                Cards cards = new Cards();

                long accountNumber = generateRandomCardNumber();
                cards.setCardNumber(accountNumber);
                String expireDate = generateRandomExpireDate();
                cards.setExpiryDate(expireDate);
                cards.setCvv(generateRandomCVVNumber());
                cards.setCardHolderName(cardApplyModel.getCardholderName());

                cards.setCardType(cardApplyModel.getCardTypes());
                cards.setCardNetWork(cardApplyModel.getCardNetWork());

                float funds = generateRandomFundsNumber(cardApplyModel.getIncomeDetails());
                cards.setCardLimit(funds);
                cards.setBalance(funds);

                cards.setCardStatus("ACTIVE");

                cards.setUser(user);
                user.getCards().add(cards);
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



    public ResponseEntity<?> getPinDetails(Long accountNumber) {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getAccountStatus() == User.AccountStatus.OPEN) {
                Optional<Cards> cardsOptional = user.getCards().stream()
                        .filter(acc -> acc.getCardNumber().equals(accountNumber))
                        .findFirst();

                if (cardsOptional.isPresent()) {
                    Cards cards = cardsOptional.get();
                    cards.getPin();
                    System.out.println(cards.getPin());
                    if (cards.getPin() != null) {
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

    public ResponseEntity<?> updatePin(PinCardModel pinCardModel) {
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getAccountStatus() == User.AccountStatus.OPEN) {
                Optional<Cards> cardsOptional = user.getCards().stream()
                        .filter(acc -> acc.getCardNumber().equals(pinCardModel.getCardNumber()))
                        .findFirst();
                System.out.println(pinCardModel.getCardNumber());
                if (cardsOptional.isPresent()) {
                    Cards cards = cardsOptional.get();
                    System.out.println(cards.getPin());
                    if (cards.getPin() != null) {
                        if (pinCardModel.getOldPin().equals(cards.getPin())) {
                            cards.setPin(pinCardModel.getNewPin());
                            userRepository.save(user);
                            System.out.println("hello");
                            return ResponseEntity.status(HttpStatus.OK)
                                    .body(new PostStatus("Pin Status", "Updated Successfully"));
                        } else {
                            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                    .body(new PostStatus("Pin Status", "Old PIN is incorrect"));
                        }
                    } else {

                        cards.setPin(pinCardModel.getNewPin());
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


    private long generateRandomCardNumber() {
        long min = 2000000000000000L;
        long max = 5999999999999999L;
        return min + (long) (Math.random() * (max - min));
    }

    private Integer generateRandomCVVNumber() {
        int min = 100;
        int max = 999;
        return min + (int) (Math.random() * (max - min));
    }

    private String generateRandomExpireDate() {

        int min = 1;
        int max = 12;
        int month =  min + (int) (Math.random() * (max - min));

        int minyear = 2024;
        int maxyear = 2035;
        int year = minyear + (int) (Math.random() * (maxyear - minyear));

        return month+"/"+year;
    }

    private Float generateRandomFundsNumber(String incomedetails) {
        float result = 100f;
        switch (incomedetails) {
            case "10K-25K" ->             {
                float min = 10000f;
                float max = 25000f;
                result =  Math.round(min + (float) (Math.random() * (max - min)))*3;
            }
            case "25K-50K" ->             {
                float min = 25000f;
                float max = 50000f;
                result =  Math.round(min + (float) (Math.random() * (max - min)))*3;
            }
            case "50K-1L" ->             {
                float min = 50000f;
                float max = 100000f;
                result =  Math.round(min + (float) (Math.random() * (max - min)))*3;
            }
            case "1L-2.5L" ->             {
                float min = 100000f;
                float max = 250000f;
                result =  Math.round(min + (float) (Math.random() * (max - min)))*3;
            }
            case "2.5L-5L" ->             {
                float min = 250000f;
                float max = 500000f;
                result =  Math.round(min + (float) (Math.random() * (max - min)))*3;
            }
            case "5L-ABOVE" ->             {
                float min = 500000f;
                float max = 100000f;
                result =  Math.round(min + (float) (Math.random() * (max - min)))*3;
            }

            default -> throw new IllegalStateException("Unexpected value: " + incomedetails);
        }
        return result;



    }






}
