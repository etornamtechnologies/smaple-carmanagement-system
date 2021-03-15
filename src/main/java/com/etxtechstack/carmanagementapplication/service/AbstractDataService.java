package com.etxtechstack.carmanagementapplication.service;

import com.etxtechstack.carmanagementapplication.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AbstractDataService {
    @Autowired
    public CarRepository carRepository;
}
