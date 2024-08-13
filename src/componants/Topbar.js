import '../App.css';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, Col, Container, Dropdown, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import axios from 'axios';
import { FaHome, FaCalendarAlt, FaBullhorn, FaRegCalendar, FaUser, FaHistory, FaUsersCog, FaSignOutAlt } from 'react-icons/fa';
import { MdWorkHistory } from "react-icons/md";


function Topbar() {
    const [langtitle, setLangtitle] = useState('TH');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Check if the user is authenticated
                const authResponse = await fetch('http://localhost:4000/api/auth/status', {
                    method: 'GET',
                    credentials: 'include' // Ensure cookies/session data are sent
                });

                if (authResponse.ok) {
                    const authStatus = await authResponse.json();

                    if (authStatus.isAuthenticated) {
                        const userInfoResponse = await fetch('http://localhost:4000/api/userinfo', {
                            method: 'GET',
                            credentials: 'include'
                        });

                        if (userInfoResponse.ok) {
                            const userInfo = await userInfoResponse.json();
                            setIsLoggedIn(true);
                            setUsername(userInfo.username); // Assuming userInfo has username
                            setRole(userInfo.role)
                        } else {
                            console.error('Failed to fetch user info');
                        }
                    } else {
                        setIsLoggedIn(false);
                        setUsername('');
                    }
                } else {
                    console.error('Failed to check auth status');
                }
            } catch (error) {
                console.error('Error checking auth:', error);
            }
        };

        checkAuthStatus();
    }, []);

    const handleItemlang = (selectedTitle) => {
        setLangtitle(selectedTitle);
    };

    const changepage = (path) => {
        window.location.href = '/' + path;
    };

    const checkRoleOrganize = () => {
        if (role === "organize") {
            changepage("dataorganizer");
        } else {
            changepage("organizer");
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/api/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            setRole('')
            setUsername('');
            changepage("");
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark"
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
            <Container>
                <Navbar.Brand href="/">
                    <img src={require('../image/logo2.jpg')} alt='logo'
                        style={{ width: "50px", height: "50px", borderRadius: "100%", border: "3px solid #FFF" }} />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    {isDesktop ? (
                        // Desktop Screen
                        <Nav className="align-items-center">
                            <Nav.Link href="/" className='text-white mx-2'>หน้าหลัก</Nav.Link>
                            <Nav.Link href="/event" className='text-white mx-2'>งานทั้งหมด</Nav.Link>
                            <Nav.Link href="/news" className='text-white mx-2'>ประชาสัมพันธ์</Nav.Link>
                            <Nav.Link href="/calendar" className='text-white mx-2'>ปฏิทิน</Nav.Link>
                            {isLoggedIn ? (
                                <>
                                    <Dropdown style={{ margin: "8px 8px 8px 16px" }}>
                                        <Dropdown.Toggle id="dropdown-basic" style={{
                                            backgroundColor: "#F3C710",
                                            borderRadius: '10px'
                                        }}>
                                            {username || 'User'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu data-bs-theme="light">
                                            <Dropdown.Item style={{ marginBottom: "0.5rem" }}
                                                onClick={() => changepage("personal")}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FaUser style={{ color: "#000", marginRight: '8px' }} />
                                                    <p style={{ color: "#000", margin: 0 }}>ข้อมูลส่วนตัว</p>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item style={{ marginBottom: "0.5rem" }}
                                                onClick={() => changepage("apphistory")}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FaHistory style={{ color: "#000", marginRight: '8px' }} />
                                                    <p style={{ color: "#000", margin: 0 }}>ประวัติการสมัคร</p>
                                                </div>
                                            </Dropdown.Item>
                                            {role === "organize" ? (
                                                <Dropdown.Item style={{ marginBottom: "0.5rem" }}
                                                    onClick={() => changepage("eventhistory")}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <MdWorkHistory style={{ color: "#000", marginRight: '8px' }} />
                                                        <p style={{ color: "#000", margin: 0 }}>ประวัติการจัดงาน</p>
                                                    </div>
                                                </Dropdown.Item>
                                            ) : ''}

                                            <Dropdown.Item onClick={handleLogout} style={{ marginBottom: "0.5rem" }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FaSignOutAlt style={{ color: "#000", marginRight: '8px' }} />
                                                    <p style={{ color: "#000", margin: 0 }}>ออกจากระบบ</p>
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button
                                        onClick={checkRoleOrganize}
                                        style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                                        className='me-3'>
                                        ผู้จัดงาน
                                    </Button>
                                    <div style={{ display: 'flex', alignItems: "center" }}>
                                        <img src={langtitle === 'TH' ? require('../image/Thai.png') : require('../image/US-flag.jpg')}
                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "5px" }}
                                            alt='lang-pic' />
                                        <NavDropdown title={langtitle} id="dropdown-menu-align-right" className="custom-dropdown-menu">
                                            <NavDropdown.Item onClick={() => handleItemlang('TH')}>TH</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={() => handleItemlang('EN')}>EN</NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Button
                                        style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                                        className='me-2'
                                        onClick={() => changepage("login")}
                                    >
                                        เข้าสู่ระบบ/สมัครสมาชิก
                                    </Button>
                                    <Button
                                        onClick={checkRoleOrganize}
                                        style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                                        className='me-3'>
                                        ผู้จัดงาน
                                    </Button>
                                    <div style={{ display: 'flex', alignItems: "center" }}>
                                        <img src={langtitle === 'TH' ? require('../image/Thai.png') : require('../image/US-flag.jpg')}
                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "5px" }}
                                            alt='lang-pic' />
                                        <NavDropdown title={langtitle} id="dropdown-menu-align-right" className="custom-dropdown-menu">
                                            <NavDropdown.Item onClick={() => handleItemlang('TH')}>TH</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={() => handleItemlang('EN')}>EN</NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                </>
                            )}
                        </Nav>
                    ) : (
                        // Smartphone Screen
                        <Nav className="flex-column align-items-start mb-4">
                            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", margin: "8px 0 8px 0" }}>
                                {isLoggedIn ? (
                                    <>
                                        <Row style={{ width: "100%" }}>
                                            <Col xs={6} sm={6}>
                                                <p style={{ color: "#FFF", fontSize: "1.25rem" }}>สวัสดีคุณ {username}</p>
                                            </Col>
                                            <Col xs={6} sm={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <Row>
                                                    <Col xs={12} sm={6} >
                                                        <div className="d-flex align-items-center">
                                                            <img src={require('../image/Thai.png')} alt='thai-flag-pic'
                                                                style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "10px" }} />
                                                            <Button
                                                                variant="link"
                                                                style={{ color: "#FFF", textDecoration: "none", padding: 0 }}
                                                                onClick={() => handleItemlang('TH')}
                                                            >
                                                                TH
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} sm={6}>
                                                        <div className="d-flex align-items-center">
                                                            <img src={require('../image/US-flag.jpg')} alt='en-flag-pic'
                                                                style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "10px" }} />
                                                            <Button
                                                                variant="link"
                                                                style={{ color: "#FFF", textDecoration: "none", padding: 0 }}
                                                                onClick={() => handleItemlang('EN')}
                                                            >
                                                                EN
                                                            </Button>
                                                        </div></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <Row style={{ width: "100%" }}>
                                        <Col xs={6} sm={6}>
                                            <Button
                                                style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: 'fit-content' }}
                                                onClick={() => changepage("login")}
                                            >
                                                เข้าสู่ระบบ/สมัครสมาชิก
                                            </Button>
                                        </Col>
                                        <Col xs={6} sm={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Row>
                                                <Col xs={6} sm={6} >
                                                    <div className="d-flex align-items-center">
                                                        <img src={require('../image/Thai.png')} alt='thai-flag-pic'
                                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "10px" }} />
                                                        <Button
                                                            variant="link"
                                                            style={{ color: "#FFF", textDecoration: "none", padding: 0 }}
                                                            onClick={() => handleItemlang('TH')}
                                                        >
                                                            TH
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <Col xs={6} sm={6}>
                                                    <div className="d-flex align-items-center">
                                                        <img src={require('../image/US-flag.jpg')} alt='en-flag-pic'
                                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "10px" }} />
                                                        <Button
                                                            variant="link"
                                                            style={{ color: "#FFF", textDecoration: "none", padding: 0 }}
                                                            onClick={() => handleItemlang('EN')}
                                                        >
                                                            EN
                                                        </Button>
                                                    </div></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )}
                            </div>

                            <Nav.Link href="/" className='text-white mb-2'>
                                <FaHome style={{ marginRight: '8px' }} />
                                หน้าหลัก
                            </Nav.Link>
                            <Nav.Link href="/event" className='text-white mb-2'>
                                <FaCalendarAlt style={{ marginRight: '8px' }} />
                                งานทั้งหมด
                            </Nav.Link>
                            <Nav.Link href="/news" className='text-white mb-2'>
                                <FaBullhorn style={{ marginRight: '8px' }} />
                                ประชาสัมพันธ์
                            </Nav.Link>
                            <Nav.Link href="/calendar" className='text-white mb-2'>
                                <FaRegCalendar style={{ marginRight: '8px' }} />
                                ปฏิทิน
                            </Nav.Link>
                            {isLoggedIn ? (
                                <>
                                    <Nav.Link className='text-white mb-2'
                                        onClick={() => changepage("personal")}>
                                        <FaUser style={{ marginRight: '8px' }} />
                                        ข้อมูลส่วนตัว
                                    </Nav.Link><Nav.Link className='text-white mb-2'
                                        onClick={() => changepage("apphistory")}>
                                        <FaHistory style={{ marginRight: '8px' }} />
                                        ประวัติการสมัคร
                                    </Nav.Link>
                                    {role === "organize" ? (
                                        <Nav.Link className='text-white mb-2'
                                            onClick={() => changepage("eventhistory")}>
                                            <MdWorkHistory style={{ marginRight: '8px' }} />
                                            ประวัติการจัดงาน
                                        </Nav.Link>
                                    ) : ''}
                                </>) : ("")}

                            <Nav.Link href="/#" className='text-white mb-2'
                                onClick={checkRoleOrganize}>
                                <FaUsersCog style={{ marginRight: '8px' }} />
                                ผู้จัดงาน
                            </Nav.Link>

                            {isLoggedIn ? (
                                <Row>
                                    <Col style={{ width: "100%" }}>
                                        <Button
                                            style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: '100%', }}
                                            onClick={handleLogout}>
                                            <FaSignOutAlt style={{ color: "#fff", marginRight: '8px' }} />
                                            ออกจากระบบ
                                        </Button>
                                    </Col>
                                </Row>
                            ) : (
                                ""
                            )}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Topbar;
