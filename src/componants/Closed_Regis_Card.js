import React, { useState } from 'react';
import { Badge, Card, Col } from 'react-bootstrap';
import RoomIcon from '@mui/icons-material/Room';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';

function Closed_Regis_Card({ data, onOrganizePage }) {
    const changepage = (path) => {
        window.location.href = "/" + path
    }

    const formatDate = (date) => {
        if (!date) return '';

        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const { t, i18n } = useTranslation()
    return (
        <Col className='mb-5' xs={12} md={6} lg={6} xl={4} xxl={3}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <Card
                style={{
                    width: '18rem', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "20px 20px 0px 0px", height: "345px", opacity: 0.8,
                    cursor: onOrganizePage ? "pointer" : "unset",
                }}
                onClick={onOrganizePage ? () => changepage(`myevent/${data._id}/applicants-info`) : undefined}

            >
                <Card.Img variant="top" src={data.coverPicture} style={{ borderRadius: "20px", height: "160px" }} />
                <Card.Body>
                    <Badge
                        bg="secondary"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#FF6B6B',
                            color: 'white',
                            fontSize: '1rem',
                            padding: '1em 2em',
                            borderRadius: '5px',
                            zIndex: 2
                        }}
                    >
                        {t('ปิดรับสมัคร')}
                    </Badge>
                    <Card.Title style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}>{data.eventName}</Card.Title>
                </Card.Body>
                <Card.Body style={{ marginTop: "-20px" }}>
                    <div style={{ display: "flex" }}>
                        <RoomIcon />
                        <Card.Text style={{ fontSize: "1rem", marginLeft: "5px" }}>
                            {data.location}
                        </Card.Text>
                    </div>

                    <div style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
                        <CalendarTodayIcon />
                        <Card.Text style={{ fontSize: "1rem", marginLeft: "5px" }}>
                            {formatDate(data.eventDate)}
                        </Card.Text>
                    </div>

                    <div style={{ display: "flex" }}>
                        <PersonIcon />
                        <Card.Text style={{ fontSize: "1rem", marginLeft: "5px" }}>
                            {data.organization ? data.organization : data.owner[0].username}
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Col >
    )
}

export default Closed_Regis_Card