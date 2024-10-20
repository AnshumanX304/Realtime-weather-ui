import axios from 'axios';
import Cookies from "js-cookie";
import url from './backendUrl';
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
        if (error.response.status === 401 && originalRequest.url === url + "user/refreshtoken") {
            localStorage.setItem("isLoggedin",'false');
            window.location.href = '/Login'
            return Promise.reject(error);
        }
     
        if (error.response.status === 401 && !originalRequest._retry) {
     
            originalRequest._retry = true;
            const refreshToken = Cookies.get('rf_token');
            
            if(refreshToken){
                
                await axios.post("http://localhost:4000/user/refreshtoken", {refreshtoken:refreshToken})
                .then(async res => {
                    
                    Cookies.set("ac_token",res.data.accesstoken);
                    originalRequest.headers["Authorization"] = 'Bearer ' + await Cookies.get('ac_token');
                    return axios(originalRequest);
                    
                })
                .catch(err=>{
                    Cookies.remove('ac_token');
                    Cookies.remove('rf_token');
                    localStorage.setItem("isLoggedin",'false');

                    window.location.href = '/Login'
                })
            }
            else {
                Cookies.remove('ac_token');
                Cookies.remove('rf_token');
                localStorage.setItem("isLoggedin",'false');
                return window.location.href = '/Login'
                
    
            }
            
        }
    }

   
    return Promise.reject(error);
 });

export default instance;