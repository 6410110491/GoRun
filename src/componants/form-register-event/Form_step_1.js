import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function Form_step_1() {
    const [dueDate, setDueDate] = useState(dayjs());
    const gender = ["ชาย", "หญิง", "อื่นๆ"];
    const blood_group = ["A", "B", "AB", "O"];

    return (
        <div>
            <Container className='mt-3' fluid style={{
                backgroundColor: "#E3E3E3", minHeight: "260px", padding: "1rem 2rem 1rem 2rem",
                borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}>
                <Row>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", alignItems: "center" }}>
                        <img src={require('../../image/logo2.jpg')} alt='logo.jpg'
                            style={{ width: "100px", height: "100px", borderRadius: "100%" }} />
                        <div className='ms-3'>
                            <p>รูปภาพประจำตัว</p>
                        </div>
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
                            <p>ชื่อ</p>
                            <Form.Control type="text" placeholder="กรอกชื่อ" style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                        </Form.Group>
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
                            <p>สกุล</p>
                            <Form.Control type="text" placeholder="กรอกสกุล" style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                        </Form.Group>
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
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
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col xl={4} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
                            <p style={{ margin: "0" }}>วันเดือนปีเกิด</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} >
                                    <DatePicker
                                        slotProps={{ textField: { size: 'small' } }}
                                        value={dueDate}
                                        sx={{
                                            width: '95%',
                                            backgroundColor: "#FFF",
                                            borderRadius: "10px",
                                            padding: "0",
                                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                            "& MuiInputBase-root": { border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }
                                        }}
                                        onChange={(dueDate) => setDueDate(dueDate)}
                                        format="DD-MM-YYYY"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Form.Group>
                    </Col>
                    <Col xl={4} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
                            <p>เลขประจำตัวประชาชน</p>
                            <Form.Control type="text" placeholder="กรอกเลขประจำตัวประชาชน" style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                        </Form.Group>
                    </Col>
                    <Col xl={4} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
                            <p>อีเมล</p>
                            <Form.Control type="text" placeholder="กรอกอีเมล" style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mt-3 mb-5'>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
                            <p>เบอร์โทรศัพท์</p>
                            <Form.Control type="text" placeholder="กรอกเบอร์โทรศัพท์" style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                        </Form.Group>
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
                            <p>สัญชาติ</p>
                            <Form.Control type="text" placeholder="กรอกสัญชาติ" style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                        </Form.Group>
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
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
                        </Form.Group>
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Form.Group>
                            <p>โรคประจำตัว</p>
                            <Form.Control type="text" placeholder="กรอกโรคประจำตัว" style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Form_step_1;
