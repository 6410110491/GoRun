import React, { useState } from 'react';
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const responseMessage = (response) => {
        console.log(response);
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
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store token in local storage
                console.log('Login success:', data);
                setEmail('');
                setPassword('');
                changepage(""); // Redirect to a new page or refresh
            } else {
                throw new Error('Login failed');
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
            <Container style={{ backgroundColor: "#F3C710", height: "700px" }}>
                {/* Your branding or background */}
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
                                                type="email"
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
        </div >
    );
}

export default Login;
