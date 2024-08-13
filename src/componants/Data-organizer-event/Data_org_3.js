import React, { useState } from 'react'
import { Col, Row, Container, Form, } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

function Data_org_3({formData, setFormData}) {
    // const [formData, setFormData] = useState({
    //     whatToReceive: "",
    //     route: "",
    //     map: "",
    //     accommodation: "",
    //     foodStalls: "",
    // })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        รายละเอียดงาน
                    </p>
                </div>
            </div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />


            <Container className='mt-5' fluid style={{
                minHeight: "100vh",
                backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
                borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}>
                <Row>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>สิ่งที่จะได้รับ</p>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            placeholder="กรอกสิ่งที่จะได้รับ"
                            name="whatToReceive"
                            value={formData.whatToReceive}
                            onChange={handleChange}
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>เส้นทางการแข่งขัน</p>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            placeholder="กรอกสิ่งที่จะได้รับ"
                            name="route"
                            value={formData.route}
                            onChange={handleChange}
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>แผนที่ตำแหน่งการจัดงาน</p>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            placeholder="กรอกแผนที่ตำแหน่งการจัดงาน"
                            name="map"
                            value={formData.map}
                            onChange={handleChange}
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>ที่พัก/โรงแรม</p>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            placeholder="กรอกที่พัก/โรงแรม"
                            name="accommodation"
                            value={formData.accommodation}
                            onChange={handleChange}
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                </Row>


                <Row className='mt-3' style={{ marginBottom: "48px" }}>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>ร้านอาหาร</p>
                        <Form.Control as="textarea"
                            rows={3}
                            type="text"
                            placeholder="กรอกร้านอาหาร"
                            name="foodStalls"
                            value={formData.foodStalls}
                            onChange={handleChange}
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                </Row>


                <div style={{ width: "15%", textAlign: 'center' }}>
                    <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
                        สินค้า
                    </p>
                </div>

                <Row className='mt-3'>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>ประเภทเสื้อ</p>
                        <Form.Control type="text" placeholder="กรอกจำนวนรับสมัคร" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>ขนาดเสื้อ</p>
                        <Form.Control type="text" placeholder="กรอกจำนวนรับสมัคร" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>อื่นๆ</p>
                        <Form.Control type="text" placeholder="กรอกจำนวนรับสมัคร" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                </Row>
            </Container>
        </Container >
    )
}

export default Data_org_3