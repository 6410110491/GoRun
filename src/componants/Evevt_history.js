import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import Card_Organize from './Card_Organize';
import { useTranslation } from 'react-i18next';
import Aos from 'aos';
import Card_event from './Card_event';
import Closed_Regis_Card from './Closed_Regis_Card';

function Evevt_history() {
    const [eventMe, setEventMe] = useState([]);
    const [activeEvents, setActiveEvents] = useState([]);
    const [inactiveEvents, setInactiveEvents] = useState([]);

    const { t, i18n } = useTranslation()


    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/me`, {
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


    const changepage = (path) => {
        window.location.href = "/" + path
    }

    useEffect(() => {
        Aos.init({
            duration: 1000, // กำหนดเวลาของแอนิเมชัน (มิลลิวินาที)
            easing: 'ease-in-out', // ปรับค่า easing ของแอนิเมชัน
            once: true, // ให้แอนิเมชันทำงานครั้งเดียวเมื่อเห็น element
        });
    }, []);

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
        setInactiveEvents(filteredInactiveEvents.slice(0, 12)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

    }, [eventMe]);

    const latestActiveEvents = [...activeEvents]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem", minHeight: "80vh" }}>
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        {t('ประวัติการจัดงาน')}
                    </p>
                </div>
            </div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
                <p style={{ fontSize: "1.5rem", marginLeft: '0.5rem', marginRight: '0.5rem' }}>{t('กำลังดำเนินการ')}</p>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
            </div>

            {/* Card */}
            <div style={{
                display: "flex", flexDirection: 'column', justifyContent: "space-around",
                alignItems: "center", minHeight: "50vh"
            }}>
                <Row style={{
                    display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
                    justifyContent: "center", alignItems: "center"
                }}>
                    {latestActiveEvents && latestActiveEvents.length === 0 ? (
                        <h5 style={{ textAlign: "center" }}>{t('ไม่มีข้อมูลงานกีฬา')}</h5>
                    ) : (
                        latestActiveEvents.map((data, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={`${index * 50}`}
                                style={{ width: "fit-content" }}
                            >
                                <Card_Organize data={data} />
                            </div>
                        ))
                    )}
                </Row>
            </div>


            <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
                <p style={{ fontSize: "1.5rem", marginLeft: '0.5rem', marginRight: '0.5rem' }}>{t('ดำเนินการเสร็จสิ้น')}</p>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
            </div>

            <div style={{
                display: "flex", flexDirection: 'column', justifyContent: "space-around",
                alignItems: "center", minHeight: "50vh"
            }}>
                <Row style={{
                    display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
                    justifyContent: "center", alignItems: "center"
                }}>


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
                                <Closed_Regis_Card data={data} onOrganizePage={true} />
                            </div>
                        ))
                    )}
                </Row>
            </div>
        </Container >
    )
}

export default Evevt_history