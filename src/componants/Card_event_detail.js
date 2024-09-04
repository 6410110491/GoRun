import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top'

function Card_event_detail() {
    const { id } = useParams();
    const [eventDetail, setEventDetail] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    const imageSrc = require('../image/event-pic-3.jpg')

    const changepage = (path) => {
        window.location.href = "/" + path
    }

    const formatDate = (date) => {
        if (!date) return '';

        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
        const day = String(d.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const formatTime = (date) => {
        if (!date) return '';

        const d = new Date(date);
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };


    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/events/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 401) {
                    changepage('login');
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setEventDetail(data);
                } else {
                    throw new Error('Failed to fetch event data');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchEventDetail();
    }, [id]);

    useEffect(() => {
        if (eventDetail) {
            const fetchUserInfo = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/api/userinfo/${eventDetail.owner[0].owner_id}`, {
                        method: 'GET',
                    });

                    if (response.status === 401) {
                        changepage('login');
                        return;
                    }

                    if (response.ok) {
                        const data = await response.json();
                        setUserInfo(data);
                    } else {
                        throw new Error('Failed to fetch user info');
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            fetchUserInfo();
        }
    }, [eventDetail]);

    return (
        <div style={{ minHeight: "100vh" }}>
            {/* image */}
            <div style={{ padding: "0", width: "100%", height: "302px" }}>
                <img style={{
                    width: "100%", height: "302px",
                }} src={imageSrc} alt="Image" />
            </div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            {/* detail */}
            <Container style={{ marginTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p style={{ fontSize: "2rem" }}>
                        {eventDetail ? eventDetail.eventName : ""}
                    </p>
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
                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>{eventDetail ? eventDetail.generalInfo : ""}</p>

                            </Container>



                            {/* วัตถุประสงค์ */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                วัตถุประสงค์
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>{eventDetail ? eventDetail.objectives : ""}</p>

                            </Container>



                            {/* ความน่าสนใจของงาน */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                ความน่าสนใจของงาน
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>{eventDetail ? eventDetail.eventHighlights : ""}</p>

                            </Container>



                            {/* ระยะวิ่ง/ค่าสมัคร */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                ระยะวิ่ง/ค่าสมัคร
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>ระยะวิ่ง: {eventDetail ? eventDetail.distance : ""}</p>
                                <p className='ms-3'>ค่าสมัคร: {eventDetail ? eventDetail.registrationFee : ""}</p>

                            </Container>



                            {/* เส้นทางการแข่งขัน */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                เส้นทางการแข่งขัน
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>{eventDetail ? eventDetail.route : ""}</p>

                            </Container>



                            {/* รางวัล */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                รางวัล
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>{eventDetail ? eventDetail.prize : ""}</p>

                            </Container>



                            {/* สิ่งที่จะได้รับ */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                สิ่งที่จะได้รับ
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>{eventDetail ? eventDetail.whatToReceive : ""}</p>

                            </Container>



                            {/* ข้อมูลเพิ่มเติม */}
                            <Container className='mt-4 ms-5' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                marginBottom: "-20px", position: "relative"
                            }}>
                                ข้อมูลเพิ่มเติม
                            </Container>
                            <Container className='ms-3' fluid style={{
                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                            }}>
                                <p className='ms-3'>ข้อมูลเพิ่มเติม RACEUP WORK</p>

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
                            backgroundColor: "#E3E3E3", minHeight: "100px", padding: "0 0 16px 0",
                            borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>
                            <Container className='mb-2' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                ผู้จัดงาน
                            </Container>
                            <p className='ms-3'>ชื่อผู้จัดงาน: {userInfo ? userInfo.username : ""}</p>
                            <p className='ms-3'>เบอร์โทรศัพท์: {userInfo ? userInfo.personalInfo.phoneNumber : ""}</p>
                            <p className='ms-3'>อีเมล: {userInfo ? userInfo.email : ""}</p>

                        </Container>


                        {/* ช่วงการรับสมัคร */}
                        <Container className='mt-5' fluid style={{
                            backgroundColor: "#E3E3E3", minHeight: "140px", padding: "0 0 16px 0",
                            borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>
                            <Container className='mb-2' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                ช่วงการรับสมัคร
                            </Container>

                            <p className='ms-3'>เปิดรับสมัคร : {formatDate(eventDetail ? eventDetail.registrationOpenDate : "")} </p>
                            <p className='ms-3'>ปิดรับสมัคร : {formatDate(eventDetail ? eventDetail.registrationCloseDate : "")}</p>

                        </Container>


                        {/* การสมัคร */}
                        <Container className='mt-5' fluid style={{
                            backgroundColor: "#E3E3E3", minHeight: "260px", padding: "0 0 16px 0",
                            borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}>
                            <Container className='mb-2' fluid style={{
                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                display: "flex", justifyContent: "center", alignItems: "center"
                            }}>
                                การสมัคร
                            </Container>

                            <p className='ms-3'>วันที่ :  {formatDate(eventDetail ? eventDetail.eventDate : "")}</p>
                            <p className='ms-3'>สถานที่ :  {eventDetail ? eventDetail.location : ""}</p>
                            <p className='ms-3'>เวลา : เริ่มตั้งแต่  {formatTime(eventDetail ? eventDetail.eventTime : "")} น. เป็นต้นไป</p>
                            <p className='ms-3'>ราคา:  {eventDetail ? eventDetail.registrationFee : ""} บาท</p>

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
                    <div style={{ display: 'flex', justifyContent: "space-between", paddingLeft: "5rem", paddingRight: "5rem" }}>
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