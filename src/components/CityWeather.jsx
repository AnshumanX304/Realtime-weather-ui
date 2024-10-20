import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../shared/authContext';
import Appbar from './Appbar';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const CityWeather = () => {
  const { name } = useParams();  
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [loading, setLoading] = useState(true);  
  const { weatherhistory } = useContext(AuthContext); 

  useEffect(() => {
    const fetchCityWeatherHistory = async () => {
      try {
        const response = await weatherhistory({ name });  
        if (response.data.success) {
          setWeatherHistory(response.data.result);
        }
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching city weather history:', error);
        setLoading(false);  
      }
    };

    fetchCityWeatherHistory();
  }, [name, weatherhistory]);

  return (
    <>
    <Appbar/> 
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Weather History for {name}</h1>

        {loading ? (
          <div className="flex justify-center items-center p-10">
            <div className="loader"></div> 
          </div>
        ) : (
          <div className="space-y-6">
            {weatherHistory.map((record, index) => (
              <div 
                key={index} 
                className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-4/5 mx-auto"
              >
                <div className="text-left">
                  <span className="block text-xl font-semibold text-gray-700">
                    {formatDate(record.date)}
                  </span>
                  <span className="block text-sm text-gray-500">Max Temp: {record.max_temperature}°C</span>
                  <span className="block text-sm text-gray-500">Min Temp: {record.min_temperature}°C</span>
                  <span className="block text-sm text-gray-500">
                    Avg Temp: {parseFloat(record.avg_temperature).toFixed(2)}°C
                  </span>
                  <span className="block text-sm text-gray-500">Dominant Condition: {record.dominant_condition}</span>
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

export default CityWeather;
