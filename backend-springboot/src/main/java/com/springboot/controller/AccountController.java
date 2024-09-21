package com.springboot.controller;

import com.springboot.dtomodel.users.PostStatus;
import com.springboot.model.account.AccountOpenModel;
import com.springboot.model.account.PinModel;
import com.springboot.service.AccountsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountsService accountsService;



    @GetMapping("/")
    public ResponseEntity<?> getAllUser() {
        return accountsService.getAccountDetails();
    }

    @PostMapping("/apply")
    public ResponseEntity<?> accountCreate(@RequestBody @Valid AccountOpenModel accountOpenModel) {
        return accountsService.accountCreate(accountOpenModel);
    }


    @GetMapping("/pin/{accountNumber}")
    public ResponseEntity<?> getPin(@PathVariable Long accountNumber) {
        return accountsService.getPinDetails(accountNumber);
    }

    @PostMapping("/pin")
    public ResponseEntity<?> updatePinDetails(@RequestBody @Valid PinModel pinModel) {
        System.out.println("coming here");
        System.out.println(pinModel.getNewPin());
        System.out.println(pinModel.getConfirmPin());
        System.out.println(pinModel.getAccountNumber());
        System.out.println(pinModel.getOldPin());
        if (!pinModel.getNewPin().equals(pinModel.getConfirmPin())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new PostStatus("Invalid pin", "NEW PIN AND CONFIRM PIN MUST MATCH"));
        }
        if (pinModel.getOldPin().equals(pinModel.getNewPin())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new PostStatus("Invalid pin", "OLD PIN AND NEW PIN MUST BE DIFFERENT"));
        }
        if (pinModel.getOldPin() >= 10000 || pinModel.getNewPin() <= 999) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new PostStatus("Invalid pin", "OLD PIN MUST HAVE 4 Digits"));
        }

        return accountsService.updatePin(pinModel);

    }



}
