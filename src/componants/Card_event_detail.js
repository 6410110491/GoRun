import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { FaList } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top'
import { useTranslation } from 'react-i18next';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { MarkerF } from '@react-google-maps/api'

function Card_event_detail() {
    const { id } = useParams();
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const [eventDetail, setEventDetail] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [maxParticipants, setMaxParticipants] = useState(null);
    const [registrations, setRegistrations] = useState(null);

    const { t, i18n } = useTranslation()

    const [center, setCenter] = useState(null);

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
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/api/events/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setEventDetail(data);
                    if (data?.map?.lat && data?.map?.lng) {
                        setCenter({ lat: data.map.lat, lng: data.map.lng });
                    }
                } else {
                    throw new Error('Failed to fetch event data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetail();
    }, [id]);


    useEffect(() => {
        if (eventDetail) {
            const fetchUserInfo = async () => {
                setLoading(true); // Set loading to true when starting data fetch
                setError(null); // Reset error state before fetching
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
                    setError(err.message); // Set error message
                } finally {
                    setLoading(false); // Set loading to false when fetch is complete
                }
            };

            fetchUserInfo();
        }
    }, [eventDetail]);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/events/${id}/getparticipants`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setMaxParticipants(data.maxParticipants);
                    setRegistrations(data.registrations);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // เรียกฟังก์ชันดึงข้อมูล
    }, [id]); // ใช้ useEffect เมื่อ eventId เปลี่ยน


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    });


    return (
        <div style={{ minHeight: "100vh" }}>
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                    <p>Error: {error}</p>
                </div>
            ) : (
                <>
                    {/* image */}
                    <div style={{
                        padding: "0", width: "100%", height: "302px",
                        backgroundImage: `url(${eventDetail.bannerPicture ? "" : eventDetail.coverPicture})`,
                        backgroundRepeat: `${eventDetail.bannerPicture ? "no-unset" : "repeat"}`,
                        backgroundPosition: `${eventDetail.bannerPicture ? "unset" : "center"}`,
                        backgroundSize: `${eventDetail.bannerPicture ? "unset" : "contain"}`,

                    }}>
                        <img style={{
                            width: "100%", height: "302px",
                            display: `${eventDetail.bannerPicture ? "unset" : "none"}`,
                        }} src={isDesktop ? eventDetail.bannerPicture : eventDetail.coverPicture} alt="Image" />

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
                                        {t('รายละเอียดงาน')}
                                    </Container>

                                    {/* ข้อมูลทั่วไป */}
                                    {eventDetail && eventDetail.generalInfo ? (
                                        <>
                                            <Container className='mt-4 ms-5' fluid style={{
                                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                                marginBottom: "-20px", position: "relative"
                                            }}>
                                                {t('ข้อมูลทั่วไป')}
                                            </Container>
                                            <Container className='ms-3' fluid style={{
                                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                                            }}>
                                                <p className='ms-3' style={{ whiteSpace: 'pre-line' }}>{eventDetail ? eventDetail.generalInfo : ""}</p>

                                            </Container>
                                        </>) : <></>
                                    }



                                    {/* วัตถุประสงค์ */}
                                    {eventDetail && eventDetail.objectives ? (
                                        <>
                                            <Container className='mt-4 ms-5' fluid style={{
                                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                                marginBottom: "-20px", position: "relative"
                                            }}>
                                                {t('วัตถุประสงค์')}
                                            </Container>
                                            <Container className='ms-3' fluid style={{
                                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem"
                                            }}>
                                                <p className='ms-3' style={{ whiteSpace: 'pre-line' }}>
                                                    {eventDetail ? eventDetail.objectives : ""}
                                                </p>

                                            </Container>
                                        </>) : <></>
                                    }



                                    {/* ความน่าสนใจของงาน */}
                                    {eventDetail && eventDetail.eventHighlights ? (
                                        <>
                                            <Container className='mt-4 ms-5' fluid style={{
                                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                                marginBottom: "-20px", position: "relative"
                                            }}>
                                                {t('ความน่าสนใจของงาน')}
                                            </Container>
                                            <Container className='ms-3' fluid style={{
                                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem", whiteSpace: 'pre-line'
                                            }}>
                                                <p className='ms-3'>{eventDetail ? eventDetail.eventHighlights : ""}</p>

                                            </Container>
                                        </>) : <></>
                                    }



                                    {/* ระยะวิ่ง/ค่าสมัคร */}
                                    <Container className='mt-4 ms-5' fluid style={{
                                        backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                        marginBottom: "-20px", position: "relative"
                                    }}>
                                        {t('ประเภทการแข่งขัน/ค่าสมัคร')}
                                    </Container>
                                    <Container className='ms-3' fluid style={{
                                        backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0",
                                        borderRadius: "10px", width: "95%"
                                    }}>
                                        {eventDetail.competitionDetails && eventDetail.competitionDetails.map((formDataItem, index) => (
                                            <div key={index}>
                                                <Row className='mt-1'>
                                                    <Col xl={6} md={6} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                                                        <p className='ms-3'>{t('ประเภทการแข่งขัน')}: {formDataItem.raceType}</p>
                                                    </Col>
                                                    <Col xl={6} md={6} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                                                        <p className='ms-3'>{t('ค่าสมัคร')}: THB {formDataItem.registrationFee}</p>
                                                    </Col>
                                                </Row>
                                                {/* แสดง Divider ยกเว้นรายการสุดท้าย */}
                                                {index < eventDetail.competitionDetails.length && (
                                                    <hr style={{ margin: "1rem", borderBottom: "1px solid #47474A" }} />
                                                )}
                                            </div>
                                        ))}

                                    </Container>



                                    {/* เส้นทางการแข่งขัน */}
                                    <Container className='mt-4 ms-5' fluid style={{
                                        backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                        marginBottom: "-20px", position: "relative"
                                    }}>
                                        {t('เส้นทางการแข่งขัน')}
                                    </Container>
                                    <Container className='ms-3' fluid style={{
                                        backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                        borderRadius: "10px", width: "95%", paddingTop: "1.5rem", display: "flex", flexDirection: "column",
                                        alignItems: "center", justifyContent: "center"
                                    }}>
                                        {eventDetail && eventDetail.route && eventDetail.route.length > 0 ? (
                                            eventDetail.route.map((url, index) => (
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`Route ${index}`}
                                                    style={{
                                                        maxWidth: "90%", // ปรับขนาดของภาพให้พอดีกับ container
                                                        height: "auto", // คงที่อัตราส่วนของภาพ
                                                        borderRadius: "10px", marginBottom: "10px",
                                                        marginTop: "10px"
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <p className='ms-3'>{t('ไม่มีข้อมูลเส้นทางการแข่งขัน')}</p>
                                        )}
                                    </Container>



                                    {/* รางวัล */}
                                    <Container className='mt-4 ms-5' fluid style={{
                                        backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                        marginBottom: "-20px", position: "relative"
                                    }}>
                                        {t('รางวัล')}
                                    </Container>
                                    <Container className='ms-3' fluid style={{
                                        backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                        borderRadius: "10px", width: "95%", paddingTop: "1.5rem", display: "flex", flexDirection: "column",
                                        alignItems: "center", justifyContent: "center"
                                    }}>
                                        {eventDetail && eventDetail.prize && eventDetail.prize.length > 0 ? (
                                            eventDetail.prize.map((url, index) => (
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`Prize ${index}`}
                                                    style={{
                                                        maxWidth: "90%", // ปรับขนาดของภาพให้พอดีกับ container
                                                        height: "auto", // คงที่อัตราส่วนของภาพ
                                                        borderRadius: "10px", marginBottom: "10px",
                                                        marginTop: "10px"
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <p className='ms-3'>{t('ไม่มีข้อมูลรางวัล')}</p>
                                        )}
                                    </Container>



                                    {/* สิ่งที่จะได้รับ */}
                                    <Container className='mt-4 ms-5' fluid style={{
                                        backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                        marginBottom: "-20px", position: "relative"
                                    }}>
                                        {t('สิ่งที่จะได้รับ')}
                                    </Container>
                                    <Container className='ms-3' fluid style={{
                                        backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                        borderRadius: "10px", width: "95%", paddingTop: "1.5rem", display: "flex", flexDirection: "column",
                                        alignItems: "center", justifyContent: "center"
                                    }}>
                                        {eventDetail && eventDetail.whatToReceive && eventDetail.whatToReceive.length > 0 ? (
                                            eventDetail.whatToReceive.map((url, index) => (
                                                <img
                                                    key={index}
                                                    src={url}
                                                    alt={`WhatToReceive ${index}`}
                                                    style={{
                                                        maxWidth: "90%", // ปรับขนาดของภาพให้พอดีกับ container
                                                        height: "auto", // คงที่อัตราส่วนของภาพ
                                                        borderRadius: "10px", marginBottom: "10px",
                                                        marginTop: "10px"
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <p className='ms-3'>{t('ไม่มีข้อมูลสิ่งที่จะได้รับ')}</p>
                                        )}
                                    </Container>



                                    {/* ข้อมูลเพิ่มเติม */}
                                    {eventDetail && eventDetail.eventHighlights ? (
                                        <>
                                            <Container className='mt-4 ms-5' fluid style={{
                                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                                                marginBottom: "-20px", position: "relative"
                                            }}>
                                                {t('ข้อมูลเพิ่มเติม')}
                                            </Container>
                                            <Container className='ms-3' fluid style={{
                                                backgroundColor: "#fff", minHeight: "100px", padding: "0",
                                                borderRadius: "10px", width: "95%", paddingTop: "1.5rem", whiteSpace: 'pre-line'
                                            }}>
                                                <p className='ms-3'> {eventDetail ? eventDetail.etcInfo : ""}</p>

                                            </Container>
                                        </>) : <></>
                                    }

                                </Container>




                                {/* แผนที่จัดงาน */}
                                <Container
                                    className="mt-4"
                                    fluid
                                    style={{
                                        backgroundColor: "#E3E3E3",
                                        padding: "0",
                                        height: "600px",
                                        borderRadius: "10px",
                                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <Container
                                        className="mb-2"
                                        fluid
                                        style={{
                                            backgroundColor: "#F3C710",
                                            height: "40px",
                                            borderRadius: "10px",
                                            fontSize: "20px",
                                            textAlign: "center",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        {t('แผนที่จัดงาน')}
                                    </Container>

                                    {!center ? (
                                        <div style={{ width: "100%", height: "400px", backgroundColor: "#f0f0f0" }}>
                                            <p>Loading map...</p>
                                        </div>) : (
                                        isLoaded ? (
                                            <div style={{ width: "100%", height: "calc(100% - 40px)", borderRadius: "10px" }}>
                                                <GoogleMap
                                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                                    center={center}
                                                    zoom={16}
                                                    options={{
                                                        mapTypeControl: false,
                                                        streetViewControl: false,
                                                        fullscreenControl: false,
                                                    }}
                                                >
                                                    <MarkerF position={center} />
                                                </GoogleMap>
                                            </div>
                                        ) : (
                                            <p>Loading map...</p>
                                        )
                                    )}

                                </Container>


                                {/* ที่พัก/ร้านอาหาร */}
                                {eventDetail && eventDetail.accommodation[0] !== "" && eventDetail.foodStalls[0] !== "" ? (
                                    <>
                                        <Container className='mt-4' fluid style={{
                                            backgroundColor: "#E3E3E3", padding: "0", height: "200px",
                                            borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                        }}>
                                            <Container className='mb-2' fluid style={{
                                                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                                display: "flex", justifyContent: "center", alignItems: "center"
                                            }}>
                                                {t('ที่พัก/ร้านอาหาร')}
                                            </Container>

                                            <p className='ms-3'>{t('ที่พัก')}:
                                                {eventDetail ? eventDetail.accommodation : ""}
                                            </p>
                                            <p className='ms-3'>{t('ร้านอาหาร')}:
                                                {eventDetail ? eventDetail.foodStalls : ""}
                                            </p>
                                        </Container>
                                    </>) : <></>
                                }

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
                                        {t('ผู้จัดงาน')}
                                    </Container>
                                    <p className='ms-3'>{t('ผู้จัดงาน')}: {eventDetail.organization ? eventDetail.organization : eventDetail.owner[0].username}</p>
                                    <p className='ms-3'>{t('เบอร์โทรศัพท์')}: {userInfo ? userInfo.personalInfo.phoneNumber : ""}</p>
                                    <p className='ms-3'>{t('อีเมล')}: {userInfo ? userInfo.email : ""}</p>

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
                                        {t('ช่วงการรับสมัคร')}
                                    </Container>

                                    <p className='ms-3'>{t('เปิดรับสมัคร')} : {formatDate(eventDetail ? eventDetail.registrationOpenDate : "")} </p>
                                    <p className='ms-3'>{t('ปิดรับสมัคร')} : {formatDate(eventDetail ? eventDetail.registrationCloseDate : "")}</p>
                                    <p className='ms-3'>{t('จำนวนผู้สมัคร')} : {registrations}/{maxParticipants}</p>

                                </Container>


                                {/* การสมัคร */}
                                <Container className='mt-5' fluid style={{
                                    backgroundColor: "#E3E3E3", minHeight: "240px", padding: "0 0 16px 0",
                                    borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                }}>
                                    <Container className='mb-2' fluid style={{
                                        backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                                        display: "flex", justifyContent: "center", alignItems: "center"
                                    }}>
                                        {t('การสมัคร')}
                                    </Container>

                                    <p className='ms-3'>{t('วันที่')} :  {formatDate(eventDetail ? eventDetail.eventDate : "")}</p>
                                    <p className='ms-3'>{t('สถานที่')} :  {eventDetail ? eventDetail.location : ""}</p>
                                    <p className='ms-3'>{t('เวลา')} : {t('เริ่มตั้งแต่')}  {formatTime(eventDetail ? eventDetail.eventTime : "")} น. เป็นต้นไป</p>

                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button variant="danger" style={{ border: 'none', borderRadius: '10px', width: "40%" }}
                                            onClick={() => changepage(`event/form/${eventDetail._id}`)}
                                            className='me-3 ms-3'
                                        >{t('สมัคร')}
                                        </Button>
                                    </div>


                                </Container>


                                <div style={{
                                    marginTop: "3rem", width: "100%",
                                    display: "flex", justifyContent: "center", alignItems: "center"
                                }}>
                                    <Button variant="primary" style={{
                                        border: 'none', borderRadius: '10px',
                                        width: "100%", backgroundColor: "#A9A9A9",
                                    }}
                                        onClick={() => changepage(`event/${eventDetail._id}/applicants-info`)}
                                    >
                                        <FaList />  {t('รายชื่อผู้สมัคร')}
                                    </Button>
                                </div>


                            </Col>

                            {/* Go Back Button */}
                            <div style={{ display: 'flex', justifyContent: "space-between", paddingLeft: "5rem", paddingRight: "5rem" }}>
                                <Button style={{ backgroundColor: "#47474A", border: 'none', borderRadius: '10px', width: '15%' }}
                                    onClick={() => changepage("")}>
                                    {t('ย้อนกลับ')}
                                </Button>
                            </div>
                        </Row>

                    </Container>
                </>)

            }
        </div>

    )
}

export default Card_event_detail