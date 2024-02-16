import React from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import background from '../image/bg-banner.png'
import ScrollToTop from "react-scroll-to-top";


import Card_event from './Card_event'
import Footer from './Footer'

function Home() {
    return (
        <Container fluid style={{ padding: "0" }}>
            <div style={{
                width: "100%", height: "402px", backgroundSize: "cover", backgroundImage: `url(${background})`,
                display: "flex", justifyContent: "center", alignItems: "flex-end",
            }}>
                {/* filter box */}
                <Container md style={{
                    backgroundColor: "#E3E3E3", height: "30%", marginBottom: "1.5rem", borderRadius: "20px",
                    display: "flex", justifyContent: "space-around", alignItems: "center", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }}>
                    <div>
                        <p>ชื่องาน</p>
                        <Form.Control type="text" placeholder="ค้นหาชื่องาน" style={{
                            borderRadius: "10px",
                            backgroundColor: "#fff", border: "none", height: "40px", width: "300px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </div>
                    <div>
                        <p>สถานที่จัดงาน</p>
                        <Form.Select aria-label="Default select example" style={{
                            borderRadius: "10px",
                            backgroundColor: "#fff", border: "none", height: "40px", width: "300px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}>
                            <option>ค้นหาจังหวัด</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                    <div>
                        <p>ประเภทกีฬา</p>
                        <Form.Select aria-label="Default select example" style={{
                            borderRadius: "10px",
                            backgroundColor: "#fff", border: "none", height: "40px", width: "300px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}>
                            <option>ค้นหาประเภท</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                    <Button size='lg'
                        style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' }}
                        className='me-3'>
                        ค้นหา
                    </Button>

                </Container>
            </div>
            <Container fluid style={{ backgroundColor: "#47474A", height: "40px" }}></Container>

            {/* ScroolToTop */}
            <ScrollToTop smooth style={{borderRadius:"20px"}}/>

            {/* card */}
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Row style={{ display: "flex", flexWrap: "wrap", width:"90%" , margin:"3rem auto"}}>
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
                <Card_event />
            </Row>
            </div>

            {/* Footer */}
            <Footer />

        </Container>
    )
}

export default Home