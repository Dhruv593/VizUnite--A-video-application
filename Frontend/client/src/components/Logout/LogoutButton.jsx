import React from 'react'
import { useAuth } from '../../context/AuthContext';

function LogoutButton() {

    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error.response.data);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton
