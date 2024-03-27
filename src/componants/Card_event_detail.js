import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

function Card_event_detail() {
    const imageSrc = require('../image/Thai.png')
    const changepage = (path) => {
        window.location.href = "/" + path
    }
    return (
        <div style={{ minHeight: "100vh" }}>
            {/* image */}
            <div style={{ padding: "0", width: "100%", height: "302px" }}>
                <img style={{
                    width: "100%", height: "302px",
                }} src={imageSrc} alt="Image" />
            </div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710"}} />

            {/* detail */}
            <Container style={{ marginTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p style={{ fontSize: "2rem" }}>Card Title</p>
                </div>

                <Row className='mb-5' style={{ justifyContent: "space-between", gap: "3rem" }} >
                    <Col xs={12} lg={7}>

                        {/* รายละเอียดงาน */}
                        <Container fluid style={{
                            backgroundColor: "#E3E3E3", padding: "0", height: "auto", paddingBottom: "2rem",
                            borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>
                            <Container className='mb-2' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                รายละเอียดงาน
                            </Container>

                            {/* ข้อมูลทั่วไป */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                ข้อมูลทั่วไป
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", height: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>RACEUP WORK</p>

                            </Container>



                            {/* วัตถุประสงค์ */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                วัตถุประสงค์
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", height: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>RACEUP WORK</p>

                            </Container>



                            {/* ความน่าสนใจของงาน */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                ความน่าสนใจของงาน
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", height: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>RACEUP WORK</p>

                            </Container>



                            {/* ระยะวิ่ง/ค่าสมัคร */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                ระยะวิ่ง/ค่าสมัคร
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", height: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>RACEUP WORK</p>

                            </Container>



                            {/* เส้นทางการแข่งขัน */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                เส้นทางการแข่งขัน
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", height: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>RACEUP WORK</p>

                            </Container>



                            {/* รางวัล */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                รางวัล
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", height: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>RACEUP WORK</p>

                            </Container>



                            {/* สิ่งที่จะได้รับ */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                สิ่งที่จะได้รับ
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", height: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>RACEUP WORK</p>

                            </Container>



                            {/* ข้อมูลเพิ่มเติม */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                ข้อมูลเพิ่มเติม
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", height: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>RACEUP WORK</p>

                            </Container>
                        </Container>




                        {/* แผนที่จัดงาน */}
                        <Container className='mt-4' fluid style={{
                            backgroundColor: "#E3E3E3", padding: "0", height: "200px",
                            borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>
                            <Container className='mb-2' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                แผนที่จัดงาน
                            </Container>


                        </Container>

                        {/* ที่พัก/ร้านอาหาร */}
                        <Container className='mt-4' fluid style={{
                            backgroundColor: "#E3E3E3", padding: "0", height: "200px",
                            borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>
                            <Container className='mb-2' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                ที่พัก/ร้านอาหาร
                            </Container>

                            <p className='ms-3'>ที่พัก/โรงแรม:</p>
                            <p className='ms-3'>ร้านอาหาร:</p>
                        </Container>


                    </Col>

                    <Col xs={12} lg={4} >

                        {/* ผู้จัดงาน */}
                        <Container fluid style={{
                            backgroundColor: "#E3E3E3", height: "100px", padding: "0",
                            borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>
                            <Container className='mb-2' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                ผู้จัดงาน
                            </Container>
                            <p className='ms-3'>RACEUP WORK</p>

                        </Container>


                        {/* ช่วงการรับสมัคร */}
                        <Container className='mt-5' fluid style={{
                            backgroundColor: "#E3E3E3", height: "140px", padding: "0",
                            borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>
                            <Container className='mb-2' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                ช่วงการรับสมัคร
                            </Container>

                            <p className='ms-3'>เปิดรับสมัคร : 24 มกราคม 2567 </p>
                            <p className='ms-3'>ปิดรับสมัคร : 30 เมษายน 2567</p>

                        </Container>


                        {/* การสมัคร */}
                        <Container className='mt-5' fluid style={{
                            backgroundColor: "#E3E3E3", height: "260px", padding: "0",
                            borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>
                            <Container className='mb-2' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                การสมัคร
                            </Container>

                            <p className='ms-3'>วันที่ : 26 พฤษภาคม 2567</p>
                            <p className='ms-3'>สถานที่ : จันทบุรี</p>
                            <p className='ms-3'>เวลา : เริ่มตั้งแต่ 4:30 น. เป็นต้นไป</p>
                            <p className='ms-3'>ราคา: 550 - 2500 บาท</p>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="danger" style={{ border: 'none', borderRadius: '10px', width: "40%" }}
                                onClick={() => changepage("event/form")}
                                    className='me-3 ms-3'
                                >สมัคร
                                </Button>
                            </div>

                        </Container>
                    </Col>

                    {/* Go Back Button */}
                    <div style={{display:'flex', justifyContent:"space-between", paddingLeft:"5rem", paddingRight:"5rem"}}>
                        <Button style={{ backgroundColor: "#47474A", border: 'none', borderRadius: '10px', width: '15%' }}
                        onClick={() => changepage("")}>
                            ย้อนกลับ
                        </Button>
                    </div>
                </Row>

            </Container>
        </div>

    )
}

export default Card_event_detail