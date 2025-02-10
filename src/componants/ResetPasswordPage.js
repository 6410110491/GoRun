import React, { useRef, useState } from "react";
import { Container, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

function ResetPasswordPage() {
    const formRef = useRef(null);

    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userInfor, setUserInfor] = useState();

    const [formData, setFormData] = useState({
        email: '',
    });

    const { t, i18n } = useTranslation()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setLoading(true);
        const form = formRef.current;

        // เช็ค form validate
        if (form && form.checkValidity() === false) {
            const firstInvalidField = form.querySelector(':invalid');
            if (firstInvalidField) {
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalidField.focus();
                setValidated(true);
                setLoading(false);
                return;
            }
        }

        try {
            // ดึงข้อมูลผู้ใช้จาก API
            const responseGetUser = await fetch(`http://localhost:4000/api/users/${formData.email}`, {
                method: 'GET',
                credentials: 'include', // Include cookies for session-based auth
            });

            if (!responseGetUser.ok) {
                throw new Error('User not found or server error');
            }

            const userData = await responseGetUser.json(); // รับข้อมูล user

            // เรียก API forgot-password เพื่อรับลิงค์ reset
            const forgotPasswordResponse = await fetch('http://localhost:4000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!forgotPasswordResponse.ok) {
                throw new Error('Failed to generate reset link');
            }

            const { resetLink } = await forgotPasswordResponse.json(); // รับลิงค์จาก API

            // เตรียมข้อมูลส่งอีเมล
            const emailData = {
                service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
                template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_RESETPASSWORD_ID,
                user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
                template_params: {
                    from_name: process.env.REACT_APP_EMAILJS_FROM_NAME,
                    from_email: process.env.REACT_APP_EMAILJS_FROM_EMAIL,
                    to_name: userData.username || 'ผู้ใช้',
                    to_email: formData.email,
                    message: `${resetLink}`,
                }
            };

            // ส่งอีเมลผ่าน EmailJS
            const emailResponse = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Email sent:', emailResponse.data);
        } catch (error) {
            console.error('Error:', error.message);
        }

        setLoading(false);
    };



    return (
        <Container className="mt-5" style={{ minHeight: "100vh", display: 'flex', justifyContent: "center" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">ลืมรหัสผ่าน</h2>
                <Form onSubmit={onSubmit} ref={formRef} noValidate validated={validated}>
                    <Row>
                        <Col
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p>{t('อีเมล')} <span className='requiredstar'>*</span></p>
                            <Form.Group as={Row} controlId="formEmail" style={{ paddingInline: "12px" }}>
                                <Form.Control type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('กรอกอีเมล')}
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "100%",
                                        backgroundColor: "#fff", height: "40px"
                                    }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}
                        style={{ backgroundColor: "#F3C710", border: "none" }}>
                        {loading ? <Spinner animation="border" size="sm" /> : "ส่งคำขอรีเซ็ตรหัสผ่าน"}
                    </Button>
                </Form>
            </div>
        </Container >
    );
}

export default ResetPasswordPage;
