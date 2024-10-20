import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../shared/authContext';  
import './loader.css';
import Appbar from './Appbar';


const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { homedata } = useContext(AuthContext);  

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await homedata(); 
        if (response.data.success) {
          setWeatherData(response.data.result);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [homedata]);

  const handleCityClick = (cityName) => {
    navigate(`/city/${cityName}`);
  };

  return (
    <>
    <Appbar/>
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Realtime Weather App</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {weatherData.map((city) => (
              <div 
                key={city.name} 
                className="flex justify-between items-center bg-white shadow-lg rounded-lg p-6 w-4/5 mx-auto transition-transform transform hover:scale-[1.01]"
              >
                <span className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => handleCityClick(city.name)}>
                  {city.name}
                </span>

                <div className="flex flex-col text-right">
                  <span className="block text-xl font-semibold text-gray-700">{city.temperature}°C</span>
                  <span className="text-sm text-gray-500">Feels like: {city.feels_like}°C</span>
                  <span className="text-sm text-gray-500">{city.weather_condition}</span>
                  <button 
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => handleCityClick(city.name)} 
                  >
                    Show History
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;
