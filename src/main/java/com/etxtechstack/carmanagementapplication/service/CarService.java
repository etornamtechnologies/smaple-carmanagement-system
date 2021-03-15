package com.etxtechstack.carmanagementapplication.service;

import com.etxtechstack.carmanagementapplication.dto.CarDTO;
import com.etxtechstack.carmanagementapplication.exceptions.CarServiceException;
import com.etxtechstack.carmanagementapplication.exceptions.ResourceNotFound;
import com.etxtechstack.carmanagementapplication.model.Car;
import com.etxtechstack.carmanagementapplication.util.CommonHelper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService extends AbstractDataService{

    public Car save(Car car) {
        String carName = CommonHelper.generateCarName(String.valueOf(car.getManufacturer()), car.getModel(), car.getManufactureYear());
        if(carExists(carName)) {
            throw new CarServiceException("Car Already Exists");
        }
        try {
            return carRepository.save(car);
        } catch (Exception e) {
            throw new CarServiceException(e.getMessage());
        }
    }

    public List<Car> getAllCars() {
        try {
            return carRepository.findAll();
        } catch (Exception e) {
            throw new CarServiceException(e.getMessage());
        }
    }

    public Optional<Car> findCarById(Long id) {
        try {
            return carRepository.findById(id);
        } catch (Exception e) {
            throw new CarServiceException(e.getMessage());
        }
    }

    public Car update(Long id, CarDTO carDTO) {
        Optional<Car> car =carRepository.findById(id);
        if(!car.isPresent()) {
            throw new ResourceNotFound("Car Not Found!");
        }
        if(carExists(CommonHelper.generateCarName(String.valueOf(carDTO.getManufacturer()),carDTO.getModel(), carDTO.getManufactureYear()))) {
            throw new CarServiceException("Car Already Exists");
        }
        car.get().setModel(carDTO.getModel());
        car.get().setDescription(carDTO.getDescription());
        car.get().setManufacturer(carDTO.getManufacturer());
        car.get().setManufactureYear(carDTO.getManufactureYear());
        car.get().setName(CommonHelper.generateCarName(String.valueOf(carDTO.getManufacturer()), carDTO.getModel(), carDTO.getManufactureYear()));
        car.get().setPrice(carDTO.getPrice());
        try {
            return carRepository.save(car.get());
        } catch (Exception e) {
            throw new CarServiceException(e.getMessage());
        }
    }

    public void delete(Long id) {
        try {
            carRepository.deleteById(id);
        } catch (Exception e) {
            throw new CarServiceException(e.getMessage());
        }
    }

    public boolean carExists(String name) {
        try {
            Optional<Car> car = carRepository.findCarByName(name);
            return car.isPresent();
        } catch (Exception e) {
            throw new CarServiceException(e.getMessage());
        }
    }
}
