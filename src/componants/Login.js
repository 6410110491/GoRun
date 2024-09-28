import React, { useState } from 'react';
import { Col, Button, Row, Container, Form, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const handleClosePopup = () => {
        setShowPopup(false);
    };


    const responseMessage = (response) => {
        // console.log('Google Login Response:', response);
        if (response.credential) {
            const tokenId = response.credential;
            fetch('http://localhost:4000/api/login/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokenId }), // ส่งโทเค็นไปยังเซิร์ฟเวอร์
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Login Success:', data);
                    changepage("");
                })
                .catch(error => {
                    console.error('Login Error:', error);
                });
        } else {
            console.error('No credential found in the response');
        }
    };


    const errorMessage = (error) => {
        console.log(error);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Important for sessions to send cookies
            });

            if (response.status === 401) {
                setShowPopup(true);
            }

            if (response.ok) {
                const data = await response.json();
                console.log('Login success:', data);
                setEmail('');
                setPassword('');
                console.log(data);
                changepage(""); // Redirect to a new page or refresh
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };



    const changepage = (path) => {
        window.location.href = "/" + path;
    };

    return (
        <div style={{ display: "flex", width: "100%" }}>
            <Container style={{ height: "700px", padding: "0" }}>
                <img src={require("../image/img_login_page.png")} alt="logo" style={{
                    marginTop: "2rem",
                    width: "100%", height: "100%", objectFit: "cover", padding: "0", margin: "0"
                }} />
            </Container>
            <Container>
                <Row style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <Col md={8} lg={6} xs={12} style={{ width: "fit-content", height: 'auto' }}>
                        <Container style={{
                            borderRadius: "15px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: '1.5rem 4rem 1.5rem 4rem',
                            backgroundColor: '#FFF'
                        }}>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-uppercase">ยินดีต้อนรับเข้าสู่ Gorun!</h2>
                                <p className="mb-5">กรุณากรอกข้อมูลให้ถูกต้อง</p>
                                <div className="mb-3">
                                    <Form onSubmit={handleLogin}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                type="string"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>

                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <Form.Check
                                                type="checkbox"
                                                id='default-Checkbox'
                                                label='จดจำรหัสผ่าน'
                                            />
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Link to="#!" style={{ color: "#F3C710", textDecoration: "none" }}>
                                                    ลืมรหัสผ่าน
                                                </Link>
                                            </Form.Group>
                                        </div>

                                        <div className="d-grid">
                                            <Button
                                                style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', marginBottom: "16px" }}
                                                type="submit"
                                            >
                                                Login
                                            </Button>
                                            <GoogleLogin
                                                width={350}
                                                auto_select={true}
                                                text='Login with Google'
                                                onSuccess={responseMessage} onError={errorMessage}
                                            />
                                        </div>
                                    </Form>
                                    <div className="mt-4">
                                        <p className="mb-0 text-center">
                                            ยังไม่มีบัญชีผู้ใช้งานหรือไม่?{" "}
                                            <Link onClick={() => changepage("signup")} style={{ color: "#F3C710", textDecoration: "none" }}>
                                                สมัครสมาชิกที่นี้
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Col>
                </Row >
            </Container >

            <Modal show={showPopup} onHide={handleClosePopup} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>ข้อผิดพลาด</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePopup}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default Login;
