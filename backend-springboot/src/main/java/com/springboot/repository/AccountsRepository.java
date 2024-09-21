package com.springboot.repository;

import com.springboot.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountsRepository extends JpaRepository <Accounts, Integer> {

    Optional<Accounts> findByAccountNumberAndIfscCode(Long accountNumber , String ifscCode);

}
