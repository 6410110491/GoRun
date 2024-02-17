import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'

function Topbar() {
    const [langtitle, setLangtitle] = useState('TH');
    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
    const handleItemlang = (selectedTitle) => {
        setLangtitle(selectedTitle);
    };

    const changepage = (path) => {
        window.location.href = "/" + path
    }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark"
            style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}>
            <Container>
                <Navbar.Brand href="/">
                    <img src={require('../image/logo2.jpg')}
                        style={{ width: "50px", height: "50px", borderRadius: "100%", border: "3px solid #FFF" }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {isDesktop ?

                    // Desktop Screen
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/" className='text-white'>
                                หน้าหลัก
                            </Nav.Link>
                            <Nav.Link href="/event" className='text-white'>
                                งานทั้งหมด
                            </Nav.Link>
                            <Nav.Link href="/calendar" className='text-white'>
                                ปฏิทิน
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                                className='me-3 ms-3'
                                onClick={() => changepage("login")}
                            >เข้าสู่ระบบ/สมัครสมาชิก
                            </Button>{' '}
                            <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                                className='me-3'>
                                ผู้จัดงาน
                            </Button>
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <img src={langtitle === 'TH' ? require('../image/Thai.png') : require('../image/US-flag.jpg')}
                                    style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "5px" }} />
                                <NavDropdown title={langtitle} id="dropdown-menu-align-right" className='text-white'>
                                    <NavDropdown.Item onClick={() => handleItemlang('TH')}>
                                        TH
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => handleItemlang('EN')}>
                                        EN
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Nav>
                    </Navbar.Collapse> :

                    // Smartphone Screen
                    <Navbar.Collapse className='mt-3'>
                        <div style={{ display: "flex" }}>
                            <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: '50%' }}
                                className='me-3 ms-3'
                                onClick={() => changepage("login")}
                            >เข้าสู่ระบบ/สมัครสมาชิก
                            </Button>{' '}
                            <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: '50%' }}
                                className='me-3'>
                                ผู้จัดงาน
                            </Button>
                        </div>

                        <Nav className='mt-3 ms-3'>
                            <Nav.Link href="/" className='text-white'>
                                หน้าหลัก
                            </Nav.Link>
                            <Nav.Link href="/event" className='text-white'>
                                งานทั้งหมด
                            </Nav.Link>
                            <Nav.Link href="/calendar" className='text-white'>
                                ปฏิทิน
                            </Nav.Link>
                        </Nav>

                        <Nav className='mt-3 ms-3'>
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <NavDropdown title={langtitle} id="dropdown-menu-align-right" className='text-white' align={'end'}>
                                    <NavDropdown.Item onClick={() => handleItemlang('TH')}>
                                        <img src={require('../image/Thai.png')}
                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "5px" }} />
                                        TH
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => handleItemlang('EN')}>
                                        <img src={require('../image/US-flag.jpg')}
                                            style={{ width: "30px", height: "30px", borderRadius: "100%", marginRight: "5px" }} />
                                        EN
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Nav>
                    </Navbar.Collapse>}
            </Container>
        </Navbar>
    )
}

export default Topbar