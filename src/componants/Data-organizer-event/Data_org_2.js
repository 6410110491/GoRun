import React, { useState } from 'react'
import { Col, Row, Container, Form, } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

function Data_org_2({formData, setFormData}) {
  // const [formData, setFormData] = useState({
  //   eventName: "",
  //   sportType: "",
  //   location: "",
  //   competitionDate: "",
  //   competitionTime: "",
  //   openRegisDate: "",
  //   closeRegisDate: "",
  //   maxRegis: "",
  //   competitionType: "",
  //   distance: "",
  //   fee: "",
  //   generalInfo: "",
  //   purpose: "",
  //   interesting: "",
  //   reward: "",
  // });

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
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ชื่องาน</p>
            <Form.Control
              type="text"
              placeholder="กรอกชื่องาน"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ประเภทกีฬา</p>
            <Form.Control
              type="text"
              placeholder="กรอกสถานที่จัดงาน"
              name='sportType'
              value={formData.sportType}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>สถานที่จัดงาน</p>
            <Form.Control
              type="text"
              placeholder="กรอกสถานที่จัดงาน"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>วันที่แข่งขัน</p>
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
                    value={formData.competitionDate ? dayjs(formData.competitionDate) : null}
                    onChange={(dueDate) => setFormData({ ...formData, competitionDate: dueDate })}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Col>
        </Row>

        <Row className='mt-3'>
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
                    }}
                    value={formData.competitionTime ? dayjs(formData.competitionTime) : null}
                    onChange={(dueDate) => setFormData({ ...formData, competitionTime: dueDate })}
                  />
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
                    value={formData.openRegisDate ? dayjs(formData.openRegisDate) : null}
                    onChange={(dueDate) => setFormData({ ...formData, openRegisDate: dueDate })}
                    format="DD/MM/YYYY"
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
                    value={formData.closeRegisDate ? dayjs(formData.closeRegisDate) : null}
                    onChange={(dueDate) => setFormData({ ...formData, closeRegisDate: dueDate })}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>จำนวนรับสมัคร</p>
            <Form.Control
              type="number"
              placeholder="กรอกจำนวนรับสมัคร"
              name='maxRegis'
              value={formData.maxRegis}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>รุ่นการแข่งขัน</p>
            <Form.Control
              type="text"
              placeholder="กรอกจำนวนรับสมัคร"
              name='competitionType'
              value={formData.competitionType}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ระยะทาง</p>
            <Form.Control
              type="number"
              placeholder="กรอกจำนวนรับสมัคร"
              name='distance'
              value={formData.distance}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ค่าสมัคร</p>
            <Form.Control
              type="number"
              placeholder="กรอกจำนวนรับสมัคร"
              name='fee'
              value={formData.fee}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ข้อมูลทั่วไป</p>
            <Form.Control
              as="textarea"
              rows={3}
              name='generalInfo'
              value={formData.generalInfo}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>วัตถุประสงค์</p>
            <Form.Control
              as="textarea"
              rows={3}
              name='purpose'
              value={formData.purpose}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ความน่าสนใจของงาน</p>
            <Form.Control
              as="textarea"
              rows={3}
              name='interesting'
              value={formData.interesting}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>รางวัล</p>
            <Form.Control
              as="textarea"
              rows={3}
              name='reward'
              value={formData.reward}
              onChange={handleChange}
              style={{
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
