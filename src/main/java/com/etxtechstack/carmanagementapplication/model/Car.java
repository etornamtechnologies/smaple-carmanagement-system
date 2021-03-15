package com.etxtechstack.carmanagementapplication.model;

import com.etxtechstack.carmanagementapplication.enums.Manufacturer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;

@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_cars_generator")
    @SequenceGenerator(name = "sq_cars_generator", sequenceName = "sq_cars", allocationSize = 1)
    private Long id;

    @Column(name="model", nullable = false)
    private String model;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "Manufacturer", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private Manufacturer manufacturer;

    @Column(name = "manufacture_year", nullable = false)
    private String manufactureYear;

    @Column(name="price", nullable = false)
    private Double price;


    public Car() {
    }

    public Car(Long id, String model, String description, String name, Manufacturer manufacturer) {
        this.id = id;
        this.model = model;
        this.description = description;
        this.name = name;
        this.manufacturer = manufacturer;
    }

    public Car(String model, String name, Manufacturer manufacturer, String manufactureYear, String description) {
        this.model = model;
        this.description = description;
        this.name = name;
        this.manufactureYear = manufactureYear;
        this.manufacturer = manufacturer;
    }

    public Car(String model, String description, String name, Manufacturer manufacturer, String manufactureYear, Double price) {
        this.model = model;
        this.description = description;
        this.name = name;
        this.manufacturer = manufacturer;
        this.manufactureYear = manufactureYear;
        this.price = price;
    }

    public Manufacturer getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        return "Car{" +
                "id=" + id +
                ", model='" + model + '\'' +
                ", description='" + description + '\'' +
                ", name='" + name + '\'' +
                ", manufacturer=" + manufacturer +
                ", manufactureYear='" + manufactureYear + '\'' +
                ", price=" + price +
                '}';
    }
}
