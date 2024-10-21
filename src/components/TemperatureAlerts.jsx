import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../shared/authContext';

const Alert = ({ variant, children }) => {
  const baseStyle = "p-4 mb-4 rounded-md max-w-md w-full";
  const variantStyles = {
    default: "bg-blue-100 border border-blue-400 text-blue-700",
    destructive: "bg-red-100 border border-red-400 text-red-700",
  };

  return (
    <div className={`${baseStyle} ${variantStyles[variant]}`}>
      {children}
    </div>
  );
};

const AlertTitle = ({ children }) => (
  <h4 className="text-lg font-medium mb-2">{children}</h4>
);

const TemperatureAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [thresholdTemperature, setThresholdTemperature] = useState(null);
    const { getAlerts } = useContext(AuthContext);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await getAlerts();
                setAlerts(response.data.alerts);
                setThresholdTemperature(response.data.thresholdTemperature);
            } catch (error) {
                console.error('Error fetching temperature alerts:', error);
            }
        };

        fetchAlerts();
        const interval = setInterval(fetchAlerts, 120000);
        
        return () => clearInterval(interval);
    }, [getAlerts]);

    const AlertContent = () => {
        if (thresholdTemperature === null) {
            return <div>Loading...</div>;
        }

        if (alerts.length === 0) {
            return (
                <Alert variant="default">
                    <AlertTitle>Temperature Alert</AlertTitle>
                    No cities are breaching the threshold temperature of {thresholdTemperature}°C.
                </Alert>
            );
        }

        const cityNames = alerts.map(alert => alert.city).join(', ');

        return (
            <Alert variant="destructive">
                <AlertTitle>Temperature Alert</AlertTitle>
                Cities breaching the threshold temperature of {thresholdTemperature}°C: {cityNames}
            </Alert>
        );
    };

    return (
        <div className="flex justify-center items-center min-h-[100px] px-4">
            <AlertContent />
        </div>
    );
};

export default TemperatureAlerts;