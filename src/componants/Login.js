import React, { useState, useEffect } from 'react';
import { Col, Button, Row, Container, Form, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Lottie from 'lottie-react';
import loginAnimation from '../animations/login-2.json';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const { t, i18n } = useTranslation()
    useEffect(() => {
        // ดึงค่าภาษาเริ่มต้นจาก localStorage หรือใช้ค่าภาษาเริ่มต้นจาก i18n
        const savedLanguage = localStorage.getItem('i18nextLng') || i18n.language || 'en';
        i18n.changeLanguage(savedLanguage); // กำหนดภาษาเริ่มต้น
    }, [i18n]);




    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const responseMessage = (response) => {
        if (response.credential) {
            const tokenId = response.credential;
            fetch(`${process.env.REACT_APP_API_URL}/api/login/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tokenId }),
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
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

    const [showPolicyPopup, setShowPolicyPopup] = useState(true);

    const handleClosePolicyPopup = () => {
        changepage("")
    };

    const handleAcceptPolicy = () => {
        setShowPolicyPopup(false);
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

                    {/* Warning Popup */}
                    <Modal show={showPolicyPopup} onHide={handleClosePolicyPopup} centered style={{
                        maxHeight: "80vh", // กำหนดความสูงสูงสุดของ Modal
                        marginTop: "4.75rem"
                    }}>
                        <Modal.Header closeButton style={{
                            backgroundColor: "#F3C710", // สีพื้นหลัง
                            color: "#FFF",
                            position: "sticky", // กำหนด Sticky
                            top: 0, // ติดด้านบน
                            zIndex: 1020, // เลเยอร์สูงกว่าเนื้อหาใน Modal.Body
                        }}>
                            <Modal.Title>{t('ข้อตกลงและเงื่อนไข')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p style={{ whiteSpace: 'pre-line' }}>
                                {t('เว็บไซต์นี้มีการจัดเก็บและเปิดเผยข้อมูลส่วนบุคคลของคุณตามที่กำหนดในกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA) เพื่อให้เป็นไปตามวัตถุประสงค์ของการให้บริการ ดังนี้\n\n1. การเก็บรวบรวมข้อมูลส่วนบุคคล\nข้อมูลส่วนบุคคลที่เก็บรวบรวมเพื่อวัตถุประสงค์ในการสมัครและจัดงานกีฬา ประกอบด้วย ชื่อ-นามสกุล หมายเลขบัตรประชาชน ที่อยู่ อีเมล หมายเลขโทรศัพท์ และเอกสารยืนยันตัวตนที่เกี่ยวข้อง\n\n2. การใช้ข้อมูลส่วนบุคคล\n- ใช้เพื่อยืนยันตัวตนของผู้สมัครและผู้จัดงาน\n- ใช้ในการตรวจสอบเอกสารหรือข้อมูลตามกฎหมายที่เกี่ยวข้อง\n- ใช้เพื่อการสื่อสาร ติดต่อ หรือแจ้งเตือนเกี่ยวกับกิจกรรมและการดำเนินการจัดงานกีฬา\n\n3. การเปิดเผยข้อมูลส่วนบุคคล\nข้อมูลส่วนบุคคลของคุณจะไม่ถูกเปิดเผยต่อบุคคลภายนอก ยกเว้นในกรณีที่จำเป็นตามกฎหมายหรือได้รับความยินยอมจากคุณโดยตรง\n\n4. สิทธิของผู้สมัครและผู้เข้าร่วม\nคุณมีสิทธิในการเข้าถึงข้อมูลส่วนบุคคลของคุณ และสามารถร้องขอให้แก้ไขหรือลบข้อมูลดังกล่าวได้ โดยติดต่อทีมงานผ่านช่องทางที่ระบุในเว็บไซต์')}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClosePolicyPopup}
                                style={{ border: 'none', borderRadius: '10px' }}>
                                {t('ยกเลิก')}
                            </Button>
                            <Button variant="success" onClick={handleAcceptPolicy}
                                style={{ border: 'none', borderRadius: '10px' }}>
                                {t('ยอมรับ')}
                            </Button>
                        </Modal.Footer>
                    </Modal>

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
                                        t('ยินดีต้อนรับเข้าสู่ Gorun!'),
                                        2500,  // รอ 2 วินาทีก่อนวนลูปใหม่
                                        '',
                                        500,  // รอ 2 วินาทีก่อนวนลูปใหม่
                                    ]}
                                    wrapper="span"
                                    speed={50}  // ความเร็วในการพิมพ์
                                    style={{ fontSize: '2em', display: 'inline-block' }}
                                    repeat={Infinity}  // วนลูปอย่างต่อเนื่อง
                                />

                                <p className="mb-5">{t('กรุณากรอกข้อมูลให้ถูกต้อง')}</p>
                                <Form onSubmit={handleLogin}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>{t('ที่อยู่อีเมล')}</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder={t("กรอกที่อยู่อีเมล")}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>{t('รหัสผ่าน')}</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder={t("กรอกรหัสผ่าน")}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Link to="/password/reset" style={{ color: "#F3C710", textDecoration: "none" }}>
                                            {t('ลืมรหัสผ่าน')}
                                        </Link>
                                    </div>

                                    <Button
                                        className="w-100 my-3"
                                        style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                                        type="submit"
                                    >
                                        {t('เข้าสู่ระบบ')}
                                    </Button>
                                    <GoogleLogin
                                        width="100%"
                                        auto_select={false}
                                        text='Login with Google'
                                        onSuccess={responseMessage}
                                        onError={errorMessage}
                                    >
                                        <Button variant='outlined'>Login with Google</Button>
                                    </GoogleLogin>
                                </Form>
                                <p className="mt-4 text-center">
                                    {t('ยังไม่มีบัญชี?')}{" "}
                                    <Link onClick={() => changepage("signup")} style={{ color: "#F3C710", textDecoration: "none" }}>
                                        {t('สมัครสมาชิกได้ที่นี่')}
                                    </Link>
                                </p>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Modal show={showPopup} onHide={handleClosePopup} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('ข้อผิดพลาด')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePopup}>
                        {t('ปิด')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Login;
