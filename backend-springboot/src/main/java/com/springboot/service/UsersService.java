package com.springboot.service;

import com.springboot.dtomodel.users.*;
import com.springboot.entity.Personal;
import com.springboot.entity.User;
import com.springboot.entity.Identity;
import com.springboot.entity.Address;
import com.springboot.model.user.AddressModel;
import com.springboot.model.user.IdentityModel;
import com.springboot.model.user.PersonalModel;
import com.springboot.model.user.UserModel;
import com.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OAuthDetails oAuthDetails;







    //  USER DETAILS
    public ResponseEntity<?> getUserDetails() {

        String email = oAuthDetails.getEmail();
        System.out.println(email);
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            UserDTO userdto = new UserDTO();

            userdto.setFirstName(user.getFirstName());
            userdto.setLastName(user.getLastName());
            userdto.setEmail(user.getEmail());
            userdto.setBirthDate(user.getBirthDate());
            userdto.setPhoneNumber(user.getPhoneNumber());
            userdto.setGender(user.getGender());

            return ResponseEntity.status(200).body(userdto);
        } else {
            System.out.println("User not found");
            return ResponseEntity.status(404).body(new PostStatus("Invalid User" , "Invalid User Login"));
        }
    }

    public ResponseEntity<?> addUserDetails(UserModel userModel) {

        String email = oAuthDetails.getEmail();
        Optional<User> existingUserByEmail = userRepository.findByEmail(email);
        if (existingUserByEmail.isPresent()) {
            return ResponseEntity.status(409).body(new PostStatus("Invalid User" ,"You are already registered" ));
        }

        String phoneNumber = userModel.getPhoneNumber();
        Optional<User> existingUserByPhoneNumber = userRepository.findByPhoneNumber(phoneNumber);
        if (existingUserByPhoneNumber.isPresent()) {
            return ResponseEntity.status(409).body(new PostStatus("Invalid Phone" ,"This Number is Already Registered" ));
        }

        User user = new User();
        user.setFirstName(userModel.getFirstName());
        user.setLastName(userModel.getLastName());
        user.setPhoneNumber(phoneNumber);
        user.setBirthDate(userModel.getBirthDate());
        user.setGender(userModel.getGender());
        user.setEmail(email);
        userRepository.save(user);
        return ResponseEntity.status(201).body(new PostStatus("User Saved",  "Successful Registered "));

    }


    // IDENTITY DETAILS
    public ResponseEntity<?> getIdentityDetails() {

        String email = oAuthDetails.getEmail();
        System.out.println(email);
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if(user.getIdentity() != null){
                IdentityDTO identityDTO =  IdentityDTO.builder()
                        .aadhaarNumber(user.getIdentity().getAadhaarNumber())
                        .panCard(user.getIdentity().getPanCard())
                        .build();

                return ResponseEntity.status(200).body(identityDTO);
            }
            else{
                    return ResponseEntity.status(404).body(new PostStatus("Null" , "Please Enter Your details"));

            }


        } else {
            System.out.println("User not found");
            return ResponseEntity.status(404).body(new PostStatus("Invalid User" , "Invalid User Login"));
        }
    }

    public ResponseEntity<?> addIdentitiesDetails(IdentityModel identityModel) {


        Optional<User> existingAadhaarNumber = userRepository.findByIdentityAadhaarNumber(identityModel.getAadhaarNumber());
        if (existingAadhaarNumber.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new PostStatus("Invalid Aadhaar Card" , "This Aadhaar Number is Already Registered" ));
        }

        Optional<User> existingPanCard = userRepository.findByIdentityPanCard(identityModel.getPanCard());
        if (existingPanCard.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new PostStatus("Invalid Pan Card" , "This Pan Card is Already Registered" ));
        }

        String email = oAuthDetails.getEmail();
        Optional<User> existingUserByEmail = userRepository.findByEmail(email);
        if (existingUserByEmail.isPresent()) {
            User user = existingUserByEmail.get();
            Identity identity = new Identity();
            identity.setAadhaarNumber(identityModel.getAadhaarNumber());
            identity.setPanCard(identityModel.getPanCard());
            user.setIdentity(identity);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(new PostStatus("Identity details Updated" , "Your details Updated Successfully" ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PostStatus("User Not Found" , "PLEASE FILL USER BASIC DETAILS FIRST" ));

        }
    }


    // PERSONAL DETAILS
    public ResponseEntity<?> getAddressDetails() {

        String email = oAuthDetails.getEmail();
        System.out.println(email);
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if(user.getAddress() != null){
                AddressDTO addressDTO =  AddressDTO.builder()
                        .permanentVillage(user.getAddress().getPermanentVillage())
                        .permanentMandal(user.getAddress().getPermanentMandal())
                        .permanentDistrict(user.getAddress().getPermanentDistrict())
                        .permanentState(user.getAddress().getPermanentState())
                        .permanentPinCode(user.getAddress().getPermanentPinCode())
                        .residentialVillage(user.getAddress().getResidentialVillage())
                        .residentialMandal(user.getAddress().getResidentialMandal())
                        .residentialDistrict(user.getAddress().getResidentialDistrict())
                        .residentialState(user.getAddress().getResidentialState())
                        .residentialPinCode(user.getAddress().getResidentialPinCode())
                        .build();

                return ResponseEntity.status(200).body(addressDTO);
            }else {
                return ResponseEntity.status(404).body(new PostStatus(" NOT DATA" , "PLEASE Enter Your Address Details" ));

            }


        } else {
            System.out.println("User not found");
            return ResponseEntity.status(404).body(new PostStatus("Invalid User" , "Invalid User Login"));
        }
    }

    public ResponseEntity<?> addAddressDetails(AddressModel addressModel) {

        String email = oAuthDetails.getEmail();
        Optional<User> existingUserByEmail = userRepository.findByEmail(email);
        if (existingUserByEmail.isPresent()) {
            User user = existingUserByEmail.get();

            Address address= new Address();
            address.setPermanentVillage(addressModel.getPermanentVillage());
            address.setPermanentMandal(addressModel.getPermanentMandal());
            address.setPermanentDistrict(addressModel.getPermanentDistrict());
            address.setPermanentState(addressModel.getPermanentState());
            address.setPermanentPinCode(addressModel.getPermanentPinCode());

            address.setResidentialVillage(addressModel.getResidentialVillage());
            address.setResidentialMandal(addressModel.getResidentialMandal());
            address.setResidentialDistrict(addressModel.getResidentialDistrict());
            address.setResidentialState(addressModel.getResidentialState());
            address.setResidentialPinCode(addressModel.getResidentialPinCode());

            user.setAddress(address);
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).body(new PostStatus("DETAILS SAVED" , "ADDRESS DETAILS SAVED SUCCESSFULLY"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PostStatus("User Not Found" , "PLEASE FILL USER BASIC DETAILS FIRST" ));
        }
    }


    // PERSONAL DETAILS
    public ResponseEntity<?> getPersonalDetails() {

        String email = oAuthDetails.getEmail();
        System.out.println(email);
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if(user.getPersonal() != null) {
                PersonalDTO personalDTO =  PersonalDTO.builder()
                        .occupation(user.getPersonal().getOccupation())
                        .incomeDetails(user.getPersonal().getIncomeDetails())
                        .maritalStatus(user.getPersonal().getMaritalStatus())
                        .nomineeName(user.getPersonal().getNomineeName())
                        .relationship(user.getPersonal().getRelationship())
                        .build();


                return ResponseEntity.status(200).body(personalDTO);
            }else {
                return ResponseEntity.status(404).body(new PostStatus("Not Data" , "Please Enter Your Personal" ));
            }




        } else {
            System.out.println("User not found");
            return ResponseEntity.status(404).body(new PostStatus("Invalid User" , "Invalid User Login"));
        }
    }

    public ResponseEntity<?> addPersonalDetails(PersonalModel personalModel) {

        String email = oAuthDetails.getEmail();
        Optional<User> existingUserByEmail = userRepository.findByEmail(email);
        if (existingUserByEmail.isPresent()) {
            User user = existingUserByEmail.get();

            Personal personal = new Personal();

            personal.setOccupation(personalModel.getOccupation());
            personal.setIncomeDetails(personalModel.getIncomeDetails());
            personal.setMaritalStatus(personalModel.getMaritalStatus());
            personal.setNomineeName(personalModel.getNomineeName());
            personal.setRelationship(personalModel.getRelationship());

            user.setPersonal(personal);
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).body(new PostStatus("DETAILS SAVED" , "PERSONAL DETAILS SAVED SUCCESSFULLY"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PostStatus("User Not Found" , "PLEASE FILL USER BASIC DETAILS FIRST" ));
        }
    }


    // Account Summary
    public ResponseEntity<?>  accountStatusCheck() {
        String  email = oAuthDetails.getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getAccountStatus() == User.AccountStatus.OPEN) {


                TermDTO termDTO = new TermDTO();
                termDTO.setAgreeTerms(true);
                termDTO.setIndiacitizen(true);
                termDTO.setVailddetails(true);

                return ResponseEntity.status(HttpStatus.CREATED).body(termDTO);

            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new PostStatus("ACCOUNT PENDING" , "COMPELET THE REMAING PROCESS TO OPEN ACCOUNT"));

            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PostStatus("Invalid User" , "Invalid User Login"));

        }
    }

    public ResponseEntity<?> accountProcess() {

        String  email = oAuthDetails.getEmail();
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getAddress() != null && user.getIdentity() != null && user.getPersonal() != null) {
                user.setAccountStatus(User.AccountStatus.OPEN);
                userRepository.save(user);
                return ResponseEntity.status(HttpStatus.CREATED).body(new PostStatus("ACCOUNT OPEN SUCCESSFULLY" , "ACCOUNT OPEN SUCCESSFULLY"));
            } else {
                user.setAccountStatus(User.AccountStatus.PENDING);
                userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(new PostStatus("PENDING" , "PLEASE COMPLETE ACCOUNT PENDING"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new PostStatus("User Not Found" , "PLEASE FILL USER BASIC DETAILS FIRST" ));
        }

    }




    public ResponseEntity<?> getProfileDetails() {

        String email = oAuthDetails.getEmail();
        System.out.println(email);
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            ProfileDTO profileDTO = ProfileDTO.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .phoneNumber(user.getPhoneNumber())
                    .birthDate(user.getBirthDate())
                    .gender(user.getGender())
                    .identityDTO(IdentityDTO.builder()
                            .aadhaarNumber(user.getIdentity().getAadhaarNumber())
                            .panCard(user.getIdentity().getPanCard())
                            .build())
                    .addressDTO(AddressDTO.builder()
                            .permanentVillage(user.getAddress().getPermanentVillage())
                            .permanentMandal(user.getAddress().getPermanentMandal())
                            .permanentDistrict(user.getAddress().getPermanentDistrict())
                            .permanentState(user.getAddress().getPermanentState())
                            .permanentPinCode(user.getAddress().getPermanentPinCode())
                            .residentialVillage(user.getAddress().getResidentialVillage())
                            .residentialMandal(user.getAddress().getResidentialMandal())
                            .residentialDistrict(user.getAddress().getResidentialDistrict())
                            .residentialState(user.getAddress().getResidentialState())
                            .residentialPinCode(user.getAddress().getResidentialPinCode())
                            .build())
                    .personalDTO(PersonalDTO.builder()
                            .occupation(user.getPersonal().getOccupation())
                            .incomeDetails(user.getPersonal().getIncomeDetails())
                            .maritalStatus(user.getPersonal().getMaritalStatus())
                            .nomineeName(user.getPersonal().getNomineeName())
                            .relationship(user.getPersonal().getRelationship())
                            .build())
                    .build();

            return ResponseEntity.status(200).body(profileDTO);
        } else {
            System.out.println("User not found");
            return ResponseEntity.status(404).body(new PostStatus("Invalid User" , "Invalid User Login"));
        }
    }


    public  ResponseEntity<?> getAccountVerification(OAuth2User oauthUser){
        String email = oAuthDetails.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            VerificationDTO verificationDTO = VerificationDTO.builder()
                    .isVerified(oauthUser.getAttribute("email_verified"))
                    .profilePic(oauthUser.getAttribute("picture"))
                    .accountStatus(String.valueOf(user.getAccountStatus()))
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(verificationDTO);
        }
        else{
                VerificationDTO verificationDTO = VerificationDTO.builder()
                        .isVerified(null)
                        .profilePic(null)
                        .accountStatus(null)
                        .build();
            return ResponseEntity.status(HttpStatus.OK).body(verificationDTO);


        }

    }


    public ResponseEntity<?> getDashboardDetails() {

        String email = oAuthDetails.getEmail();
        System.out.println(email);
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            ProfileDTO profileDTO = ProfileDTO.builder()
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .phoneNumber(user.getPhoneNumber())
                    .birthDate(user.getBirthDate())
                    .gender(user.getGender())
                    .identityDTO(IdentityDTO.builder()
                            .aadhaarNumber(user.getIdentity().getAadhaarNumber())
                            .panCard(user.getIdentity().getPanCard())
                            .build())
                    .addressDTO(AddressDTO.builder()
                            .permanentVillage(user.getAddress().getPermanentVillage())
                            .permanentMandal(user.getAddress().getPermanentMandal())
                            .permanentDistrict(user.getAddress().getPermanentDistrict())
                            .permanentState(user.getAddress().getPermanentState())
                            .permanentPinCode(user.getAddress().getPermanentPinCode())
                            .residentialVillage(user.getAddress().getResidentialVillage())
                            .residentialMandal(user.getAddress().getResidentialMandal())
                            .residentialDistrict(user.getAddress().getResidentialDistrict())
                            .residentialState(user.getAddress().getResidentialState())
                            .residentialPinCode(user.getAddress().getResidentialPinCode())
                            .build())
                    .personalDTO(PersonalDTO.builder()
                            .occupation(user.getPersonal().getOccupation())
                            .incomeDetails(user.getPersonal().getIncomeDetails())
                            .maritalStatus(user.getPersonal().getMaritalStatus())
                            .nomineeName(user.getPersonal().getNomineeName())
                            .relationship(user.getPersonal().getRelationship())
                            .build())
                    .build();

            return ResponseEntity.status(200).body(profileDTO);
        } else {
            System.out.println("User not found");
            return ResponseEntity.status(404).body(new PostStatus("Invalid User" , "Invalid User Login"));
        }
    }










}
