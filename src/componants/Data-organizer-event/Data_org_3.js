import React from 'react'
import { Col, Button, Row, Container, Card, Form, img } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

function Data_org_3() {
    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
            {/* Head */}
            <p style={{ fontSize: "2rem" }}>รายละเอียดงาน</p>
            <div style={{ height: "5px", width: "100%", backgroundColor: "#47474A" }}></div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />


            <Container className='mt-5' fluid style={{
                minHeight: "100vh",
                backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
                borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}>
                <Row>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>สิ่งที่จะได้รับ</p>
                        <Form.Control type="text" placeholder="กรอกสิ่งที่จะได้รับ" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>สถานที่จัดงาน</p>
                        <Form.Control type="text" placeholder="กรอกสถานที่จัดงาน" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>เส้นทางการแข่งขัน</p>
                        <Form.Control type="text" placeholder="กรอกเส้นทางการแข่งขัน" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>แผนที่ตำแหน่งการจัดงาน</p>
                        <Form.Control type="text" placeholder="กรอกแผนที่ตำแหน่งการจัดงาน" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>ที่พัก/โรงแรม</p>
                        <Form.Control type="text" placeholder="กรอกที่พัก/โรงแรม" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>สถานที่จัดงาน</p>
                        <Form.Control type="text" placeholder="กรอกสถานที่จัดงาน" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                </Row>
                <p style={{ fontSize: "1.7rem" }}>สินค้า</p>
                <div style={{ height: "5px", width: "5%", backgroundColor: "#47474A" }}></div>
            </Container>
        </Container>
    )
}

export default Data_org_3