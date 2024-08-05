import React, { useState } from 'react'
import { Col, Row, Container, Form, } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

function Data_org_2(props) {
  const [dueDate, setDueDate] = useState(dayjs());

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
            <p>ชื่องาน</p>
            <Form.Control type="text" placeholder="กรอกชื่องาน" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
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
            <p>สถานที่จัดงาน</p>
            <Form.Control type="text" placeholder="กรอกสถานที่จัดงาน" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>วันที่แข่งขัน</p>
            <div style={{ marginTop: "-12px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} >
                  <DatePicker
                    slotProps={{ textField: { size: 'small' } }}
                    value={dueDate}
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
          <Col xl={3} md={6} sm={12} className='mt-2'>
            <p>เวลาการแข่งขัน</p>
            <div style={{ marginTop: "-12px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker
                    clearable
                    ampm={false}
                    slotProps={{ textField: { size: 'small' } }}
                    sx={{
                      width: '95%',
                      backgroundColor: "#FFF",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& MuiInputBase-root": { border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }
                    }} />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Col>

          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>วันที่เปิดรับสมัคร</p>
            <div style={{ marginTop: "-12px" }}>
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
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>วันที่ปิดรับสมัคร</p>
            <div style={{ marginTop: "-12px" }}>
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
        </Row>

        <Row className='mt-3'>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>จำนวนรับสมัคร</p>
            <Form.Control type="text" placeholder="กรอกจำนวนรับสมัคร" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ระยะทาง</p>
            <Form.Control type="text" placeholder="กรอกจำนวนรับสมัคร" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>รางวัล</p>
            <Form.Control type="text" placeholder="กรอกจำนวนรับสมัคร" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>รุ่นการแข่งขัน</p>
            <Form.Control type="text" placeholder="กรอกจำนวนรับสมัคร" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>




        <Row className='mt-5'
          style={{ height: "20vh" }}>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ข้อมูลทั่วไป</p>
            <Form.Control as="textarea" rows={3} style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
              backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>วัตถุประสงค์</p>
            <Form.Control as="textarea" rows={3} style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
              backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>

        <Row className='mt-5'
          style={{ height: "20vh" }}>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ความน่าสนใจของงาน</p>
            <Form.Control as="textarea" rows={3} style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
              backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }} />
          </Col>
        </Row>
      </Container>

    </Container>



  )
}


export default Data_org_2
