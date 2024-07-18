import React from 'react'
import { Col, Button, Row, Container, Card, Form, img } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

function Personal_information() {
    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
            {/* Head */}
            <p style={{ fontSize: "2rem" }}>ข้อมูลส่วนตัว</p>
            <div style={{ height: "5px", width: "100%", backgroundColor: "#47474A" }}></div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            <Container className='mt-5' fluid style={{
                minHeight: "100vh",
                backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
                borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}></Container>
        </Container>
    )
}

export default Personal_information