import React from 'react'
import { Col, Button, Row, Container, Card, Form , img} from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Link } from 'react-router-dom';

function Organizer() {
    return (
        <Container className='mt-5' style={{ minHeight: "100vh" }} >
            {/* Head */}
            <p style={{ fontSize: "2rem" }}>สำหรับผู้ที่สนใจจัดงาน</p>
            <div style={{ height: "5px", width: "100%", backgroundColor: "#47474A" }}></div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            <Row className="vh-100 d-flex justify-content-center align-items-center">

                <div  style={{ borderRadius: "15px", width:"500px", display:'flex',flexDirection:'column',
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding:'1rem', justifyContent:'center', alignItems:'center' ,textAlign:'center' }}>
                        <div className="mb-3 mt-md-4">
                            <img src= {require("../image/logo2.jpg")} class="card-img-top" alt="logo.jpg" 
                            style={{width: "100px", height: "100px" }}/>
                            <h2 className="fw-bold mb-7 text-uppercase">ระบบรับสมัครงานกีฬา</h2>
                            <p className="mb-5">
                                เว็บไซต์เปิดรับสมัครรายการกีฬา รองรับงานกีฬาหลากหลายประเภท
                                สามารถตรวจสอบการชำระเงินและ เก็บข้อมูลผู้สมัครไว้ให้คุณแล้ว
                            </p>
                        </div>
                        <div className="d-grid">
                            <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width:"300px", 
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