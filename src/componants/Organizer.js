import React from 'react'
import { Button, Row, Container } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

function Organizer() {
    const changepage = (path) => {
        window.location.href = "/" + path
    }
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
                        <img src={require("../image/logo2.jpg")} class="card-img-top" alt="logo.jpg"
                            style={{ width: "100px", height: "100px" }} />
                        <h2 className="fw-bold mb-7 text-uppercase">ระบบรับสมัครงานกีฬา</h2>
                        <p className="mb-5">
                            เว็บไซต์เปิดรับสมัครรายการกีฬา รองรับงานกีฬาหลากหลายประเภท
                            สามารถตรวจสอบการชำระเงินและ เก็บข้อมูลผู้สมัครไว้ให้คุณแล้ว
                        </p>
                    </div>
                    <div className="d-grid">
                        <Button onClick={() => changepage("dataorganizer")}
                            style={{
                                backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: "300px",
                            }}>
                            เปิดรายการกีฬา
                        </Button>
                    </div>
                </div>
            </Row>

        </Container>

    )
}

export default Organizer