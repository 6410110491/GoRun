import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Form_step_4() {
  const [dueDate, setDueDate] = useState(new Date())
  const [file, setFile] = useState()

  function handleOnChange(e) {
    const target = e.target
    setFile(target.files[0])
  }

  function onSubmmit() {
    console.log(file)
  }
  return (
    <div>
      <Container className='mt-3' fluid style={{
        backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>

        {/* สรุปรายการสมัคร */}
        <Container fluid style={{
          backgroundColor: "#FFF", height: "auto", padding: "0 0 0.5rem 0",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginTop: "1.5rem"
        }}>
          <Container className='mb-2' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            สรุปรายการสมัคร
          </Container>

          <p className='ms-3'>ประเภท : </p>
          <p className='ms-3'>ค่าสมัคร :  </p>
          <p className='ms-3'>ค่าจัดส่ง : </p>
          <p className='ms-3'>ยอดชำระทั้งหมด : </p>

        </Container>

        {/* ข้อมูลการจัดส่ง */}
        <Container fluid style={{
          backgroundColor: "#FFF", height: "auto", padding: "0 0 0.5rem 0",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginTop: "3rem"
        }}>
          <Container className='mb-2' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            ข้อมูลการจัดส่ง
          </Container>

          <p className='ms-3'>ที่อยู่การจัดส่ง : </p>
        </Container>


        {/* ข้อมูลผู้สมัคร */}
        <Container fluid style={{
          backgroundColor: "#FFF", height: "auto", padding: "0 0 0.5rem 0",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginTop: "3rem"
        }}>
          <Container className='mb-2' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            ข้อมูลผู้สมัคร
          </Container>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>ชื่อผู้สมัคร : </p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>ระยะที่สมัคร : </p></Col>
          </Row>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>วันเดือนปีเกิด : </p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>เลขประจำตัวประชาชน : </p></Col>
          </Row>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>เบอร์โทรศัพท์ : </p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>โรคประจำตัว : </p></Col>
          </Row>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>สัญชาติ : </p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>หมู่โลหิต : </p></Col>
          </Row>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>ชนิดเสื้อ : </p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>ขนาดเสื้อ : </p></Col>
          </Row>
        </Container>

        {/* ช่องทางชำระเงิน */}
        <Container fluid style={{
          backgroundColor: "#FFF", height: "auto", padding: "0 0 0.5rem 0",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginTop: "3rem"
        }}>
          <Container className='mb-2' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            ช่องทางชำระเงิน
          </Container>

          <Row>
            <Col xl={5} md={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img src={require('../../image/QR-Code.jpg')}
                style={{ width: "300px", height: "400px" }} />
            </Col>
            <Col xl={7} md={12}>
              <p className='ms-3'>ธนาคาร : </p>
              <p className='ms-3'>ชื่อบัญชี : </p>
              <p className='ms-3'>เลขที่บัญชี : </p>
              <p className='ms-3' style={{ fontWeight: "700" }}>จำนวนเงินที่ต้องชำระ : </p>

            </Col>
            <Col xl={12} style={{ marginTop: "2rem" }}>
              <Container fluid style={{
                backgroundColor: "#E3E3E3", height: "180px", padding: "1rem", width: "50%",
                borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }}>
                <input type='file' name='image' onChange={handleOnChange} />
                <p>แนบรูปหลักฐานการชำระเงิน (Slip) </p>

                <Button variant="primary" onClick={onSubmmit}>submit</Button>

              </Container>
            </Col>

            <Col xl={12} style={{ marginTop: "2rem", marginBottom: "3rem" }}>
              <Container fluid style={{
                backgroundColor: "#E3E3E3", height: "auto", padding: "1.5rem 1rem 1.5rem 1rem", width: "50%",
                borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }}>
                <Row>
                  <Col xl={6} md={6} sm={12}>
                    <p>วันที่โอน</p>
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

                  <Col xl={6} md={6} sm={12}>
                    <p>เวลาที่โอน</p>
                    <div style={{ marginTop: "-22px" }}>
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
                </Row>
              </Container>

            </Col>



          </Row>
        </Container>


      </Container>
    </div>
  )
}

export default Form_step_4