import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SetNewPasswordPage() {
    const { token } = useParams(); // ดึง token จาก URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const changepage = (path) => {
        window.location.href = "/" + path
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // ตรวจสอบว่ารหัสผ่านทั้งสองตรงกันหรือไม่
        if (password !== confirmPassword) {
            setError('รหัสผ่านทั้งสองไม่ตรงกัน');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/reset-password`,
                { token, password }
            );

            if (response.status === 200) {
                setSuccess('ตั้งค่ารหัสผ่านใหม่สำเร็จ');
                changepage('login')
            }
        } catch (err) {
            setError('เกิดข้อผิดพลาดในการตั้งค่ารหัสผ่าน');
        }

        setLoading(false);
    };

    return (
        <Container className="mt-5" style={{ minHeight: "100vh", display: 'flex', justifyContent: "center" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">ตั้งค่ารหัสผ่านใหม่</h2>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formPassword">
                                <Form.Label>รหัสผ่านใหม่</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="กรอกรหัสผ่านใหม่"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>ยืนยันรหัสผ่านใหม่</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="ยืนยันรหัสผ่านใหม่"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mt-3"
                        disabled={loading}
                        style={{ backgroundColor: "#F3C710", border: "none" }}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : 'ตั้งค่ารหัสผ่าน'}
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default SetNewPasswordPage;
