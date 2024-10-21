import React, { useState } from 'react';
import { useRecoilValue } from "recoil";
import { detailsAtom } from "../Store/Atoms/DetailsAtom";
import { Menu, X, Sliders, LogOut } from 'lucide-react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Appbar = () => {
    const details = useRecoilValue(detailsAtom);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { name: 'Set threshold', icon: Sliders, action: () => navigate('/edit-threshold') },
    ];

    const handleLogout = () => {
        Cookies.remove('ac_token');
        localStorage.setItem("isLoggedin", 'false');
        navigate('/login');
    };

    return (
        <nav className="bg-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">WeatherUp</div>
                <div className="relative">
                    <button onClick={toggleMenu} className="text-white">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                            <div className="px-4 py-2 text-sm text-gray-700">
                                Hey, {details.user}!
                            </div>
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        item.action();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                    <item.icon size={18} className="mr-2" />
                                    {item.name}
                                </button>
                            ))}
                            <div className="border-t border-gray-100"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                                <LogOut size={18} className="mr-2" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Appbar;