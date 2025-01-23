import React, { useCallback, useState, useEffect } from 'react';
import Loading from './Loading.jsx';
import { useUser } from '../Store/zustand.js';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../server/server.js';
import { useLocation } from 'react-router-dom';

function Auth({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loader, setLoader] = useState(true);
    const user = useUser(useCallback((state) => state.user, []));

    useEffect(() => {
        console.log('Authenticating user');
        const authenticateUser = async () => {
            try {
                if (!user) {
                    console.log('No user found in store');
                    alert('No user found');
                    navigate('/login-user');
                    return;
                }

                const res = await getCurrentUser();
                if (res) {
                    if (user?._id !== res?._id) {
                        alert('User not authenticated');
                        navigate('/login-user');
                    }
                    setLoader(false);
                } else {
                    alert('No user found');
                    navigate('/login-user');
                }
            } catch (error) {
                console.error('Error authenticating user:', error);
                navigate('/login-user');
            }
        };

        authenticateUser();
    }, [location.pathname, user, navigate]);

    return loader ? <Loading /> : <>{children}</>;
}

export default Auth;
