import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import background from '../image/bg-banner.png'
import ScrollToTop from "react-scroll-to-top";


import Card_event from './Card_event'

function Home() {
    return (
        <Container fluid style={{ padding: "0" }}>
            <div style={{
                width: "100%", height: "402px", backgroundSize: "cover", backgroundImage: `url(${background})`,
                display: "flex", justifyContent: "center", alignItems: "flex-end",
            }}>
                {/* filter box */}
                <Row  className='mb-4 mt-4'  
                style={{
                    backgroundColor: "#E3E3E3", minHeight:"30%", marginBottom: "1.5rem", borderRadius: "20px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", display:'flex', alignItems:'center',justifyContent:"space-around",
                    padding: "1rem" , width: "85%"
                }}>
                    <Col sm={12} md={6} lg={6} xl={3} xxl={3}>
                        <p>ชื่องาน</p>
                        <Form.Control type="text" placeholder="ค้นหาชื่องาน" style={{
                            borderRadius: "10px", marginTop:"-15px", maxWidth:"95%",
                            backgroundColor: "#fff", border: "none", height: "40px", width: "300px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }} />
                    </Col>
                    <Col sm={12} md={6} lg={6} xl={3} xxl={3}>
                        <p>สถานที่จัดงาน</p>
                        <Form.Select aria-label="Default select example" style={{
                            borderRadius: "10px", marginTop:"-15px", maxWidth:"95%",
                            backgroundColor: "#fff", border: "none", height: "40px", width: "300px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}>
                            <option>ค้นหาจังหวัด</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>
                    <Col sm={12} md={6} lg={6} xl={3} xxl={3} >
                        <p>ประเภทกีฬา</p>
                        <Form.Select aria-label="Default select example" style={{
                            borderRadius: "10px", marginTop:"-15px", maxWidth:"95%",
                            backgroundColor: "#fff", border: "none", height: "40px", width: "300px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            cursor: "pointer"
                        }}>
                            <option>ค้นหาประเภท</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>
                    <Col sm={12} md={6} lg={6} xl={3} xxl={1} >
                        <p></p>
                        <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px' ,minWidth:"80%"}}>
                            ค้นหา
                        </Button>
                    </Col>  

                </Row>
            </div>
            <Container fluid style={{ backgroundColor: "#47474A", height: "40px" }}></Container>

            {/* ScroolToTop */}
            <ScrollToTop smooth style={{ borderRadius: "20px" }} />

            {/* card */}
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Row style={{ display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem" , 
                justifyContent:"center" , alignItems:"center"}}>
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
                    <Card_event />
                    <Card_event />
                </Row>
            </div>


        </Container>
    )
}

export default Home