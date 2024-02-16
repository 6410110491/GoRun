import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div style={{ display: "inline-flex", width: "100%" }}>
            <Container style={{ backgroundColor: "#F3C710", height: "900px" }}>

            </Container>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={60} xs={12}>
                        <Card className="shadow" style={{ borderRadius: "15px" }}>
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">สมัครสมาชิกกับ Gorun!</h2>
                                    <p className=" mb-5">กรุณากรอกข้อมูลให้ถูกต้อง</p>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password again</Form.Label>
                                                <Form.Control type="password again" placeholder="Password again" />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}>
                                                    สมัครสมาชิก
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-4">
                                            <p className="mb-0  text-center">
                                                    มีบัญชีผู้ใช้งานแล้วหรือไม่?{" "}
                                                <Link href="{''}" style={{ color: "#F3C710", textDecoration: "none" }}>
                                                    เข้าสู่ระบบที่นี้
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
  )
}

export default Signup