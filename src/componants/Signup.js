import React, { useState } from 'react';
import { Col, Button, Row, Container, Form, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import signupAnimation from '../animations/signupanimation.json';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const { t, i18n } = useTranslation()

    const [showPopup, setShowPopup] = useState(false);
    const handleClosePopup = () => {
        setShowPopup(false);
        changepage("signup");
    };


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
            if (error.response.status === 400) {
                setShowPopup(true);
            } else if (error.response) {
                console.error('Error response received:', error.response);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error', error.message);
            }
        }
    };

    return (
        <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
            <Container fluid className="d-flex align-items-center justify-content-center p-0" style={{ minHeight: "100vh" }}>
                <Row className="w-100 h-100">
                    <Col md={6} className="d-none d-md-flex justify-content-center align-items-center p-0">
                        <div className="d-flex justify-content-center align-items-center w-100 h-100">
                            <Lottie
                                animationData={signupAnimation}
                                loop={true}
                                style={{ maxWidth: 500, height: 300 }}  // ขนาดของแอนิเมชัน
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
                            <div className="mb3 mt-md-4">
                                <div className="mb-3 mt-md-4">
                                    <TypeAnimation
                                        className="fw-bold mb-2 text-uppercase"
                                        sequence={[
                                            t('สมัครสมาชิกกับ Gorun!'),
                                            2500,  // รอ 2 วินาทีก่อนวนลูปใหม่
                                            '',
                                            500,  // รอ 2 วินาทีก่อนวนลูปใหม่
                                        ]}
                                        wrapper="span"
                                        speed={50}  // ความเร็วในการพิมพ์
                                        style={{ fontSize: '2em', display: 'inline-block' }}
                                        repeat={Infinity}  // วนลูปอย่างต่อเนื่อง
                                    />
                                    <p className=" mb-5">{t('กรุณากรอกข้อมูลให้ถูกต้อง')}</p>
                                    <Form onSubmit={handleRegister}>
                                        <Form.Group className="mb-3" controlId="formBasicUsername">
                                            <Form.Label className="text-center">
                                                {t('ชื่อผู้ใช้')}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={t("กรอกชื่อผู้ใช้")}
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
                                                {t('ที่อยู่อีเมล')}
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder={t("กรอกอีเมล")}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>{t('รหัสผ่าน')}</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder={t("กรอกรหัสผ่าน")}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                                            <Form.Label>{t('ยืนยันรหัสผ่าน')}</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder={t("กรอกรหัสผ่านอีกครั้ง")}
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
                                                {t('สมัครสมาชิก')}
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-4">
                                        <p className="mb-0 text-center">
                                            {t('ยังไม่มีบัญชี?')}{" "}
                                            <Link onClick={() => changepage("login")} style={{ color: "#F3C710", textDecoration: "none" }}>
                                                {t('เข้าสู่ระบบที่นี่')}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Col>

                    <Modal show={showPopup} onHide={handleClosePopup} centered>
                        <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                            <Modal.Title>{t('ข้อผิดพลาด')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{t('มีอีเมลนี้ในระบบอยู่แล้ว กรุณาลองใหม่อีกครั้ง')}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosePopup}>
                                {t('ปิด')}
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Row>
            </Container>
        </div>
    );
}

export default Signup;
