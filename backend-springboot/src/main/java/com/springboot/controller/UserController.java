package com.springboot.controller;

import com.springboot.model.user.*;
import com.springboot.service.UsersService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UsersService usersService;




    @GetMapping("/")
    public ResponseEntity<?> getAllUser() {
        return usersService.getUserDetails();
    }

    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody @Valid UserModel user ) {
        return usersService.addUserDetails(user);
    }

    @GetMapping("/identity")
    public ResponseEntity<?> getIdentity() {
        System.out.println("this is working");
        return usersService.getIdentityDetails();
    }

    @PostMapping("/identity")
    public ResponseEntity<?> createIdentity(@RequestBody @Valid IdentityModel identityModel ) {
        return usersService.addIdentitiesDetails(identityModel);
    }

    @GetMapping("/address")
    public ResponseEntity<?> getAddress() {
        System.out.println("this is working");
        return usersService.getAddressDetails();
    }

    @PostMapping("/address")
    public ResponseEntity<?> createAddress(@RequestBody @Valid AddressModel addressModel ) {
        return usersService.addAddressDetails(addressModel);
    }

    @GetMapping("/personal")
    public ResponseEntity<?> getPersonal() {
        System.out.println("this is working");
        return usersService.getPersonalDetails();
    }

    @PostMapping("/personal")
    public ResponseEntity<?> createPersonal(@RequestBody @Valid PersonalModel personalModel ) {
        return usersService.addPersonalDetails(personalModel);
    }

    @GetMapping("/account-open")
    public ResponseEntity<?> getAccountOpen() {
        return usersService.accountStatusCheck();
    }

    @PostMapping("/account-open")
    public ResponseEntity<?> createAccount(@RequestBody @Valid TermConditionsModle TermConditionsModle ) {
        return usersService.accountProcess();
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        return usersService.getProfileDetails();
    }



    @GetMapping("/account-verification")
    public  ResponseEntity<?> getAccountStatus(@AuthenticationPrincipal OAuth2User oauthUser) {

        System.out.println("User logged in: " + oauthUser.getAttributes());
        return usersService.getAccountVerification(oauthUser);

    }







}
