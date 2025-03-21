import '../App.css';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, Col, Container, Dropdown, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import axios from 'axios';
import { FaHome, FaCalendarAlt, FaBullhorn, FaRegCalendar, FaUser, FaHistory, FaUsersCog, FaSignOutAlt } from 'react-icons/fa';
import { MdWorkHistory } from "react-icons/md";


import i18n from '../i18n';
import { useTranslation } from 'react-i18next';


function Topbar() {
    const [langtitle, setLangtitle] = useState('th');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const [isVisible, setIsVisible] = useState(true); // ควบคุมการแสดงผลของ Topbar
    const [lastScrollY, setLastScrollY] = useState(0); // เก็บตำแหน่งการเลื่อนหน้าจอก่อนหน้า

    const [lang, setLang] = useState(window.localStorage.getItem('lang') || 'th');

    const { t, i18n } = useTranslation()

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Check if the user is authenticated
                const authResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/status`, {
                    method: 'GET',
                    credentials: 'include' // Ensure cookies/session data are sent
                });

                if (authResponse.ok) {
                    const authStatus = await authResponse.json();

                    if (authStatus.isAuthenticated) {
                        const userInfoResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/userinfo`, {
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

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
            setLangtitle(lang);
        }
    }, [lang]); // เมื่อค่า 'lang' เปลี่ยนแปลง, จะเปลี่ยนภาษา

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // ซ่อน Topbar เมื่อเลื่อนลง และแสดงเมื่อเลื่อนขึ้น
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);


    const changeLanguage = (lang) => {
        window.localStorage.setItem('lang', lang)
        setLangtitle(lang);
        setLang(lang);
    };

    const changepage = (path) => {
        window.location.href = '/' + path;
    };

    const checkRoleOrganize = async () => {
        try {
            await checkToken();

            if (role === "organize") {
                changepage("dataorganizer"); // เปลี่ยนไปที่หน้า dataorganizer
            } else if (role) {
                changepage("organizer"); // ถ้ามีบทบาทอื่นๆ ที่ไม่ใช่ organize ให้ไปที่หน้า organizer
            } else {
                console.error("Role not found or user is not authenticated.");
            }
        } catch (error) {
            console.error("Error checking token or role:", error);
        }
    };


    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            setRole('')
            setUsername('');
            changepage("");
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const checkToken = () => {
        // ดึงค่า cookies ทั้งหมด
        const cookies = document.cookie;

        // ตรวจสอบว่ามี token หรือไม่
        const tokenExists = cookies.split('; ').some(cookie => cookie.startsWith('token='));

        // ถ้าไม่มี token ให้เปลี่ยนหน้าไปที่ login
        if (!tokenExists) {
            changepage("login");
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" className={`topbar ${isVisible ? "show" : "hide"}`} bg="dark" data-bs-theme="dark"
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", position: "sticky", top: "0", "zIndex": "9999" }}>
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
                            <Nav.Link href="/" className='text-white mx-2'>{t('หน้าหลัก')}</Nav.Link>
                            <Nav.Link href="/event" className='text-white mx-2'>{t('งานทั้งหมด')}</Nav.Link>
                            <Nav.Link href="/news" className='text-white mx-2'>{t('ประชาสัมพันธ์')}</Nav.Link>
                            <Nav.Link href="/calendar" className='text-white mx-2'>{t('ปฏิทิน')}</Nav.Link>
                            {isLoggedIn ? (
                                <>
                                    <Dropdown style={{ margin: "8px 8px 8px 16px" }}>
                                        <Dropdown.Toggle id="dropdown-basic" style={{
                                            backgroundColor: "#F3C710",
                                            borderRadius: '10px',
                                            border: "none"
                                        }}>
                                            {username || 'User'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu data-bs-theme="light">
                                            <Dropdown.Item style={{ marginBottom: "0.5rem" }}
                                                onClick={() => changepage("personal")}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FaUser style={{ color: "#000", marginRight: '8px' }} />
                                                    <p style={{ color: "#000", margin: 0 }}>{t('ข้อมูลส่วนตัว')}</p>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item style={{ marginBottom: "0.5rem" }}
                                                onClick={() => changepage("apphistory")}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FaHistory style={{ color: "#000", marginRight: '8px' }} />
                                                    <p style={{ color: "#000", margin: 0 }}>{t('ประวัติการสมัคร')}</p>
                                                </div>
                                            </Dropdown.Item>
                                            {role === "organize" ? (
                                                <Dropdown.Item style={{ marginBottom: "0.5rem" }}
                                                    onClick={() => changepage("eventhistory")}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <MdWorkHistory style={{ color: "#000", marginRight: '8px' }} />
                                                        <p style={{ color: "#000", margin: 0 }}>{t('ประวัติการจัดงาน')}</p>
                                                    </div>
                                                </Dropdown.Item>
                                            ) : ''}

                                            {role === "admin" ? (
                                                <Dropdown.Item style={{ marginBottom: "0.5rem" }}
                                                    onClick={() => changepage("admin")}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <MdWorkHistory style={{ color: "#000", marginRight: '8px' }} />
                                                        <p style={{ color: "#000", margin: 0 }}>{t('แอดมิน')}</p>
                                                    </div>
                                                </Dropdown.Item>
                                            ) : ''}

                                            <Dropdown.Item onClick={handleLogout} style={{ marginBottom: "0.5rem" }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FaSignOutAlt style={{ color: "#000", marginRight: '8px' }} />
                                                    <p style={{ color: "#000", margin: 0 }}>{t('ออกจากระบบ')}</p>
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button
                                        onClick={checkRoleOrganize}
                                        style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                                        className='me-3'>
                                        {t('ผู้จัดงาน')}
                                    </Button>
                                    <div style={{ display: 'flex', alignItems: "center" }}>
                                        <img src={langtitle === 'th' ? require('../image/Thai.png') : require('../image/US-flag.jpg')}
                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "5px" }}
                                            alt='lang-pic' />
                                        <NavDropdown title={langtitle} id="dropdown-menu-align-right" className="custom-dropdown-menu">
                                            <NavDropdown.Item onClick={() => changeLanguage('th')}>th</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={() => changeLanguage('en')}>en</NavDropdown.Item>
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
                                        {t('เข้าสู่ระบบ/สมัครสมาชิก')}
                                    </Button>
                                    <Button
                                        onClick={checkRoleOrganize}
                                        style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                                        className='me-3'>
                                        {t('ผู้จัดงาน')}
                                    </Button>
                                    <div style={{ display: 'flex', alignItems: "center" }}>
                                        <img src={langtitle === 'th' ? require('../image/Thai.png') : require('../image/US-flag.jpg')}
                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "5px" }}
                                            alt='lang-pic' />
                                        <NavDropdown title={langtitle} id="dropdown-menu-align-right" className="custom-dropdown-menu">
                                            <NavDropdown.Item onClick={() => changeLanguage('th')}>th</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={() => changeLanguage('en')}>en</NavDropdown.Item>
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
                                                        <div className="d-flex align-items-center" onClick={() => changeLanguage('th')}>
                                                            <img src={require('../image/Thai.png')} alt='thai-flag-pic'
                                                                style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "10px" }} />
                                                            <Button
                                                                variant="link"
                                                                style={{ color: "#FFF", textDecoration: "none", padding: 0 }}

                                                            >
                                                                th
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} sm={6}>
                                                        <div className="d-flex align-items-center" onClick={() => changeLanguage('en')}>
                                                            <img src={require('../image/US-flag.jpg')} alt='en-flag-pic'
                                                                style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "10px" }} />
                                                            <Button
                                                                variant="link"
                                                                style={{ color: "#FFF", textDecoration: "none", padding: 0 }}

                                                            >
                                                                en
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
                                                {t('เข้าสู่ระบบ/สมัครสมาชิก')}
                                            </Button>
                                        </Col>
                                        <Col xs={6} sm={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Row>
                                                <Col xs={6} sm={6} >
                                                    <div className="d-flex align-items-center" onClick={() => changeLanguage('th')}>
                                                        <img src={require('../image/Thai.png')} alt='thai-flag-pic'
                                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "10px" }} />
                                                        <Button
                                                            variant="link"
                                                            style={{ color: "#FFF", textDecoration: "none", padding: 0 }}

                                                        >
                                                            th
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <Col xs={6} sm={6}>
                                                    <div className="d-flex align-items-center" onClick={() => changeLanguage('en')}>
                                                        <img src={require('../image/US-flag.jpg')} alt='en-flag-pic'
                                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "10px" }} />
                                                        <Button
                                                            variant="link"
                                                            style={{ color: "#FFF", textDecoration: "none", padding: 0 }}
                                                        >
                                                            en
                                                        </Button>
                                                    </div></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )}
                            </div>

                            <div style={{ width: "100%" }}>
                                <Nav.Link href="/" className='text-white mb-2'>
                                    <FaHome style={{ marginRight: '8px' }} />
                                    {t('หน้าหลัก')}
                                </Nav.Link>
                            </div>
                            <div style={{ width: "100%" }}>
                                <Nav.Link href="/event" className='text-white mb-2'>
                                    <FaCalendarAlt style={{ marginRight: '8px' }} />
                                    {t('งานทั้งหมด')}
                                </Nav.Link>
                            </div>
                            <div style={{ width: "100%" }}>
                                <Nav.Link href="/news" className='text-white mb-2'>
                                    <FaBullhorn style={{ marginRight: '8px' }} />
                                    {t('ประชาสัมพันธ์')}
                                </Nav.Link>
                            </div>
                            <div style={{ width: "100%" }}>
                                <Nav.Link href="/calendar" className='text-white mb-2'>
                                    <FaRegCalendar style={{ marginRight: '8px' }} />
                                    {t('ปฏิทิน')}
                                </Nav.Link>
                            </div>
                            {isLoggedIn ? (
                                <>
                                    <div style={{ width: "100%" }}>
                                        <Nav.Link className='text-white mb-2'
                                            onClick={() => changepage("personal")}>
                                            <FaUser style={{ marginRight: '8px' }} />
                                            {t('ข้อมูลส่วนตัว')}
                                        </Nav.Link>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                        <Nav.Link className='text-white mb-2'
                                            onClick={() => changepage("apphistory")}>
                                            <FaHistory style={{ marginRight: '8px' }} />
                                            {t('ประวัติการสมัคร')}
                                        </Nav.Link>
                                    </div>
                                    {role === "organize" ? (
                                        <div style={{ width: "100%" }}>
                                            <Nav.Link className='text-white mb-2'
                                                onClick={() => changepage("eventhistory")}>
                                                <MdWorkHistory style={{ marginRight: '8px' }} />
                                                {t('ประวัติการจัดงาน')}
                                            </Nav.Link>
                                        </div>
                                    ) : ''}
                                    {role === "admin" ? (
                                        <div style={{ width: "100%" }}>
                                            <Nav.Link className='text-white mb-2'
                                                onClick={() => changepage("admin")}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <MdWorkHistory style={{ marginRight: '8px' }} />
                                                    <p style={{ margin: 0 }}>{t('แอดมิน')}</p>
                                                </div>
                                            </Nav.Link >
                                        </div>
                                    ) : ''}
                                </>) : ("")}

                            <div style={{ width: "100%" }}>
                                <Nav.Link href="/#" className='text-white mb-2'
                                    onClick={checkRoleOrganize}>
                                    <FaUsersCog style={{ marginRight: '8px' }} />
                                    {t('ผู้จัดงาน')}
                                </Nav.Link>
                            </div>

                            {isLoggedIn ? (
                                <Row>
                                    <Col style={{ width: "100%" }}>
                                        <Button
                                            style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: '100%', }}
                                            onClick={handleLogout}>
                                            <FaSignOutAlt style={{ color: "#fff", marginRight: '8px' }} />
                                            {t('ออกจากระบบ')}
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
