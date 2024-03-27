import React from 'react'
import '../App.css';
import { Container, Row } from 'react-bootstrap'

import Card_event from './Card_event'
import ScrollToTop from 'react-scroll-to-top'

function All_events() {
  return (
    <Container className='mt-5' style={{ minHeight: "100vh"}} >
      {/* Head */}
      <p style={{ fontSize: "2rem" }}>งานทั้งหมด</p>
      <div style={{ height: "5px", width: "100%", backgroundColor: "#47474A" }}></div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor:"#F3C710" }} />


      {/* Card */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <Row style={{
          display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
          justifyContent: "center", alignItems: "center"
        }}>
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

export default All_events