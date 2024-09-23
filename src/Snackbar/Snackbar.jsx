/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

const Snackbar = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Display for 3 seconds

            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    return (
        <div style={{
            visibility: message ? 'visible' : 'hidden',
            minWidth: '150px',
            backgroundColor: '#333',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '2px',
            padding: '5px',
            position: 'fixed',
            zIndex: 1,
            left: '50%',  // Center horizontally
            top: '20px',   // Position it at the top
            transform: 'translateX(-50%)',  // Center the snackbar itself
            fontSize: '17px',
            transition: 'visibility 0.5s ease-in-out'
        }}>
            {message}
        </div>
    );
}

export default Snackbar;
