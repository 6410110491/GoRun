import React from 'react'
import { Container } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

function News() {
  return (
    <Container className='mt-5' style={{ minHeight: "100vh" }} >
      {/* Head */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            ประชาสัมพันธ์
          </p>
        </div>
      </div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

      <div style={{
        display: "flex", alignItems: "center", marginTop: "1rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: "1rem", borderRadius: "15px"
      }}>
        <img src={require("../image/event-pic-1.jpg")} class="img-thumbnail" alt="Thai.png"
          style={{ height: "180px" }} />
        <p class="text-start"
          style={{ marginLeft: "2rem" }}
        >ทัพนักวิ่ง “หมอชวนวิ่ง” ยกพลเข้าจังหวัดสุดท้าย สรุปยอดผู้เข้าร่วมโครงการกว่า 1 ล้านคน! </p>
      </div>

    </Container>
  )
}

export default News