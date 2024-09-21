package com.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.dtomodel.users.PostStatus;
import com.springboot.model.card.CardApplyModel;
import com.springboot.model.card.PinCardModel;
import com.springboot.service.CardsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("cards")
public class CardsController {

    @Autowired
    private CardsService cardsService;


    @GetMapping("/")
    public ResponseEntity<?> getAllUser() {
        return cardsService.getCardsDetails();
    }

    @PostMapping("/apply")
    public ResponseEntity<?> accountCreate(@RequestBody @Valid CardApplyModel cardApplyModel) {
        return cardsService.cardCreate(cardApplyModel);
    }

    @GetMapping("/pin/{accountNumber}")
    public ResponseEntity<?> getPin(@PathVariable Long accountNumber) {
        return cardsService.getPinDetails(accountNumber);
    }

    @PostMapping("/pin")
    public ResponseEntity<?> updatePinDetails(@RequestBody @Valid PinCardModel pinCardModel) {
        System.out.println(pinCardModel.getCardNumber());

        if (!pinCardModel.getNewPin().equals(pinCardModel.getConfirmPin())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new PostStatus("Invalid pin", "NEW PIN AND CONFIRM PIN MUST MATCH"));
        }
        if (pinCardModel.getOldPin().equals(pinCardModel.getNewPin())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new PostStatus("Invalid pin", "OLD PIN AND NEW PIN MUST BE DIFFERENT"));
        }
        if (pinCardModel.getOldPin() >= 10000 || pinCardModel.getNewPin() <= 999) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new PostStatus("Invalid pin", "OLD PIN MUST HAVE 4 Digits"));
        }

        return cardsService.updatePin(pinCardModel);
    }

}
