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
            <>
                <Row style={{ width: "100%" }}>
                    <Col sm={6} md={4}>
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
                    </Col>
                    <Col sm={6} md={8}>
                        <Row style={{ width: "100%" }}>
                            <Col xs={12} sm={6}>
                                <Button
                                    style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: '100%' }}
                                    onClick={() => changepage("login")}
                                >
                                    เข้าสู่ระบบ/สมัครสมาชิก
                                </Button>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Row>
                                    <Col xs={6} sm={6}>
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
                    </Col>
                </Row>
            </>

        )}
    </div>

    {isLoggedIn ? (
        <>
            <Nav.Link href="/#" className='text-white mb-2'>
                <FaUser style={{ marginRight: '8px' }} />
                ข้อมูลส่วนตัว
            </Nav.Link><Nav.Link href="/#" className='text-white mb-2'>
                <FaHistory style={{ marginRight: '8px' }} />
                ประวัติการสมัคร
            </Nav.Link><Nav.Link href="/#" className='text-white mb-3'>
                <FaUsersCog style={{ marginRight: '8px' }} />
                ผู้จัดงาน
            </Nav.Link>
        </>) : ("")}

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