import { React, useEffect } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'

function Login() {
    const clientId = "512294148512-n7g79dievcb4873mgnt41mbd7gqc8cdv.apps.googleusercontent.com"

    const useGoogle = () => {

        useEffect(() => {
            
            const initClient = () => {
                window.gapi.client.init({
                    clientId: clientId,
                    scope: ''
                });
                console.log("Google loaded");
            };
            
            const handleClientLoad = () => window.gapi.load('client:auth2', initClient);
            const script = document.createElement('script');

            script.src = "https://apis.google.com/js/api.js";
            script.async = true;
            script.defer = true;
            script.onload = handleClientLoad;

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };

        }, []);
    };

    const onSuccess = (res) => {
        console.log('success', res)
    }

    const onFailure = (res) => {
        console.log('failed', res)
    }

    const changepage = (path) => {
        window.location.href = "/" + path
    }
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
                                    <h2 className="fw-bold mb-2 text-uppercase ">ยินดีต้อนรับเข้าสู่ Gorun!</h2>
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
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Form.Check // prettier-ignore
                                                    type="Checkbox"
                                                    id='default-Checkbox'
                                                    label='จดจำรหัสผ่าน'
                                                />
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"
                                                >
                                                    <Link href="#!" style={{ color: "#F3C710", textDecoration: "none" }}>
                                                        ลืมรหัสผ่าน
                                                    </Link>
                                                </Form.Group>
                                            </div>
                                            <div className="d-grid">
                                                <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}>
                                                    Login
                                                </Button>
                                            </div>
                                            <GoogleLogin
                                                clientId={clientId}
                                                buttonText="Sign in with Google"
                                                onSuccess={onSuccess}
                                                onFailure={onFailure}
                                                cookiePolicy={'single_host_origin'}
                                                isSignedIn={true}
                                                onClick={useGoogle}
                                            />
                                        </Form>
                                        <div className="mt-4">
                                            <p className="mb-0  text-center">
                                                ยังไม่มีบัญชีผู้ใช้งานหรือไม่?{" "}
                                                <Link onClick={() => changepage("signup")} style={{ color: "#F3C710", textDecoration: "none" }}>
                                                    สมัครสมาชิกที่นี้
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

export default Login