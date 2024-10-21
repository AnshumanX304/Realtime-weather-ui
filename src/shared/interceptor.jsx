import axios from 'axios';
import Cookies from "js-cookie";
import url from "./backendUrl"
const instance = axios.create(
    {
        baseURL: url
    }

);

instance.interceptors.response.use((response) => {
    return response
 }, async function (error) {
    const originalRequest = error.config;
    
    if(error){
        if (error.response.status === 401) {
            Cookies.remove('ac_token');
            localStorage.setItem("isLoggedin",'false');
            window.location.href = '/login'
            return Promise.reject(error);
        }
     
    }
   
    return Promise.reject(error);
 });

export default instance;