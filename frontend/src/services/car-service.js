import apiService from './api'
const resourcePath = 'cars'

export function saveCar(payload) {
    return new Promise((resolve, reject) => {
        apiService({
            url: `${resourcePath}`,
            method: 'post',
            data: payload
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

export function getAllCars() {
    return new Promise((resolve, reject) => {
        apiService({
            url: `${resourcePath}`,
            method: 'get'
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

export function getCar(id) {
    return new Promise((resolve, reject) => {
        apiService({
            url: `${resourcePath}/${id}`,
            method: 'get'
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

export function updateCar(id, payload) {
    return new Promise((resolve, reject) => {
        apiService({
            url: `${resourcePath}/${id}`,
            method: 'put',
            data: payload
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

export function deleteCar(id) {
    return new Promise((resolve, reject) => {
        apiService({
            url: `${resourcePath}/${id}`,
            method: 'delete'
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}