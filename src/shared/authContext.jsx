import axios from "./interceptor";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const homedata = async () => {
    return axios.get("http://localhost:3354/user/current_weather");
  };

  const weatherhistory = async (payload) => {
    return axios.get(`http://localhost:3354/user/city_history?city=${payload.name}`);
  };

  return (
    <>
      <AuthContext.Provider value={{ homedata, weatherhistory }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
