package com.springboot.repository;

import com.github.javafaker.Faker;
import com.springboot.entity.BillPayments;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class BillPaymentRepositoryTest {

    @Autowired
    private BillPaymentRepository billPaymentRepository;


    @Test
    public void createBillPayment() {

        Faker faker = new Faker();

        for (int i = 0; i < 10; i++) {


            BillPayments bill = BillPayments.builder()
                    .category(faker.options().option("ELECTRICITY", "WATER", "RECHARGE", "BROADBAND", "DTH", "FASTTAG", "GAS"))
                    .companyName(faker.company().name())
                    .companyAddress(faker.address().fullAddress())
                    .companyCity(faker.address().city())
                    .companyState(faker.address().state())
                    .companyCountry(faker.options().option("INDIA", "USA", "UAE", "CANADA", "CHINA", "ENGLAND"))
                    .companyAccountNumber(faker.number().numberBetween(100000000000L, 999999999999L))
                    .companyIfscCode(faker.regexify("[A-Z]{4}0[A-Z0-9]{6}"))
                    .build();
            billPaymentRepository.save(bill);

        }


    }


}