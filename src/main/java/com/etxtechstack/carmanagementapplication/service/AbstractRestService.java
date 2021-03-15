package com.etxtechstack.carmanagementapplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AbstractRestService {
    @Autowired public CarService carService;
}
