import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ScrollToTop from 'react-scroll-to-top';

function Personal_information() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const changepage = (path) => {
        window.location.href = '/' + path;
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/userinfo', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for session-based auth
                });

                if (response.status === 401) {
                    // Redirect to login if not authenticated
                    changepage('login'); // Adjust the path as necessary
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    throw new Error('Failed to fetch user info');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []); // Add history to dependencies to avoid warnings

    return (
        <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {/* Head */}
            <p style={{ fontSize: '2rem' }}>ข้อมูลส่วนตัว</p>
            <div style={{ height: '5px', width: '100%', backgroundColor: '#47474A' }}></div>

            {/* ScrollToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: '20px', backgroundColor: '#F3C710' }} />

            <Container className='mt-5' fluid style={{
                minHeight: '100vh',
                backgroundColor: '#E3E3E3',
                padding: '1rem 2rem',
                borderRadius: '10px',
                fontSize: '1rem',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : userInfo ? (
                    <div>
                        <p><strong>Username:</strong> {userInfo.username}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        {/* Add more user fields as needed */}
                    </div>
                ) : (
                    <p>No user information available.</p>
                )}
            </Container>
        </Container>
    );
}

export default Personal_information;
