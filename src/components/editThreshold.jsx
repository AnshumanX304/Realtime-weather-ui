import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../shared/authContext';

const Threshold = () => {
    const [threshold, setThreshold] = useState('');
    const { updateThreshold } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateThreshold({ threshold_temperature: Number(threshold) });
            if (response.data.success) {
                alert('Threshold updated successfully!');
            }
        } catch (error) {
            alert('Error updating threshold: ' + error.response?.data?.msg || error.message);
        } finally {
            navigate('/');
        }
    };

    return (
        <div className="bg-[#737373] h-screen flex justify-center items-center">
            <div className="h-fit w-fit bg-white rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-4">Set Temperature Threshold</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
                            Threshold Temperature (°C)
                        </label>
                        <input
                            type="number"
                            id="threshold"
                            value={threshold}
                            onChange={(e) => setThreshold(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">Enter the temperature in Celsius</p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-800"
                    >
                        Update Threshold
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Threshold;