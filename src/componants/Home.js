import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import background from '../image/bg-banner.png'
import ScrollToTop from "react-scroll-to-top";

import Card_event from './Card_event'
import { useTranslation } from 'react-i18next';

import AOS from 'aos';
import 'aos/dist/aos.css';

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

    const sport_type = ['วิ่ง', 'ว่ายน้ำ', 'ปั่นจักรยาน', 'อื่นๆ']

    const [eventMe, setEventMe] = useState([]);

    const [searchName, setSearchName] = useState('');
    const [searchProvince, setSearchProvince] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const { t, i18n } = useTranslation()

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

    useEffect(() => {
        AOS.init({
            duration: 1000, // กำหนดเวลาของแอนิเมชัน (มิลลิวินาที)
            easing: 'ease-in-out', // ปรับค่า easing ของแอนิเมชัน
            once: true, // ให้แอนิเมชันทำงานครั้งเดียวเมื่อเห็น element
        });
    }, []);

    const filterEvents = () => {
        const result = eventMe.filter(event => {
            return (
                event.eventName.toLowerCase().includes(searchName.toLowerCase()) &&
                event.location.toLowerCase().includes(searchProvince.toLowerCase()) &&
                event.sportType.toLowerCase().includes(searchCategory.toLowerCase())
            );
        });
        setFilteredEvents(result);
        setIsSearched(true);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        filterEvents();
    };

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
                        <p>{t('ชื่องาน')}</p>
                        <Form.Control type="text" placeholder="ค้นหาชื่องาน" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)} />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={3}>
                        <p>สถานที่จัดงาน</p>
                        <Form.Select aria-label="Default select example" style={{
                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                            backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}
                            value={searchProvince}
                            onChange={(e) => setSearchProvince(e.target.value)}>
                            <option value="">ค้นหาจังหวัด</option>
                            {province.map((data, index) => {
                                return (
                                    <option key={index} value={data}>{data}</option>
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
                        }}
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}>
                            <option value="">ค้นหาประเภท</option>
                            {sport_type.map((data, index) => {
                                return (
                                    <option key={index} value={data}>{data}</option>
                                )
                            })}
                        </Form.Select>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={1} >
                        <p></p>
                        <Button type="submit" onClick={handleSearch}
                            style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: "100%" }}>
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
                    {isSearched ? (
                        filteredEvents && filteredEvents.length === 0 ? (
                            <h5 style={{ textAlign: "center" }}>ไม่พบข้อมูลที่ค้นหา</h5>
                        ) : (
                            filteredEvents.map((data, index) => (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-delay={`${index * 50}`}
                                    style={{ width: "fit-content" }}
                                >
                                    <Card_event data={data} />
                                </div>
                            ))
                        )
                    ) : (
                        eventMe && eventMe.length === 0 ? (
                            <h5 style={{ textAlign: "center" }}>ไม่มีข้อมูลงานกีฬา</h5>
                        ) : (
                            eventMe.map((data, index) => (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-delay={`${index * 50}`}
                                    style={{ width: "fit-content" }}
                                >
                                    <Card_event data={data} />
                                </div>
                            ))
                        )
                    )}
                </Row>
            </div>



        </Container>
    )
}

export default Home