import React from 'react'
import ScrollToTop from "react-scroll-to-top";

import { Container } from 'react-bootstrap'

function Data_org_4({ formData, setFormData }) {
  return (
    <div>
      <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
        {/* Head */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
            <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
              สรุปรายละเอียดงาน
            </p>
          </div>
        </div>

        {/* ScroolToTop */}
        <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

        <Container className='mt-5' fluid style={{
          minHeight: "100vh",
          backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
        }}>

          {/* เริ่มต้นข้อมูลส่วนตัวผู้จัดงาน */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            ข้อมูลส่วนตัวผู้จัดงาน
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%",
          }}>
            <p className='ms-3'>ชื่อผู้จัดงาน: {formData.username}</p>
            <p className='ms-3'>เบอร์โทรศัพท์: {formData.phoneNumber}</p>
            <p className='ms-3'>อีเมล: {formData.email}</p>

          </Container>
          {/* สิ้นสุดข้อมูลส่วนตัวผู้จัดงาน */}


          {/* ข้อมูลทั่วไป */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            ข้อมูลทั่วไป
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            <p className='ms-3'>{formData.generalInfo}</p>

          </Container>



          {/* วัตถุประสงค์ */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            วัตถุประสงค์
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            <p className='ms-3'>{formData.purpose}</p>

          </Container>



          {/* ความน่าสนใจของงาน */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            ความน่าสนใจของงาน
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            <p className='ms-3'>{formData.interesting}</p>

          </Container>



          {/* ระยะวิ่ง/ค่าสมัคร */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            ระยะวิ่ง/ค่าสมัคร
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            <p className='ms-3'>ระยะทาง: {formData.distance}</p>
            <p className='ms-3'>ค่าสมัคร: {formData.fee}</p>

          </Container>



          {/* เส้นทางการแข่งขัน */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            เส้นทางการแข่งขัน
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            <p className='ms-3'>{formData.route}</p>

          </Container>



          {/* รางวัล */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            รางวัล
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            <p className='ms-3'>{formData.reward}</p>

          </Container>



          {/* สิ่งที่จะได้รับ */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            สิ่งที่จะได้รับ
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            <p className='ms-3'>{formData.whatToReceive}</p>

          </Container>



          {/* ข้อมูลเพิ่มเติม */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            ข้อมูลเพิ่มเติม
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            <p className='ms-3'>RACEUP WORK</p>

          </Container>
        </Container>

      </Container >
    </div>
  )
}

export default Data_org_4