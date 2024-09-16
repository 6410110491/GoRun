import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Card_News(props) {
    const changepage = (path) => {
        window.location.href = "/" + path
    }
    return (
        <div
            onClick={() => changepage(`news/${props.data._id}`)}
            style={{
                display: "flex", alignItems: "center", marginTop: "1rem", marginBottom: "1rem",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: "1rem", borderRadius: "15px", cursor: "pointer"
            }}>

            <Row style={{ width: "100%" }}>
                <Col xs={12} sm={12} md={4} lg={3} xl={2}
                    style={{ display: "flex", justifyContent: "center" }}>
                    <img src={props.data.image} className="img-card-news" alt="image"
                        style={{ height: "auto", width: "auto", objectFit: "cover", maxHeight: "180px" }} />
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
        </div>

    )
}

export default Card_News