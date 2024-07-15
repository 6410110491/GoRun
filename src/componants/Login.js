import React, { useEffect, useState } from 'react'
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import GoogleButton from 'react-google-button'

import { gapi } from 'gapi-script'

function Login() {
    const clientId = "576805828696-kd9um7qc9csss6mm0bqg8h2ug0cn0c0b.apps.googleusercontent.com"

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const initClient = () => {
            window.gapi.client.init({
                clientId: clientId,
                scope: "email",
                plugin_name: 'sample_login'

            })
        }
        gapi.load('client:auth2', initClient)
    }, [])

    const onSuccess = (res) => {
        setProfile(res.profileObj)
        console.log('success', res)
    }
    const onFailure = (res) => {
        console.log('failed', res)
    }
    const logout = () => {
        setProfile(null);
        console.log('logout success')
    }

    const changepage = (path) => {
        window.location.href = "/" + path
    }
    return (

        <div style={{ display: "flex", width: "100%" }}>
            <Container style={{ backgroundColor: "#F3C710", height: "100vh" }}>

            </Container>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={60} xs={12}>
                        <Container style={{
                            borderRadius: "15px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: '1rem',
                            backgroundColor: '#FFF'
                        }}>

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

                                        <div>
                                            {profile ?
                                                <div>
                                                    <img src={profile.imageUrl} alt='profile-pic' />
                                                    <p>{profile.name}</p>
                                                    <p>{profile.email}</p>
                                                    <GoogleLogout clientId={clientId} buttonText='Logout' onLogoutSuccess={logout} />
                                                </div> :
                                                <div style={{ marginTop: "1rem", }}>
                                                    <GoogleLogin
                                                        clientId={clientId}
                                                        buttonText='Sign in with Google'
                                                        onSuccess={onSuccess}
                                                        onFailure={onFailure}
                                                        cookiePolicy='single_host_origin'
                                                        isSignedIn={true}
                                                        render={renderProps => (
                                                            <GoogleButton onClick={renderProps.onClick}
                                                                type="light"
                                                                clientId={clientId}
                                                                disabled={renderProps.disabled}
                                                                style={{ width: "100%" }}>
                                                                Sign in with Google
                                                            </GoogleButton>
                                                        )}
                                                    />
                                                </div>
                                            }
                                        </div>

                                    </Form>
                                    <div className="mt-4">
                                        <p className="mb-0  text-center">
                                            ยังไม่มีบัญชีผู้ใช้งานหรือไม่?{" "}
                                            <Link onClick={() => changepage("signup")}
                                                style={{ color: "#F3C710", textDecoration: "none" }}>
                                                สมัครสมาชิกที่นี้
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div >

    )
}

export default Login