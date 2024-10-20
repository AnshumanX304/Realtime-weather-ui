import axios from "./interceptor";
import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { detailsAtom } from "../Store/Atoms/DetailsAtom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const setDetails = useSetRecoilState(detailsAtom);

    const signup = async (payload) => {
        const response = await axios.post("http://localhost:3354/user/signup", payload);
        if (response.data.success) {
            setDetails({ user: response.data.user });
        }
        return response;
    };

    const login = async (payload) => {
        const response = await axios.post("http://localhost:3354/user/signin", payload);
        if (response.data.success) {
            setDetails({ user: response.data.user });
        }
        return response;
    };

    const homedata = async () => {
        console.log("homedata");
        return axios.get("http://localhost:3354/user/current_weather",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + Cookies.get('ac_token')
                }
            });
    };

    const weatherhistory = async (payload) => {
        return axios.get(`http://localhost:3354/user/city_history?city=${payload.name}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + Cookies.get('ac_token')
                }
            });
    };

    return (
        <>
        <AuthContext.Provider value={{ homedata, weatherhistory,login,signup }}>
            {children}
        </AuthContext.Provider>
        </>
    );
};

export default AuthContext;
