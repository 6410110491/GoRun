import React, { useEffect, useState } from 'react'
import { Button, Carousel, Col, Container, Form, Row } from 'react-bootstrap'
import background from '../image/bg-banner.png'
import ScrollToTop from "react-scroll-to-top";

import Card_event from './Card_event'
import { useTranslation } from 'react-i18next';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Closed_Regis_Card from './Closed_Regis_Card';

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

    const sport_type = ['วิ่ง', 'ว่ายน้ำ', 'ปั่นจักรยาน']

    const [eventMe, setEventMe] = useState([]);


    const [activeEvents, setActiveEvents] = useState([]);
    const [inactiveEvents, setInactiveEvents] = useState([]);

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
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events`, {
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
        const result = activeEvents.filter(event => {
            return (
                event.eventName.toLowerCase().includes(searchName.toLowerCase()) &&
                event.location.toLowerCase().includes(searchProvince.toLowerCase()) &&
                event.sportType.toLowerCase().includes(searchCategory.toLowerCase())
            );
        });
        setFilteredEvents(result);
        setIsSearched(true);
    };

    // จัดเรียง activeEvents 12 อันดับแรก
    const latestActiveEvents = [...activeEvents]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 12);


    const handleSearch = (e) => {
        e.preventDefault();
        filterEvents();
    };

    const handleReset = () => {
        setSearchName(''); // รีเซ็ตชื่อที่ค้นหา
        setSearchProvince(''); // รีเซ็ตจังหวัดที่ค้นหา
        setSearchCategory(''); // รีเซ็ตประเภทกีฬาที่ค้นหา
        setFilteredEvents([]); // รีเซ็ตผลลัพธ์ที่กรอง
        setIsSearched(false); // ยกเลิกสถานะการค้นหา
    };


    useEffect(() => {
        // กรอง events ที่ตรงกับการค้นหาและสถานะเป็น true
        const filteredActiveEvents = eventMe.filter(event => {
            return (
                event.status === true
            );
        });

        // กรอง events ที่ตรงกับการค้นหาและสถานะเป็น false
        const filteredInactiveEvents = eventMe.filter(event => {
            return (
                event.status === false
            );
        });

        // อัปเดตตัวแปร state สำหรับ active และ inactive events
        setActiveEvents(filteredActiveEvents);
        setInactiveEvents(filteredInactiveEvents.slice(0, 8)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

    }, [eventMe]);

    return (
        <Container fluid style={{ padding: "0" }}>
            <div
                style={{
                    width: "100%",
                    height: "402px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                {/* Carousel */}
                <Carousel
                    touch={true}
                    slide={true}
                    indicators={false}
                    controls={false}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Carousel.Item>
                        <div
                            style={{
                                width: "100%",
                                height: "402px",
                                backgroundImage: `url(${require("../image/banner02.png")})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div
                            style={{
                                width: "100%",
                                height: "402px",
                                backgroundImage: `url(${require("../image/banner03.png")})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div
                            style={{
                                width: "100%",
                                height: "402px",
                                backgroundImage: `url(${require("../image/banner04.png")})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div
                            style={{
                                width: "100%",
                                height: "402px",
                                backgroundImage: `url(${require("../image/banner05.png")})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div
                            style={{
                                width: "100%",
                                height: "402px",
                                backgroundImage: `url(${require("../image/banner06.png")})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>
                    </Carousel.Item>
                </Carousel>

                {/* Filter Box */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#E3E3E3",
                        minHeight: "30%",
                        borderRadius: "20px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        padding: "1rem",
                        width: "85%",
                    }}
                >
                    <Row style={{ width: "100%", justifyContent: "center" }}>
                        <Col xs={12} sm={12} md={12} lg={6} xl={3} xxl={3} style={{ marginTop: "0.5rem" }}>
                            <p>{t("ชื่องาน")}</p>
                            <Form.Control
                                type="text"
                                placeholder={t("ค้นหาชื่องาน")}
                                style={{
                                    borderRadius: "10px",
                                    marginTop: "-15px",
                                    maxWidth: "100%",
                                    backgroundColor: "#fff",
                                    border: "none",
                                    height: "40px",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                }}
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={3} style={{ marginTop: "0.5rem" }}>
                            <p>{t('สถานที่จัดงาน')}</p>
                            <Form.Select
                                aria-label="Default select example"
                                style={{
                                    borderRadius: "10px",
                                    marginTop: "-15px",
                                    maxWidth: "100%",
                                    backgroundColor: "#fff",
                                    border: "none",
                                    height: "40px",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    cursor: "pointer",
                                }}
                                value={searchProvince}
                                onChange={(e) => setSearchProvince(e.target.value)}
                            >
                                <option value="">{t('ค้นหาจังหวัด')}</option>
                                {province.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={3} style={{ marginTop: "0.5rem" }}>
                            <p>{t('ประเภทกีฬา')}</p>
                            <Form.Select
                                aria-label="Default select example"
                                style={{
                                    borderRadius: "10px",
                                    marginTop: "-15px",
                                    maxWidth: "100%",
                                    backgroundColor: "#fff",
                                    border: "none",
                                    height: "40px",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    cursor: "pointer",
                                }}
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                            >
                                <option value="" >{t('ค้นหาประเภท')}</option>
                                {sport_type.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-end" }}>
                            <p></p>
                            <Button
                                type="submit"
                                onClick={handleSearch}
                                style={{
                                    backgroundColor: "#F3C710",
                                    border: "none",
                                    borderRadius: "10px",
                                    width: "100%",
                                }}
                            >
                                {t('ค้นหา')}
                            </Button>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={3} xxl={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-end" }}>
                            <p></p>
                            <Button
                                type="button"
                                onClick={handleReset}
                                style={{
                                    backgroundColor: "#696969",
                                    border: "none",
                                    borderRadius: "10px",
                                    width: "100%",
                                }}
                            >
                                {t("ล้าง")}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>

            <Container fluid style={{ backgroundColor: "#47474A", height: "40px" }}></Container>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            {/* card */}
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", minHeight: "50vh", flexDirection: 'column' }}>
                <Row style={{
                    display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
                    justifyContent: "center", alignItems: "center"
                }}>
                    <div style={{ fontSize: "2rem", fontWeight: "500", marginBottom: "1.75rem" }}>
                        {t('กำลังดำเนินงาน')}
                    </div>
                    {isSearched ? (
                        filteredEvents && filteredEvents.length === 0 ? (
                            <h5 style={{ textAlign: "center" }}>{t('ไม่มีข้อมูลงานกีฬา')}</h5>
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
                        latestActiveEvents && latestActiveEvents.length === 0 ? (
                            <h5 style={{ textAlign: "center" }}>{t('ไม่มีข้อมูลงานกีฬา')}</h5>
                        ) : (
                            latestActiveEvents.map((data, index) => (
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

                <Row style={{
                    display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
                    justifyContent: "center", alignItems: "center"
                }}>
                    <div style={{ fontSize: "2rem", fontWeight: "500", marginBottom: "1.75rem" }}>
                        {t('งานที่ผ่านมา')}
                    </div>
                    {inactiveEvents && inactiveEvents.length === 0 ? (
                        <h5 style={{ textAlign: "center" }}>{t('ไม่มีข้อมูลงานกีฬา')}</h5>
                    ) : (
                        inactiveEvents.map((data, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={`${index * 50}`}
                                style={{ width: "fit-content" }}
                            >
                                <Closed_Regis_Card data={data} />
                            </div>
                        ))
                    )}
                </Row>
            </div>



        </Container>
    )
}

export default Home