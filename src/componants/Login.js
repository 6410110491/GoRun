import React, { useState } from 'react';
import { Col, Button, Row, Container, Form, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Lottie from 'lottie-react';
import loginAnimation from '../animations/login-2.json';
import { TypeAnimation } from 'react-type-animation';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const responseMessage = (response) => {
        if (response.credential) {
            const tokenId = response.credential;
            fetch('http://localhost:4000/api/login/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokenId }),
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
                credentials: 'include'
            });

            if (response.status === 401) {
                setShowPopup(true);
            }

            if (response.ok) {
                const data = await response.json();
                console.log('Login success:', data);
                setEmail('');
                setPassword('');
                changepage("");
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
        <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
            <Container fluid className="d-flex align-items-center justify-content-center p-0" style={{ minHeight: "100vh" }}>
                <Row className="w-100 h-100">
                    <Col md={6} className="d-none d-md-flex justify-content-center align-items-center p-0">
                        <div className="d-flex justify-content-center align-items-center w-100 h-100">
                            <Lottie
                                animationData={loginAnimation}
                                loop={true}
                                style={{ maxWidth: 500, height: "auto", maxHeight: 400 }}
                            />
                        </div>
                    </Col>

                    <Col md={6} className="d-flex justify-content-center align-items-center p-4">
                        <Container className="p-4" style={{
                            borderRadius: "15px",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            backgroundColor: '#FFF',
                            width: "100%",
                            maxWidth: 500,
                            marginBottom: "3rem",
                        }}>
                            <div className="mb-3 mt-md-4">
                                <TypeAnimation
                                    className="fw-bold mb-2 text-uppercase"
                                    sequence={[
                                        'ยินดีต้อนรับเข้าสู่ Gorun!',
                                        2500,  // รอ 2 วินาทีก่อนวนลูปใหม่
                                        '',
                                        500,  // รอ 2 วินาทีก่อนวนลูปใหม่
                                    ]}
                                    wrapper="span"
                                    speed={50}  // ความเร็วในการพิมพ์
                                    style={{ fontSize: '2em', display: 'inline-block' }}
                                    repeat={Infinity}  // วนลูปอย่างต่อเนื่อง
                                />

                                <p className="mb-5">กรุณากรอกข้อมูลให้ถูกต้อง</p>
                                <Form onSubmit={handleLogin}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
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

                                    <div className="d-flex justify-content-between">
                                        <Form.Check
                                            type="checkbox"
                                            id='default-Checkbox'
                                            label='จดจำรหัสผ่าน'
                                        />
                                        <Link to="#!" style={{ color: "#F3C710", textDecoration: "none" }}>
                                            ลืมรหัสผ่าน
                                        </Link>
                                    </div>

                                    <Button
                                        className="w-100 my-3"
                                        style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                    <GoogleLogin
                                        width="100%"
                                        auto_select={false}
                                        text='Login with Google'
                                        onSuccess={responseMessage}
                                        onError={errorMessage}
                                    />
                                </Form>
                                <p className="mt-4 text-center">
                                    ยังไม่มีบัญชีผู้ใช้งานหรือไม่?{" "}
                                    <Link onClick={() => changepage("signup")} style={{ color: "#F3C710", textDecoration: "none" }}>
                                        สมัครสมาชิกที่นี้
                                    </Link>
                                </p>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>

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
        </div>
    );
}

export default Login;
