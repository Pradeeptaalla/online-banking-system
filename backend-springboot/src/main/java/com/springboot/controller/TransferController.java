package com.springboot.controller;

import com.springboot.model.transfer.TransfersModel;
import com.springboot.service.TransferService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions")
public class TransferController {


    @Autowired
    private TransferService transferService;


    @GetMapping("/")
    public ResponseEntity<?> getAllUser() {
        return transferService.getTransferDetails();
    }

    @PostMapping("/")
    public ResponseEntity<?> accountCreate(@RequestBody @Valid TransfersModel transfersModel) {
        return transferService.transferAmount(transfersModel);
    }

    @GetMapping("/all-accounts")
    public ResponseEntity<?> getAccountDetails() {
        return transferService.getAccount();
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAccountAndCardDetails() {
        return transferService.getAccountCards();
    }


}
