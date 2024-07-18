import React, { useState } from 'react';
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const changepage = (path) => {
        window.location.href = "/" + path;
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/api/register', {
                email,
                password
            });
            console.log(response.data);
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
        <div style={{ display: "inline-flex", width: "100%" }}>
            <Container style={{ backgroundColor: "#F3C710", height: "900px" }}>

            </Container>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Container style={{ borderRadius: "15px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: '1rem', backgroundColor: '#FFF' }}>
                            <div className="mb3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-uppercase ">สมัครสมาชิกกับ Gorun!</h2>
                                <p className=" mb-5">กรุณากรอกข้อมูลให้ถูกต้อง</p>
                                <div className="mb-3">
                                    <Form onSubmit={handleRegister}>
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
                                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                                            <Form.Label>Password again</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password again"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
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
