import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function Card_News(props) {
    const { t, i18n } = useTranslation()

    const [userInfor, setUserInfor] = useState({});
    const [showConfirmPopup, setConFirmPopup] = useState(false);

    const changepage = (path) => {
        window.location.href = "/" + path
    }

    const handleCloseConFirmPopup = () => {
        setConFirmPopup(false);
    };

    const handleDelete = async () => {
        setConFirmPopup(true);
    };

    const handleDeleteNews = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/news/${props.data._id}`, {
                method: "DELETE",
                credentials: 'include', // Include cookies for session-based auth
            });

            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.log('Error:', error.message);
        }

        setConFirmPopup(false);
    };


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/userinfo', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for session-based auth
                });

                if (response.status === 401) {
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setUserInfor(data);
                } else {
                    throw new Error('Failed to fetch user info');
                }
            } catch (err) {
                console.error("Error fetch UserInfo:", err);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div
            style={{
                display: "flex", alignItems: "center", marginTop: "1rem", marginBottom: "1rem",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: "1rem", borderRadius: "15px",
                cursor: "pointer", width: "100%", position: "relative" // เพิ่ม position: relative
            }}>

            <Row style={{ width: "95%" }}
                onClick={() => changepage(`news/${props.data._id}`)}>
                <Col xs={12} sm={12} md={4} lg={3} xl={2}
                    style={{ display: "flex", justifyContent: "center" }}>
                    <img
                        src={props.data.image}
                        className="img-card-news"
                        alt="image"
                        style={{
                            maxWidth: "100%",  // ความกว้างสูงสุดเท่ากับคอนเทนเนอร์
                            height: "auto",    // ให้ความสูงปรับตามอัตราส่วน
                            objectFit: "cover",
                            maxHeight: "180px", // กำหนดความสูงสูงสุด
                            borderRadius: "10px"
                        }}
                    />
                </Col>
                <Col xs={12} sm={12} md={8} lg={9} xl={10}>
                    <p className="text-start" style={{ fontWeight: "bold", fontSize: "20px" }}>
                        {props.data.title}
                    </p>
                    <p className="text-start" style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}>
                        {props.data.description}
                    </p>
                </Col>
            </Row>


            {userInfor.role === 'admin' ? (
                <Button
                    className="mt-3"
                    onClick={handleDelete}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "red",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                    <FaTrash />
                </Button>
            ) : null}



            {/* Confirm Popup */}
            <Modal show={showConfirmPopup} onHide={handleCloseConFirmPopup} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('ยืนยันการลบประชาสัมพันธ์')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('คุณต้องการลบการประชาสัมพันธ์หรือไม่')}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConFirmPopup}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยกเลิก')}
                    </Button>
                    <Button variant="success" color="success" onClick={handleDeleteNews}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ยืนยัน')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>


    )
}

export default Card_News