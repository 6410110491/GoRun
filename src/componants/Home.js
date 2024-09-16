import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import background from '../image/bg-banner.png'
import ScrollToTop from "react-scroll-to-top";


import Card_event from './Card_event'

function Home() {
    const province = ['กระบี่', 'กรุงเทพมหานคร', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร',
        'ขอนแก่น',
        'จันทบุรี',
        'ฉะเชิงเทรา',
        'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่',
        'ตรัง', 'ตราด', 'ตาก',
        'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน',
        'บึงกาฬ', 'บุรีรัมย์',
        'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี',
        'พระนครศรีอยุธยา', 'พะเยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่',
        'ภูเก็ต',
        'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน',
        'ยโสธร', 'ยะลา',
        'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี',
        'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย',
        'ศรีสะเกษ',
        'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์',
        'หนองคาย', 'หนองบัวลำภู',
        'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 'อุบลราชธานี']

    const sport_type = ['วิ่งมาราธอน', 'ว่ายน้ำ', 'ปั่นจักรยาน', 'อื่นๆ']

    const [eventMe, setEventMe] = useState([]);

    const changepage = (path) => {
        window.location.href = "/" + path
    }

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/events', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for session-based auth
                });

                if (response.status === 401) {
                    // Redirect to login if not authenticated
                    changepage('login'); // Adjust the path as necessary
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setEventMe(data);
                } else {
                    throw new Error('Failed to fetch event data');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchEvent();
    }, []);

    return (
        <Container fluid style={{ padding: "0" }}>
            <div style={{
                width: "100%", height: "402px", backgroundSize: "cover", backgroundImage: `url(${background})`,
                display: "flex", justifyContent: "center", alignItems: "flex-end",
            }}>
                {/* filter box */}
                <Row className='mb-4 mt-4'
                    style={{
                        backgroundColor: "#E3E3E3", minHeight: "30%", marginBottom: "1.5rem", borderRadius: "20px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", display: 'flex', alignItems: 'center', justifyContent: "space-around",
                        padding: "1rem", width: "85%"
                    }}>
                    <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={3}>
                        <p>ชื่องาน</p>
                        <Form.Control type="text" placeholder="ค้นหาชื่องาน" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={3}>
                        <p>สถานที่จัดงาน</p>
                        <Form.Select aria-label="Default select example" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}>
                            <option >ค้นหาจังหวัด</option>
                            {province.map((data, index) => {
                                return (
                                    <option key={index} value={index}>{data}</option>
                                )
                            })}
                        </Form.Select>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={3} >
                        <p>ประเภทกีฬา</p>
                        <Form.Select aria-label="Default select example" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}>
                            <option>ค้นหาประเภท</option>
                            {sport_type.map((data, index) => {
                                return (
                                    <option key={index} value={index}>{data}</option>
                                )
                            })}
                        </Form.Select>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={1} >
                        <p></p>
                        <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: "100%" }}>
                            ค้นหา
                        </Button>
                    </Col>

                </Row>
            </div>
            <Container fluid style={{ backgroundColor: "#47474A", height: "40px" }}></Container>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            {/* card */}
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", minHeight: "50vh" }}>
                <Row style={{
                    display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
                    justifyContent: "center", alignItems: "center"
                }}>
                    {eventMe && eventMe.length === 0 ? (
                        <h5 style={{textAlign:"center"}}>ไม่มีข้อมูลงานกีฬา</h5>
                    ) : (
                        eventMe && eventMe.map((data, index) => (
                            <Card_event key={index} data={data} />
                        ))
                    )}


                </Row>
            </div>


        </Container>
    )
}

export default Home