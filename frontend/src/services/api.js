import axios from "axios"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const apiConfig = {
    timeout: 30000,
    baseURL: 'http://localhost:8080/api/v1'
}
const HTTP_SUCCESS_CODE = 200;
const MySwal = withReactContent(Swal)


const apiService = axios.create(apiConfig)

apiService.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

apiService.interceptors.response.use(response => {
    console.log('http response', response)
    const {status, data, message} = response
    if(status === HTTP_SUCCESS_CODE) {
        return Promise.resolve(data) 
    } else {
        return Promise.reject(response)
    }
}, error => {
    console.log('My BIG ERROR', error)
    MySwal.fire({
        icon: 'error',
          title: 'Failed!',
          text: error
      })
    return Promise.reject(error)
})

export default apiService