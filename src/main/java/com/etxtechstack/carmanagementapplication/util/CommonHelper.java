package com.etxtechstack.carmanagementapplication.util;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.util.HashSet;
import java.util.Set;

public class CommonHelper {
    /**
     *
     * @param manufacturer
     * @param carModel
     * @param manufactureYear
     * @return String carName
     */
    public static String generateCarName(String manufacturer, String carModel, String manufactureYear) {
        return manufacturer.toUpperCase() + " " + carModel.toUpperCase() + " " + manufactureYear.toUpperCase();
    }

    /**
     *
     * @param source
     * @return Array of null property names
     */
    public static String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();
        Set emptyNames = new HashSet();
        for (java.beans.PropertyDescriptor pd : pds) {
            // check if value of this property is null then add it to the collection
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return (String[]) emptyNames.toArray(result);
    }
}
