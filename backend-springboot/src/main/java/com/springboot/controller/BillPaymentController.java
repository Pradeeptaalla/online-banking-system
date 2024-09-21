package com.springboot.controller;

import com.springboot.model.billpayment.BillPaymentModel;
import com.springboot.model.billpayment.CompanyModel;
import com.springboot.service.BillPaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bill-payments")
public class BillPaymentController {

    @Autowired
    private BillPaymentService  billPaymentService;

    @GetMapping("/")
    public ResponseEntity<?> getCompany(){
        return billPaymentService.getCompanyDetails();
    }
    @GetMapping("/all-accounts")
    public ResponseEntity<?> getAllAccounts(){
        return billPaymentService.getAllAccounts();
    }

    @PostMapping("add-company")
    public ResponseEntity<?> addCompany(@RequestBody @Valid CompanyModel companyModel) {
        return billPaymentService.addCompany(companyModel);
    }

    @PostMapping("pay")
    public ResponseEntity<?> billpaymentcreate(@RequestBody @Valid BillPaymentModel billPaymentModel) {
        return billPaymentService.billpayment(billPaymentModel);
    }





}
