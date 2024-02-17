import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
    return (
        <div>
            <Container fluid style={{ backgroundColor: "#040404", height: "200px", }}>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <img src={require('../image/logo2.jpg')}
                        style={{ width: "50px", height: "50px", borderRadius: "100%", border: "3px solid #FFF", marginTop: "1rem" }} />
                </div>
                <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", marginTop: "10px" }}>GoRun Webapplication</p>
                    <Container style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Row style={{ display: 'flex', justifyContent: "center", textAlign: "center" }}>
                            <Col>
                                <div>
                                    <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", }}>
                                        สาขาวิชาวิศวกรรมคอมพิวเตอร์, คณะวิศวกรรมศาสตร์, มหาวิทยาลัยสงขลานครินทร์
                                        15 ถ.กาญจนวณิชย์ อ.หาดใหญ่ จ.สงขลา 90110 ประเทศไทย
                                    </p>
                                    <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", }}>
                                        Department of Computer Engineering, Faculty of Engineering, Prince of Songkla University
                                        15 Karnjanavanich Rd., HatYai, Songkhla, Thailand 90110
                                    </p>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", }}>
                                        จัดทำโดย
                                    </p>
                                    <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", }}>
                                        6410110307@psu.ac.th
                                    </p>
                                    <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", }}>
                                        6410110491@psu.ac.th
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </div>


            </Container>

            <Container fluid style={{ backgroundColor: "#F3C710", height: "25px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold" }}>2024 Gorun All rights reserved</div>
            </Container>
        </div>
    )
}

export default Footer