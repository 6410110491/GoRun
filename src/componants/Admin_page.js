import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row, Tab, Tabs, Badge, Form, Accordion } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Admin_page() {
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState('');
    const [verifyData, setVerifyData] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const { t, i18n } = useTranslation()

    const [formData, setFormData] = useState({
        comment: '',
    });

    const [key, setKey] = useState('pending');

    const changepage = (path) => {
        window.location.href = "/" + path
    }

    const handleConfirm = async () => {
        const response = await fetch(`http://localhost:4000/api/${selectedItem.user_id}/update/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ role: 'organize' }),
        });

        const verifyResponse = await fetch(`http://localhost:4000/api/${selectedItem._id}/verifyOrganized`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ status: 'approved' }),
        });

        if (response.ok && verifyResponse.ok) {
            console.log('User updated');
            setConFirmPopup(false);
        } else {
            console.error('Error updating user:', response.statusText);
        }

        const data = {
            service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
            template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
            template_params: {
                from_name: process.env.REACT_APP_EMAILJS_FROM_NAME,
                from_email: process.env.REACT_APP_EMAILJS_FROM_EMAIL,
                to_name: selectedItem.username,
                to_email: selectedItem.email,
                message: 'ยินดีด้วย คุณได้รับการอนุมัติให้เป็นผู้จัดงานแล้ว',
            }
        }

        try {
            const emailResponse = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Email sent:', emailResponse.data);
        }
        catch (error) {
            console.error('Failed to send email:', error);
        }
        window.location.reload();
    };

    const [showPopup, setShowPopup] = useState(false);
    const handleOpen = () => {
        setShowPopup(true);
    };

    const handleClose = () => {
        setShowPopup(false);
    }

    const handleReject = async () => {
        setShowPopup(false);
        setRejectPopup(true);
    };

    // Confirm popup
    const [showConfirmPopup, setConFirmPopup] = useState(false);
    const handleOpenConFirmPopup = (e) => {
        e.preventDefault();
        setShowPopup(false);
        setConFirmPopup(true);
    };

    const handleCloseConFirmPopup = () => {
        setShowPopup(true);
        setConFirmPopup(false);
    };

    // Confirm Reject popup
    const [showRejectPopup, setRejectPopup] = useState(false);
    const handleOpenConFirmRejectPopup = async () => {
        const verifyResponse = await fetch(`http://localhost:4000/api/${selectedItem._id}/verifyOrganized`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ status: 'rejected' }),
        });

        if (verifyResponse.ok) {
            console.log('User updated');
            setShowPopup(false);
        } else {
            console.error('Error updating user:', verifyResponse.statusText);
        }

        const data = {
            service_id: process.env.REACT_APP_EMAILJS_SERVICE_ID,
            template_id: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
            template_params: {
                from_name: process.env.REACT_APP_EMAILJS_FROM_NAME,
                from_email: process.env.REACT_APP_EMAILJS_FROM_EMAIL,
                to_name: selectedItem.username,
                to_email: selectedItem.email,
                message: `เสียใจด้วย คุณไม่ได้รับอนุมัติให้เป็นผู้จัดงาน เนื่องจาก ${formData.comment}`,
            }
        }

        try {
            const emailResponse = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Email sent:', emailResponse.data);
        }
        catch (error) {
            console.error('Failed to send email:', error);
        }
        window.location.reload();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCloseRejectPopup = () => {
        setShowPopup(true);
        setRejectPopup(false);
    };


    const [showDetail, setShowDetail] = useState(false);
    const handleOpenDetail = (item) => {
        setSelectedItem(item);
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
    };


    const formatDate = (date) => {
        if (!date) return '';

        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
        const day = String(d.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const getFilteredRegistrations = (status) => {
        return verifyData.filter(item => item.status === status);
    };


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/userinfo', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for session-based auth
                });

                if (response.status === 401) {
                    // Redirect to login if not authenticated
                    changepage('login'); // Adjust the path as necessary
                    return;
                }

                if (response.ok) {
                    const data = await response.json();

                    if (data.role === 'admin') {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                } else {
                    throw new Error('Failed to fetch user info');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchVerifyOrganizer = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/verifyOrganized', {
                    method: 'GET',
                    credentials: 'include',
                });


                if (response.ok) {
                    const data = await response.json();
                    setVerifyData(data);
                } else {
                    throw new Error('Failed to fetch organizer verification data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVerifyOrganizer();
    }, []);

    console.log(verifyData);

    return (
        <Container className='mt-5' style={{ minHeight: "100vh" }} >

            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        {t('ตรวจสอบการเป็นผู้จัดงาน')}
                    </p>
                </div>
            </div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            {loading ? (
                <p>Loading...</p>
            ) : (
                isAuthorized ? (
                    <div style={{ width: "100%", height: "min-content", backgroundColor: "#FFF", marginTop: "3rem" }}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="pending" title={
                                <>
                                    {t('รอการตรวจสอบ')} {getFilteredRegistrations('pending').length === 0 ? "" : <Badge bg="danger">{getFilteredRegistrations('pending').length}</Badge>}
                                </>
                            }>
                                <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ลำดับ')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ชื่อ-สกุล')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('วันที่สมัคร')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('สถานะ')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('การดำเนินการ')}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {getFilteredRegistrations('pending').length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" style={{ padding: "3rem" }}>
                                                        <p>{t('No data')}</p>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                getFilteredRegistrations('pending').map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="center"><p>{index + 1}</p></TableCell>
                                                        <TableCell align="center"><p>{item.username}</p></TableCell>
                                                        <TableCell align="center"><p>{formatDate(item.createdAt)}</p></TableCell>
                                                        <TableCell align="center">
                                                            <p>{t('รอการตรวจสอบ')}</p>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button
                                                                variant="warning"
                                                                color="secondary"
                                                                onClick={() => {
                                                                    setSelectedItem(item);
                                                                    handleOpen();
                                                                }}
                                                                style={{ marginRight: '8px', color: "white" }}
                                                            >
                                                                {t('ตรวจสอบ')}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Tab>

                            <Tab eventKey="approved" title={t("อนุมัติ")}>
                                <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ลำดับ')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ชื่อ-สกุล')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('วันที่สมัคร')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('สถานะ')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('การดำเนินการ')}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {getFilteredRegistrations('approved').length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" style={{ padding: "3rem" }}>
                                                        <p>{t('No data')}</p>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                getFilteredRegistrations('approved').map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="center"><p>{index + 1}</p></TableCell>
                                                        <TableCell align="center"><p>{item.username}</p></TableCell>
                                                        <TableCell align="center"><p>{formatDate(item.createdAt)}</p></TableCell>
                                                        <TableCell align="center">
                                                            <p style={{ color: 'green' }}>{t('อนุมัติ')}</p>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button
                                                                variant="warning"
                                                                color="secondary"
                                                                onClick={() => {
                                                                    handleOpenDetail(item);
                                                                }}
                                                                style={{ marginRight: '8px', color: "white" }}
                                                            >
                                                                {t('ดูรายละเอียด')}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Tab>

                            <Tab eventKey="rejected" title={t("ไม่อนุมัติ")}>
                                <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                            <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ลำดับ')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ชื่อ-สกุล')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('วันที่สมัคร')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('สถานะ')}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('การดำเนินการ')}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {getFilteredRegistrations('rejected').length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" style={{ padding: "3rem" }}>
                                                        <p>{t('No data')}</p>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                getFilteredRegistrations('rejected').map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="center"><p>{index + 1}</p></TableCell>
                                                        <TableCell align="center"><p>{item.username}</p></TableCell>
                                                        <TableCell align="center"><p>{formatDate(item.createdAt)}</p></TableCell>
                                                        <TableCell align="center">
                                                            <p style={{ color: 'red' }}>{t('ไม่อนุมัติ')}</p>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button
                                                                variant="warning"
                                                                color="secondary"
                                                                onClick={() => {
                                                                    handleOpenDetail(item);
                                                                }}
                                                                style={{ marginRight: '8px', color: "white" }}
                                                            >
                                                                {t('ดูรายละเอียด')}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Tab>
                        </Tabs>
                    </div>
                ) : (
                    <p>{t('คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้')}</p>
                )
            )}



            <Modal show={showPopup} onHide={handleClose} size="xl">
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('ตรวจสอบข้อมูลผู้จัดงาน')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && ( // แสดงข้อมูลในโมดอลเฉพาะเมื่อมีผู้เลือก
                        <>
                            <p style={{ fontSize: "14px" }}>{t('สถานะการสมัคร')} : {selectedItem.status}</p>
                            <p style={{ fontSize: "14px" }}>{t('วันที่ส่งหลักฐาน')} : {formatDate(selectedItem.createdAt)}</p>
                            <p style={{ fontSize: "14px" }}>{t('ยืนยันเสร็จสมบูรณ์')} : {/* ใส่ข้อมูลเกี่ยวกับการยืนยัน */}</p>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{t('หลักฐานการยืนยันตัวตน')}</p>
                            <Row >
                                <Col style={{ textAlign: "center", width: "100%" }}>
                                    <img
                                        src={selectedItem.idCardImage || require('../image/QR-Code.jpg')} // แสดงรูปภาพจากข้อมูลที่เลือก
                                        alt='image'
                                        style={{
                                            maxWidth: "50%",
                                            height: "auto",
                                            borderRadius: "10px",
                                            marginBottom: "10px",
                                            marginTop: "10px"
                                        }}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleReject}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ไม่อนุมัติ')}
                    </Button>
                    <Button variant="success" color="success" onClick={handleOpenConFirmPopup}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('อนุมัติ')}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal showDetail */}
            <Modal show={showDetail} onHide={handleCloseDetail} size="lg">
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('รายละเอียดข้อมูลการสมัคร')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && (
                        <>
                            <p style={{ fontSize: "14px" }}>{t('สถานะการสมัคร')} : {selectedItem.status}</p>
                            <p style={{ fontSize: "14px" }}>{t('วันที่ส่งหลักฐาน')} : {formatDate(selectedItem.createdAt)}</p>
                            <p style={{ fontSize: "14px" }}>{t('ยืนยันเสร็จสมบูรณ์')} : {/* ใส่ข้อมูลเกี่ยวกับการยืนยัน */}</p>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{t('หลักฐานการยืนยันตัวตน')}</p>
                            <Row >
                                <Col style={{ textAlign: "center", width: "100%" }}>
                                    <img
                                        src={selectedItem.idCardImage || require('../image/QR-Code.jpg')} // แสดงรูปภาพจากข้อมูลที่เลือก
                                        alt='image'
                                        style={{
                                            maxWidth: "50%",
                                            height: "auto",
                                            borderRadius: "10px",
                                            marginBottom: "10px",
                                            marginTop: "10px"
                                        }}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseDetail}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ปิด')}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* confirm popup */}
            <Modal show={showConfirmPopup} onHide={handleCloseConFirmPopup} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('ยืนยันตัวตน')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('ยืนยันข้อมูลของผู้ใช้งานท่านนี้หรือไม่')}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConFirmPopup}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยกเลิก')}
                    </Button>
                    <Button variant="success" color="success" onClick={handleConfirm}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยืนยัน')}
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* confirm reject popup */}
            <Modal show={showRejectPopup} onHide={handleCloseRejectPopup} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('ยืนยันตัวตน')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('คุณแน่ใจหรือไม่ที่จะไม่อนุมัติผู้ใช้งานดังกล่าว')}</p>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{t('หมายเหตุ')}</Form.Label>
                            <Form.Control as="textarea" rows={3} type="text" placeholder="กรอกหมายเหตุ"
                                name="comment" onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRejectPopup}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยกเลิก')}
                    </Button>
                    <Button variant="success" color="success" onClick={handleOpenConFirmRejectPopup}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยืนยัน')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )
}

export default Admin_page