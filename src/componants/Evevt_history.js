import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import Card_Organize from './Card_Organize';
import { useTranslation } from 'react-i18next';

function Evevt_history() {
    const [eventMe, setEventMe] = useState([]);
    const { t, i18n } = useTranslation()

    // console.log(eventMe);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/events/me', {
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

    console.log(eventMe);


    const changepage = (path) => {
        window.location.href = "/" + path
    }

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
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Row style={{
                    display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
                    justifyContent: "center", alignItems: "center"
                }}>
                    {eventMe.map((data, index) => {
                        return (
                            <Card_Organize key={index} data={data} />
                        )
                    })}
                </Row>
            </div>

            <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
                <p style={{ fontSize: "1.5rem", marginLeft: '0.5rem', marginRight: '0.5rem' }}>{t('เสร็จสิ้น')}</p>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>

                {/* <Row key={item.id} >
                    <Button
                        variant="danger"
                        color="secondary"
                        onClick={() => handleEdit(item.id)}
                        style={{ marginRight: '8px' }}
                    >
                        แก้ไข
                    </Button>
                    <Button
                        variant="success"
                        color="success"
                        onClick={() => handleConfirm(item.id)}
                    >
                        ยืนยัน
                    </Button>
                </Row> */}
            </div>
        </Container>
    )
}

export default Evevt_history