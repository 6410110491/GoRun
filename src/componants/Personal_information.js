import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        ข้อมูลส่วนตัว
                    </p>
                </div>
            </div>

            {/* ScrollToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: '20px', backgroundColor: '#F3C710' }} />

            <div style={{
                marginTop: '48px',
                minHeight: '100vh',
                backgroundColor: '#E3E3E3',
                padding: '1rem 2rem',
                borderRadius: '10px',
                fontSize: '1rem',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                marginBottom: '2rem',
            }}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : userInfo ? (
                    <div style={{
                        minHeight: '90vh', display: "flex", flexDirection: "column",
                        justifyContent: "space-evenly",
                    }}>
                        <Row style={{ width: "100%" }}>
                            <Col style={{ textAlign: "center", width: "100%" }}>
                                <img
                                    src={userInfo.personalInfo && userInfo.personalInfo.profilePicture
                                        ? userInfo.personalInfo.profilePicture
                                        : require('../image/blank_profile_image.png')}
                                    alt='profile-img.jpg'
                                    style={{
                                        width: "240px", height: "240px", borderRadius: "100%",
                                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginBottom: "1rem"
                                    }}
                                />
                                <p><strong>ชื่อ:</strong> {userInfo.username}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col><p><strong>เพศ:</strong> {userInfo.personalInfo && userInfo.personalInfo.gender ? userInfo.personalInfo.gender : ""}</p></Col>
                            <Col><p><strong>วันเดือนปีเกิด:</strong> {userInfo.personalInfo && userInfo.personalInfo.birthDate ? userInfo.personalInfo.birthDate : ""}</p></Col>
                            <Col><p><strong>เลขบัตรประชาชน:</strong> {userInfo.personalInfo && userInfo.personalInfo.idCardNumber ? userInfo.personalInfo.idCardNumber : ""}</p></Col>
                        </Row>

                        <Row>
                            <Col><p><strong>อีเมล:</strong> {userInfo.email}</p></Col>
                            <Col><p><strong>เบอร์โทรศัพท์:</strong> {userInfo.personalInfo && userInfo.personalInfo.phoneNumber ? userInfo.personalInfo.phoneNumber : ""}</p></Col>
                        </Row>

                        <Row>
                            <Col><p><strong>สัญชาติ:</strong> {userInfo.personalInfo && userInfo.personalInfo.nationality ? userInfo.personalInfo.nationality : ""}</p></Col>
                            <Col><p><strong>หมู่โลหิต:</strong> {userInfo.personalInfo && userInfo.personalInfo.bloodType ? userInfo.personalInfo.bloodType : ""}</p></Col>
                            <Col><p><strong>โรคประจำตัว:</strong> {userInfo.personalInfo && userInfo.personalInfo.chronicDiseases ? userInfo.personalInfo.chronicDiseases.join(', ') : ""}</p></Col>
                        </Row>

                    </div>
                ) : (
                    <p>No user information available.</p>
                )}
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <Button style={{ backgroundColor: "#f3c710", border: "none" }}>
                    แก้ไขข้อมูลส่วนตัว
                </Button>
            </div>

        </Container>
    );
}

export default Personal_information;
