import React, { useEffect, useState } from 'react'
import { Button, Row, Container, Modal } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

function Organizer() {
    const [userInfor, setUserInfor] = useState({});
    const changepage = (path) => {
        window.location.href = "/" + path
    }

    const [showPopup, setShowPopup] = useState(false);
    const handleOpen = () => {
        setShowPopup(true);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
            const getinfoResponse = await fetch('http://localhost:4000/api/userinfo', {
                method: 'GET',
                credentials: 'include', // Include cookies for session-based auth
            });

            if (getinfoResponse.ok) {
                const data = await getinfoResponse.json();
                setUserInfor(data);
            } else {
                throw new Error('Failed to fetch user info');
            }

            const updatedUserData = {
                ...userInfor,
                role: 'organize',
            };

            if (userInfor.role !== 'organize') {
                const response = await fetch('http://localhost:4000/api/user/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Include cookies for session-based auth
                    body: JSON.stringify(updatedUserData),
                });
                if (response.ok) {
                    console.log("Change role to Organize success")
                } else {
                    console.log("Failed")

                }
            }
        }
        catch (err) {
            console.log(err.message);
        }

        changepage("dataorganizer")
    };

    useEffect(() => {
        if (userInfor.role === 'organize') {
            changepage("dataorganizer")
        }
    }, []);

    return (
        <Container className='mt-5' style={{ minHeight: "100vh" }} >
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        สำหรับผู้ที่สนใจจัดงาน
                    </p>
                </div>
            </div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <div style={{
                    borderRadius: "15px", width: "500px", display: 'flex', flexDirection: 'column',
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: '1rem', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
                }}>
                    <div className="mb-3 mt-md-4">
                        <img src={require("../image/logo2.jpg")} className="card-img-top" alt="logo.jpg"
                            style={{ width: "100px", height: "100px" }} />
                        <h2 className="fw-bold mb-7 text-uppercase">ระบบรับสมัครงานกีฬา</h2>
                        <p className="mb-5">
                            เว็บไซต์เปิดรับสมัครรายการกีฬา รองรับงานกีฬาหลากหลายประเภท
                            สามารถตรวจสอบการชำระเงินและ เก็บข้อมูลผู้สมัครไว้ให้คุณแล้ว
                        </p>
                    </div>
                    <div className="d-grid">
                        <Button onClick={handleOpen}
                            style={{
                                backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: "300px",
                            }}>
                            เปิดรายการกีฬา
                        </Button>
                    </div>
                </div>
            </Row>

            <Modal show={showPopup} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>เปิดรับสมัครงานกีฬา</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>ยืนยันการเปิดรับสมัครงานกีฬาหรือไม่</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" color="success" onClick={handleConfirm}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        ยืนยัน
                    </Button>
                </Modal.Footer>
            </Modal>



        </Container>

    )
}

export default Organizer