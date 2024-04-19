import React from 'react'
import '../App.css';
import { Container, Row } from 'react-bootstrap'

import Card_event from './Card_event'
import ScrollToTop from 'react-scroll-to-top'

function All_events() {
  const demo_api = [
    {
      "id": 1,
      "name": "งานวิ่งมาราธอน",
      "province" : "กรุงเทพมหานคร",
      "date": "2024-4-18",
      "organizer": "สมาคมวิ่ง",
      "img": 'event-pic-1.jpg'
  },
  {
      "id": 2,
      "name": "งานวิ่งการกุศล",
      "province" : "สุราษฎร์ธานี",
      "date": "2024-4-18",
      "organizer": "สมาคมวิ่ง",
      "img": 'event-pic-2.jpg'
  },
  {
      "id": 3,
      "name": "Run for change",
      "province" : "กาญจนบุรี",
      "date": "2024-4-18",
      "organizer": "สมาคมวิ่ง",
      "img": 'event-pic-3.jpg'
  },
]
  return (
    <Container className='mt-5' style={{ minHeight: "100vh" }} >
      {/* Head */}
      <p style={{ fontSize: "2rem" }}>งานทั้งหมด</p>
      <div style={{ height: "5px", width: "100%", backgroundColor: "#47474A" }}></div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />


      {/* Card */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <Row style={{
          display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
          justifyContent: "center", alignItems: "center"
        }}>
          {demo_api.map((data, index) => {
            return (
              <Card_event key={index} data={data} />
            )
          })}
        </Row>
      </div>

    </Container>
  )
}

export default All_events