import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Form, } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';


function Data_org_1(props) {
  const [dueDate, setDueDate] = useState(dayjs());
  const gender = ["ชาย", "หญิง", "อื่นๆ",]
  const blood_group = ["A", "B", "AB", "O"]

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const changepage = (path) => {
    window.location.href = '/' + path;
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
          setUserInfo(data);
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
  }, []); // Add history to dependencies to avoid warnings


  return (
    <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
      {/* Head */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            ข้อมูลผู้จัดงาน
          </p>
        </div>
      </div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : userInfo ? (

        <Container className='mt-5' fluid style={{
          minHeight: "100vh",
          backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
        }}>

          <div style={{ width: "15%", textAlign: 'center' }}>
            <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
              ข้อมูลทั่วไป
            </p>
          </div>

          <Row>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", alignItems: "center" }}>
              <img src={require('../../image/logo2.jpg')} alt='logo.jpg'
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



          <div style={{ width: "15%", textAlign: 'center' }}>
            <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
              ที่อยู่ปัจจุบัน
            </p>
          </div>

          <Row>
            <Col xl={6} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>ที่อยู่</p>
              <Form.Control type="text" placeholder="กรอกที่อยู่" style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
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
              <p>อำเภอ</p>
              <Form.Control type="text" placeholder="กรอกอำเภอ" style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
            </Col>

          </Row>
          <Row className='mt-3'>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>จังหวัด</p>
              <Form.Control type="text" placeholder="กรอกจังหวัด" style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>รหัสไปรษณีย์</p>
              <Form.Control type="text" placeholder="กรอกรหัสไปรษณีย์" style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
            </Col>
          </Row>

        </Container>
      ) : (
        <p>No user information available.</p>
      )}
    </Container>
  )
}


export default Data_org_1
