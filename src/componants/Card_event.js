import React from 'react'
import { Card, Col } from 'react-bootstrap';

import RoomIcon from '@mui/icons-material/Room';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

function Card_event() {
    return (
        <Col className='mb-5 col-xl-3 col-lg-4 col-md-5 col-sm-6 col-s-8'>
            <Card style={{ width: '18rem', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "20px 20px 0px 0px" }}>
                <Card.Img variant="top" src={require('../image/Thai.png')} style={{ borderRadius: "20px" }} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                </Card.Body>
                <Card.Body style={{ marginTop: "-20px" }}>
                    <div style={{ display: "flex" }}>
                        <RoomIcon />
                        <Card.Text style={{ fontSize: "1rem", marginLeft: "5px" }}>
                            จันทบุรี
                        </Card.Text>
                    </div>

                    <div style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
                        <CalendarTodayIcon />
                        <Card.Text style={{ fontSize: "1rem", marginLeft: "5px" }}>
                            26 พฤษภาคม 2567
                        </Card.Text>
                    </div>

                    <div style={{ display: "flex" }}>
                        <PersonIcon />
                        <Card.Text style={{ fontSize: "1rem", marginLeft: "5px" }}>
                            RACEUP WORK
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Card_event