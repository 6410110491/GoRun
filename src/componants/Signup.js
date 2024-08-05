import React, { useState } from 'react';
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const changepage = (path) => {
        window.location.href = "/" + path;
    };

    const validateForm = () => {
        const errors = {};
        if (!username) errors.username = 'Username is required';
        if (!email) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';
        if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:4000/api/register', {
                username,
                email,
                password,
                registerMethod: 'website'

            });
            console.log(response.data);
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            if (error.response) {
                console.error('There was an error!', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error', error.message);
            }
        }
    };

    return (
        <div style={{ display: "flex", width: "100%" }}>
            <Container style={{ backgroundColor: "#F3C710", height: "700px" }}>
            </Container>
            <Container>
                <Row style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <Col md={8} lg={6} xs={12} style={{ width: "fit-content", height: 'auto' }}>
                        <Container style={{
                            borderRadius: "15px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: '1.5rem 4rem 1.5rem 4rem',
                            backgroundColor: '#FFF'
                        }}>
                            <div className="mb3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-uppercase ">สมัครสมาชิกกับ Gorun!</h2>
                                <p className=" mb-5">กรุณากรอกข้อมูลให้ถูกต้อง</p>
                                <div className="mb-3">
                                    <Form onSubmit={handleRegister}>
                                        <Form.Group className="mb-3" controlId="formBasicUsername">
                                            <Form.Label className="text-center">
                                                Username
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                isInvalid={!!errors.username}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.username}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                                            <Form.Label>Password again</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password again"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                isInvalid={!!errors.confirmPassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button type="submit" style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}>
                                                สมัครสมาชิก
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-4">
                                        <p className="mb-0 text-center">
                                            มีบัญชีผู้ใช้งานแล้วหรือไม่?{" "}
                                            <Link onClick={() => changepage("login")} style={{ color: "#F3C710", textDecoration: "none" }}>
                                                เข้าสู่ระบบที่นี้
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signup;
