package com.etxtechstack.carmanagementapplication.repository;

import com.etxtechstack.carmanagementapplication.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    Optional<Car> findCarByName(String name);
}
