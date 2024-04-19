import React from 'react'
import { Col, Button, Row, Container, Card, Form , img} from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

function News() {
  return (
    <Container className='mt-5' style={{ minHeight: "100vh" }} >
      {/* Head */}
      <p style={{ fontSize: "2rem" }}>ประชาสัมพันธ์</p>
      <div style={{ height: "5px", width: "100%", backgroundColor: "#47474A" }}></div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

      <div style={{display:"flex", alignItems:"center", marginTop:"1rem"}}>
        <img src={require("../image/Thai.png")}  class="img-thumbnail" alt="Thai.png" 
        style={{height: "180px" }}/>
        <p class="text-start" 
        style={{marginLeft:"2rem"}}
        >ทัพนักวิ่ง “หมอชวนวิ่ง” ยกพลเข้าจังหวัดสุดท้าย สรุปยอดผู้เข้าร่วมโครงการกว่า 1 ล้านคน! </p>
      </div>
      <div style={{display:"flex", alignItems:"center", marginTop:"1rem"}}>
        <img src={require("../image/Thai.png")}  class="img-thumbnail" alt="Thai.png" 
        style={{height: "180px" }}/>
        <p class="text-start" 
        style={{marginLeft:"2rem"}}
        >ทัพนักวิ่ง “หมอชวนวิ่ง” ยกพลเข้าจังหวัดสุดท้าย สรุปยอดผู้เข้าร่วมโครงการกว่า 1 ล้านคน! </p>
      </div>
      <div style={{display:"flex", alignItems:"center", marginTop:"1rem"}}>
        <img src={require("../image/Thai.png")}  class="img-thumbnail" alt="Thai.png" 
        style={{height: "180px" }}/>
        <p class="text-start" 
        style={{marginLeft:"2rem"}}
        >ทัพนักวิ่ง “หมอชวนวิ่ง” ยกพลเข้าจังหวัดสุดท้าย สรุปยอดผู้เข้าร่วมโครงการกว่า 1 ล้านคน! </p>
      </div>
    </Container>
  )
}

export default News