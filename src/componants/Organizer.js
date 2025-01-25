import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Row, Container, Modal, Form } from 'react-bootstrap'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import ScrollToTop from 'react-scroll-to-top'
import { useTranslation } from 'react-i18next';

let selectedFile = null;
function Organizer() {
    const [userInfor, setUserInfor] = useState({});
    const [formData, setFormData] = useState({
        idCardImage: '',
    });
    const [error, setError] = useState('');
    const [showWarningPopup, setShowWarningPopup] = useState(false); // เพิ่มสถานะข้อความเตือน
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const { t, i18n } = useTranslation()

    const changepage = (path) => {
        window.location.href = "/" + path
    }

    const checkToken = () => {
        // ดึงค่า cookies ทั้งหมด
        const cookies = document.cookie;

        // ตรวจสอบว่ามี token หรือไม่
        const tokenExists = cookies.split('; ').some(cookie => cookie.startsWith('token='));

        // ถ้าไม่มี token ให้เปลี่ยนหน้าไปที่ login
        if (!tokenExists) {
            changepage("login");
        }
    };

    const handleOpen = () => {
        setShowPopup(true);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleOpenWarningPopup = () => {
        setShowWarningPopup(true);
    };

    const handleCloseWarningPopup = () => {
        setShowWarningPopup(false);
    };

    const handleAcceptWarning = () => {
        setShowWarningPopup(false);
        setShowPopup(true); // เปิดหน้าแนบหลักฐานเมื่อยอมรับข้อความเตือน
    };

    const handleOpenConFirmPopup = () => {
        setShowPopup(false);
        setShowSuccessPopup(true);
    };

    const handleCloseConFirmPopup = () => {
        setShowPopup(true);
        setShowSuccessPopup(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setError(''); // เคลียร์ข้อผิดพลาดเมื่อผู้ใช้เลือกไฟล์
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setFormData({ ...formData, idCardImage: file });
            selectedFile = file;
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        // ตรวจสอบว่ามีการเลือกไฟล์หรือไม่
        if (!selectedFile) {
            setError('กรุณาแนบไฟล์รูปภาพบัตรประชาชน');
            return;
        }

        try {
            const userResponse = await fetch('http://localhost:4000/api/userinfo', {
                method: 'GET',
                credentials: 'include',
            });

            if (!userResponse.ok) throw new Error('Failed to fetch user info');

            const userData = await userResponse.json();

            let imageUrl = formData.idCardImage;
            if (selectedFile) {
                const formDataForImage = new FormData();
                formDataForImage.append('image', selectedFile);

                // Upload image
                const uploadImage = await fetch('http://localhost:4000/api/images_upload', {
                    method: 'POST',
                    credentials: 'include',
                    body: formDataForImage,
                });

                if (!uploadImage.ok) {
                    throw new Error('Failed to upload image');
                }

                const uploadResponse = await uploadImage.json();
                imageUrl = uploadResponse.url;
            }

            const sendVerificationResponse = await axios.post("http://localhost:4000/api/verifyOrganized", {
                user: userData._id,
                idCardImage: imageUrl
            });

            if (sendVerificationResponse.status === 200) {
                console.log('Success:', sendVerificationResponse);
                setShowSuccessPopup(true); // แสดง popup แจ้งเตือนเมื่อส่งสำเร็จ
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => async () => {
        checkToken();
        const getinfoResponse = await fetch('http://localhost:4000/api/userinfo', {
            method: 'GET',
            credentials: 'include',
        });


        if (getinfoResponse.ok) {
            const data = await getinfoResponse.json();
            setUserInfor(data);
        } else {
            throw new Error('Failed to fetch user info');
        }

        if (userInfor.role === 'organize' || userInfor.role === 'admin') {
            changepage("dataorganizer");
        }
    }, []);


    return (
        <Container className='mt-5' style={{ minHeight: "100vh" }} >
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        {t('สำหรับผู้ที่สนใจจัดงาน')}
                    </p>
                </div>
            </div>

            {/* ScrollToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <div style={{
                    borderRadius: "15px", width: "500px", display: 'flex', flexDirection: 'column',
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: '1rem', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
                }}>
                    <div className="mb-3 mt-md-4">
                        <img src={require("../image/logo2.jpg")} className="card-img-top" alt="logo.jpg"
                            style={{ width: "100px", height: "100px" }} />
                        <h2 className="fw-bold mb-7 text-uppercase">{t('ระบบรับสมัครงานกีฬา')}</h2>
                        <p className="mb-5">
                            {t('เว็บไซต์เปิดรับสมัครรายการกีฬา รองรับงานกีฬาหลากหลายประเภทสามารถตรวจสอบการชำระเงินและ เก็บข้อมูลผู้สมัครไว้ให้คุณแล้ว')}
                        </p>
                    </div>
                    <div className="d-grid">
                        <Button onClick={handleOpenWarningPopup}
                            style={{
                                backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: "300px",
                            }}>
                            {t('เปิดรายการกีฬา')}
                        </Button>
                    </div>
                </div>
            </Row>

            {/* Warning Popup
            <Modal show={showWarningPopup} onHide={handleCloseWarningPopup} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('ข้อตกลงและเงื่อนไข')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ whiteSpace: 'pre-line' }}>
                        {t('เว็บไซต์นี้มีการจัดเก็บใช้และเปิดเผยข้อมูลส่วนบุคคลของคุณตามที่กำหนดในกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA) เพื่อให้เป็นไปตามวัตถุประสงค์ของการให้บริการดังนี้\n\n1. การจัดเก็บข้อมูลส่วนบุคคล\nข้อมูลที่จัดเก็บประกอบด้วย ชื่อ-นามสกุล หมายเลขบัตรประชาชน ที่อยู่ อีเมล หมายเลขโทรศัพท์ และเอกสารยืนยันตัวตนที่เกี่ยวข้อง\n\n2. การใช้งานข้อมูลส่วนบุคคล\n- ใช้สำหรับการยืนยันตัวตนของผู้จัดงาน\n- ใช้สำหรับการตรวจสอบเอกสารหรือข้อมูลเพื่อปฏิบัติตามกฎหมายที่เกี่ยวข้อง\n- ใช้เพื่อการติดต่อหรือแจ้งเตือนที่เกี่ยวข้องกับการให้บริการ\n\n3. การเปิดเผยข้อมูลส่วนบุคคล\nข้อมูลส่วนบุคคลของคุณจะไม่ถูกเปิดเผยให้บุคคลภายนอก ยกเว้นในกรณีที่กฎหมายกำหนดหรือได้รับความยินยอมจากคุณโดยตรง\n\n4. สิทธิของผู้ใช้\nคุณมีสิทธิในการเข้าถึงข้อมูลส่วนบุคคลของคุณ และสามารถร้องขอให้แก้ไขหรือลบข้อมูลดังกล่าวได้ โดยการติดต่อผู้ดูแลระบบผ่านช่องทางที่ระบุในเว็บไซต์')}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseWarningPopup}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยกเลิก')}
                    </Button>
                    <Button variant="success" onClick={handleAcceptWarning}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยอมรับ')}
                    </Button>
                </Modal.Footer>
            </Modal> */}

            <Modal show={showPopup} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('เปิดรับสมัครงานกีฬา')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <p>{t('ยืนยันการเปิดรับสมัครงานกีฬาหรือไม่')}</p>
                    </div>
                    <p style={{
                        fontSize: "16px", fontWeight: "bold",
                        marginTop: "30px", marginBottom: "10px"
                    }}>{t('แนบหลักฐานการยืนยันตัวตน')}</p>
                    <Form.Group controlId='idCardImage'>
                        <Form.Label>{t('รูปบัตรประชาชน')}</Form.Label>
                        <Form.Control
                            required
                            accept=".png,.jpg,.jpeg"
                            type='file'
                            name='idCardImage'
                            onChange={handleFileChange}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยกเลิก')}
                    </Button>
                    <Button variant="success" color="success" onClick={handleConfirm}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยืนยัน')}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Popup */}
            <Modal show={showSuccessPopup} onHide={handleCloseConFirmPopup} centered size='lg'>
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('สำเร็จ')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{
                        display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                        padding: "3rem"
                    }}>
                        <CheckCircleOutlineIcon style={{ fontSize: "10rem", color: "#4CAF50" }} />
                        <p style={{ fontSize: "2.75rem" }}>{t('การส่งหลักฐานยืนยันตัวตนสำเร็จแล้ว')}</p>
                        <p style={{ fontSize: "1.25rem" }}>{t('กรุณารอการตรวจสอบ')}</p>

                        <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', marginTop: "3rem" }}
                            onClick={() => changepage("")}>
                            {t('กลับสู่หน้าหลัก')}
                        </Button>
                    </div>
                </Modal.Body>

            </Modal>
        </Container>
    )
}

export default Organizer;
