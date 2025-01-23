import React, { useState, useCallback, useEffect } from 'react';
import { useUser } from '../Store/zustand.js';
import { LogOut } from '../../server/server.js';
import Button from './Button.jsx';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../server/server.js';

function Navbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const user = useUser(useCallback(state => state.user, []));
    const setUser = useUser(useCallback(state => state.setUser, []));
    const navigate = useNavigate();
    // console.log("Username:- ", user?.name);

    const [logoutStatus, setLogoutStatus] = useState('Logout');

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            console.log("Logout clicked");
            setLogoutStatus('Logging out...');
            const res = await LogOut();
            if (!res || res.status >= 300) {
                setLogoutStatus('Logout');
                return;
            }
            setUser(null);
            setDropdownOpen(!isDropdownOpen);
            // console.log(res);
            console.log('Logged out successfully');
            alert(res?.message || "Logged out successfully 😀");
        } catch (error) {
            setLogoutStatus('Logout');
            console.error('Error while logging out:- ', error);
        }

    }

    const handleAuthNav = async function (path) {
        const res = await getCurrentUser();
        if (res) {
            // console.log('User authenticated:', res);
            console.log('User authenticated:');
            
            if (user?._id !== res?._id) {
                alert('User not authenticated');
                navigate('/login-user');
            }
            navigate(String(path));
        } else {
            alert('No user found');
            navigate('/login-user');
        }
    }

    useEffect(() => {
        setDropdownOpen(false);
        setLogoutStatus('Logout');
    }
        , [navigate, user, setUser]);

    return (
        <nav className="bg-gray-100 border-b border-gray-300 shadow-lg">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
                {/* Logo Section */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img
                        src="https://img.icons8.com/?size=100&id=IWS7YZ1UX58d&format=png&color=000000"
                        className="h-10 "
                        alt="Logo"
                    // onClick={() => window.open('https://www.iitj.ac.in/', '_blank')}
                    />
                    <span className="text-2xl font-semibold text-gray-800"
                    // onClick={() => navigate("/")}
                    >CodeForge</span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6 rtl:space-x-reverse cursor-pointer">
                    <div
                        onClick={() => navigate("/user/dashboard")}
                        className="text-gray-800 hover:text-blue-700 transition">Dashboard</div>
                    <div
                        onClick={() => navigate("/user/classrooms")}
                        className="text-gray-800 hover:text-blue-700 transition">Enrolled</div>
                    <div
                        onClick={() => navigate("/user/my-classrooms")}
                        className="text-gray-800 hover:text-blue-700 transition">Authored</div>
                    <div
                        onClick={() => navigate("/user/contests")}
                        className="text-gray-800 hover:text-blue-700 transition">Contests</div>
                    <div
                        onClick={() => navigate("/")}
                        className="text-gray-800 hover:text-blue-700 transition">PlayGround</div>
                </div>

                {/* User Menu */}
                {user ? (
                    <div className="relative flex items-center space-x-4 rtl:space-x-reverse">
                        <button
                            type="button"
                            onClick={toggleDropdown}
                            className="flex items-center justify-center w-10 h-10 border-2 border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <img
                                className="w-8 h-8 rounded-full text-white"
                                src={user?.avatar?.trim() ?? "https://img.icons8.com/?size=100&id=H101gtpJBVoh&format=png&color=000000"}
                                alt="User"
                            />

                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 bg-white text-black top-full mt-2 w-48 border border-gray-200 rounded-lg shadow-lg z-10">
                                <div className="px-4 py-3">
                                    <p className="text-sm font-medium text-gray-300">{user?.username || "username"}</p>
                                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                </div>
                                <ul className="py-2 text-black cursor-pointer">
                                    <li>
                                        <div
                                            onClick={() => navigate("/user/profile")}
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-black transition"
                                        >
                                            Profile
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            onClick={() => navigate("/user/settings")}
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-black transition"
                                        >
                                            Settings
                                        </div>
                                    </li>
                                    <li>
                                        <span
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-black transition"
                                            onClick={handleLogout}
                                        >
                                            {logoutStatus}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <Button
                            text="Login"
                            onClick={() => navigate("/login-user")}
                        />
                        <Button
                            text="register"
                            onClick={() => navigate("/register-user")}
                            class_Name='bg-indigo-600 text-white hover:bg-indigo-500 '
                        />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
