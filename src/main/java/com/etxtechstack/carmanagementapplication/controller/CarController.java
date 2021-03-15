package com.etxtechstack.carmanagementapplication.controller;

import com.etxtechstack.carmanagementapplication.dto.CarDTO;
import com.etxtechstack.carmanagementapplication.dto.ResponseDTO;
import com.etxtechstack.carmanagementapplication.exceptions.CarServiceException;
import com.etxtechstack.carmanagementapplication.model.Car;
import com.etxtechstack.carmanagementapplication.service.AbstractRestService;
import com.etxtechstack.carmanagementapplication.util.CommonHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cars")
@CrossOrigin
public class CarController extends AbstractRestService {
    @GetMapping(value = "",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseDTO<List<Car>> getAllCars() {
        List<Car> cars = carService.getAllCars();
        return new ResponseDTO(HttpStatus.OK.value(), "Cars Found", cars);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseDTO<Car> getCar(@PathVariable(name = "id") Long id) {
        Optional<Car> car = carService.findCarById(id);
        if(!car.isPresent()) {
            return new ResponseDTO<Car>(HttpStatus.NOT_FOUND.value(), "Car Not Found!");
        }
        return new ResponseDTO<Car>(HttpStatus.OK.value(), "Car found!", car.get());
    }

    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseDTO<Car> getCar(@RequestBody CarDTO carDTO) {
        Car car = new Car();
        car.setModel(carDTO.getModel());
        car.setName(carDTO.getModel());
        car.setManufacturer(carDTO.getManufacturer());
        car.setDescription(carDTO.getDescription());
        car.setManufactureYear(carDTO.getManufactureYear());
        car.setName(CommonHelper.generateCarName(String.valueOf(carDTO.getManufacturer()), carDTO.getModel(), carDTO.getManufactureYear()));
        car.setPrice(carDTO.getPrice());
        try {
            Car newCar = carService.save(car);
            return new ResponseDTO<Car>(HttpStatus.OK.value(), "Car Created!", newCar);
        } catch (Exception e) {
            return new ResponseDTO<Car>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        }
        //lets save car


    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseDTO<Car> updateCar(@PathVariable(name = "id") Long id, @RequestBody CarDTO carDTO) {
        try {
            Car car = carService.update(id, carDTO);
            return new ResponseDTO<Car>(HttpStatus.OK.value(), "Car Updated!", car);
        } catch (Exception e) {
            return new ResponseDTO<Car>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
        }
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseDTO<Car> deleteCar(@PathVariable(name = "id") Long id) {
        Optional<Car> car = carService.findCarById(id);
        if(!car.isPresent()) {
            throw new CarServiceException("Car not found");
        }
        try {
            carService.delete(id);
            return new ResponseDTO<Car>(HttpStatus.OK.value(), "Car deleted!");
        } catch (Exception e) {
            throw new CarServiceException(e.getMessage());
        }
    }
}
