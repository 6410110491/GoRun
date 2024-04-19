import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form, img } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Data_org_1(props) {
  const [dueDate, setDueDate] = useState(new Date())
  const gender = ["ชาย", "หญิง", "อื่นๆ",]
  const blood_group = ["A", "B", "AB", "O"]
  return (
    <Container>
      {/* Head */}
      <p style={{ fontSize: "2rem" }}>ข้อมูลผู้จัดงาน</p>
      <div style={{ height: "5px", width: "100%", backgroundColor: "#47474A" }}></div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />


      <Container className='mt-5' fluid style={{
        minHeight: "100vh",
        backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>
        
          <p style={{ fontSize: "1.7rem" }}>ข้อมูลทั่วไป</p>
          <div style={{ height: "5px", width: "10%", backgroundColor: "#47474A" }}></div>
        
        <Row>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", alignItems: "center" }}>
            <img src={require('../image/logo2.jpg')}
              style={{ width: "100px", height: "100px", borderRadius: "100%" }} />
            <p className='ms-3'>รูปภาพประจำตัว</p>
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ชื่อ</p>
            <Form.Control type="text" placeholder="กรอกชื่อ" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>สกุล</p>
            <Form.Control type="text" placeholder="กรอกสกุล" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>เพศ</p>
            <Form.Select aria-label="Default select example" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer"
            }}>
              <option >ไม่ระบุ</option>
              {gender.map((data, index) => {
                return (
                  <option key={index} value={index}>{data}</option>
                )
              })}
            </Form.Select>
          </Col>

        </Row>

        <Row className='mt-3'>
          <Col xl={4} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>วันเดือนปีเกิด</p>
            <div style={{ marginTop: "-22px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} >
                  <DatePicker
                    slotProps={{ textField: { size: 'small' } }}
                    sx={{
                      width: '95%',
                      backgroundColor: "#FFF",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& MuiInputBase-root": { border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }
                    }}
                    onChange={(dueDate) => setDueDate(dueDate)}
                    // onChange={(dueDate) => setDueDate(dueDate.format('DD-MM-YYYY'))}
                    format="DD-MM-YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Col>
          <Col xl={4} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>เลขประจำตัวประชาชน</p>
            <Form.Control type="text" placeholder="กรอกเลขประจำตัวประชาชน" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={4} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>อีเมล</p>
            <Form.Control type="text" placeholder="กรอกอีเมล" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>


        <Row className='mt-3 mb-5'>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>เบอร์โทรศัพท์</p>
            <Form.Control type="text" placeholder="กรอกเบอร์โทรศัพท์" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>สัญชาติ</p>
            <Form.Control type="text" placeholder="กรอกสัญชาติ" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>หมู่โลหิต</p>
            <Form.Select aria-label="Default select example" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer"
            }}>
              <option >ไม่ระบุ</option>
              {blood_group.map((data, index) => {
                return (
                  <option key={index} value={index}>{data}</option>
                )
              })}
            </Form.Select>
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>โรคประจำตัว</p>
            <Form.Control type="text" placeholder="กรอกโรคประจำตัว" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>



        <p style={{ fontSize: "1.7rem" }}>ที่อยู่ปัจจุบัน</p>
          <div style={{ height: "5px", width: "10%", backgroundColor: "#47474A" }}></div>
        
        <Row>
          <Col xl={3} md={6} sm={12} className='mt-2'
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
          
          <Col xl={4} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>อำเภอ</p>
            <Form.Control type="text" placeholder="กรอกอำเภอ" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={4} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>จังหวัด</p>
            <Form.Control type="text" placeholder="กรอกจังหวัด" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={4} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>รหัสไปรษณีย์</p>
            <Form.Control type="text" placeholder="กรอกรหัสไปรษณีย์" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>

      </Container>
    </Container>
  )
}


export default Data_org_1
