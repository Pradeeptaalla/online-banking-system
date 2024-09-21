package com.springboot.repository;

import com.springboot.entity.BillPayments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface  BillPaymentRepository extends JpaRepository < BillPayments , Integer> {



    Optional<BillPayments> findByCategoryAndCompanyName(String category, String companyName);




}
