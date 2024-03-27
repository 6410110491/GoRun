import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

function Form_step_3() {
  return (
    <div>
      <Container className='mt-3' fluid style={{
        backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>
        <Row className='mt-3'>
          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ชื่อ</p>
            <Form.Control type="text" placeholder="กรอกชื่อ" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>สกุล</p>
            <Form.Control type="text" placeholder="กรอกสกุล" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>เบอร์โทรศัพท์</p>
            <Form.Control type="text" placeholder="กรอกเบอร์โทรศัพท์" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col xl={6} md={12} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ที่อยู่</p>
            <Form.Control type="text" placeholder="กรอกที่อยู่" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ตำบล/แขวง</p>
            <Form.Control type="text" placeholder="กรอกตำบล/แขวง" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>อำเภอ/เขต</p>
            <Form.Control type="text" placeholder="กรอกอำเภอ/เขต" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>

        <Row className='mt-3 mb-5'>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>จังหวัด</p>
            <Form.Control type="text" placeholder="กรอกจังหวัด" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>รหัสไปรษณีย์</p>
            <Form.Control type="text" placeholder="กรอกรหัสไปรษณีย์" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Form_step_3