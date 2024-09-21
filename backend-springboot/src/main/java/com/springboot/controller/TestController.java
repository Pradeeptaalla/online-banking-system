package com.springboot.controller;


import com.springboot.dtomodel.users.PostStatus;
import com.springboot.model.user.UserModel;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @RestController
    public class UserController {

        @GetMapping("/user")
        public ResponseEntity<?> getUserDetails() {
            UserModel userModel = new UserModel();
            userModel.setFirstName("admin");
            userModel.setLastName("Test");
            userModel.setPhoneNumber("987415841");
            userModel.setBirthDate("11-2-2002");
            userModel.setGender("female");
            return ResponseEntity.status(HttpStatus.OK).body(userModel);
        }
    }


    @PostMapping("/user")
    public ResponseEntity<?> user(@RequestBody @Valid UserModel userModel) {
        System.out.println(userModel.getFirstName());
        System.out.println(userModel.getLastName());
        System.out.println(userModel.getPhoneNumber());
        System.out.println(userModel.getGender());
        System.out.println(userModel.getBirthDate());

        System.out.println("this is working");

        return ResponseEntity.status(HttpStatus.CREATED).body(new PostStatus("USER NOT FOUND","PLEASE CHECK YOU USRE NAME"));
    }

    @GetMapping("/api/check-auth")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        System.out.println("came here");
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
