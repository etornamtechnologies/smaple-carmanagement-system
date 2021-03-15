package com.etxtechstack.carmanagementapplication.dto;

import com.etxtechstack.carmanagementapplication.enums.Manufacturer;

public class CarDTO {
    private String model;
    private String description;
    private Manufacturer manufacturer;
    private String manufactureYear;
    private Double price;

    public CarDTO() {
    }

    public CarDTO(String model, String description, String manufactureYear, Manufacturer manufacturer) {
        this.model = model;
        this.description = description;
        this.manufacturer = manufacturer;
        this.manufactureYear = manufactureYear;
    }

    public CarDTO(String model, String description, Manufacturer manufacturer, String manufactureYear, Double price) {
        this.model = model;
        this.description = description;
        this.manufacturer = manufacturer;
        this.manufactureYear = manufactureYear;
        this.price = price;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Manufacturer getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getManufactureYear() {
        return manufactureYear;
    }

    public void setManufactureYear(String manufactureYear) {
        this.manufactureYear = manufactureYear;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "CarDTO{" +
                "model='" + model + '\'' +
                ", description='" + description + '\'' +
                ", manufacturer=" + manufacturer +
                ", manufactureYear='" + manufactureYear + '\'' +
                ", price=" + price +
                '}';
    }
}
