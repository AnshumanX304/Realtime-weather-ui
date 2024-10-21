import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../shared/authContext';
import Appbar from './Appbar';
import { Cloud, Sun, Droplets, Thermometer } from 'lucide-react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const WeatherIcon = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'cloudy':
      return <Cloud className="w-8 h-8 text-gray-500" />;
    case 'sunny':
      return <Sun className="w-8 h-8 text-yellow-500" />;
    case 'rainy':
      return <Droplets className="w-8 h-8 text-blue-500" />;
    default:
      return <Thermometer className="w-8 h-8 text-red-500" />;
  }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Appbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-light text-center mb-8 text-gray-800">
          Weather History for <span className="font-semibold">{name}</span>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {weatherHistory.map((record, index) => (
              <div 
                key={index} 
                className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-2xl font-light text-gray-800 mb-2">
                      {formatDate(record.date)}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <span>Max Temp: {record.max_temperature}°C</span>
                      <span>Min Temp: {record.min_temperature}°C</span>
                      <span>Avg Temp: {parseFloat(record.avg_temperature).toFixed(2)}°C</span>
                      <span>Condition: {record.dominant_condition}</span>
                    </div>
                  </div>
                  <WeatherIcon condition={record.dominant_condition} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityWeather;