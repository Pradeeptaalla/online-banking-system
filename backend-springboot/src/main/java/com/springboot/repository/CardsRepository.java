package com.springboot.repository;


import com.springboot.entity.Cards;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardsRepository  extends JpaRepository<Cards, Integer> {
}
