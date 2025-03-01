import React from 'react';
import { Card, Col } from 'react-bootstrap';
import RoomIcon from '@mui/icons-material/Room';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

function Card_event(props) {
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

    return (
        <Col className='mb-5' xs={12} md={6} lg={6} xl={4} xxl={3}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <Card
                style={{
                    width: '18rem', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "20px 20px 0px 0px", cursor: "pointer", height: "345px"
                }}
                onClick={() => changepage(`event/detail/${props.data._id}`)}
            >
                <Card.Img alt='card-img' variant="top" src={props.data.coverPicture} style={{ borderRadius: "20px", height: "160px" }} />
                <Card.Body>
                    <Card.Title style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}>{props.data.eventName}</Card.Title>
                </Card.Body>
                <Card.Body style={{ marginTop: "-20px" }}>
                    <div style={{ display: "flex" }}>
                        <RoomIcon />
                        <Card.Text style={{ fontSize: "1rem", marginLeft: "5px" }}>
                            {props.data.location}
                        </Card.Text>
                    </div>

                    <div style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
                        <CalendarTodayIcon />
                        <Card.Text style={{ fontSize: "1rem", marginLeft: "5px" }}>
                            {formatDate(props.data.eventDate)}
                        </Card.Text>
                    </div>

                    <div style={{ display: "flex" }}>
                        <PersonIcon />
                        <Card.Text style={{
                            fontSize: "1rem", marginLeft: "5px",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>
                            {props.data.organization ? props.data.organization : props.data.owner[0].username}
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Col >
    );
}

export default Card_event;
