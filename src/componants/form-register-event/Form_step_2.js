import React from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'

function Form_step_2() {
  const sport_type = ["วิ่งมาราธอน", "ว่ายน้ำ", "ปั่นจักรยาน", "อื่นๆ"]
  const race_model = ["น้อยกว่า15ปี","15-25ปี", "26-35ปี", "36-45ปี", "46ปีขึ้นไป"]
  const race_range = ["3.5 km", "10 km", "21 km", "42 km"]
  const Application_fee = ["200 บาท", "300 บาท", "400 บาท", "500 บาท"]

  const shirt_type = ["เสื้อกล้าม", "เสื้อยืดคอกลม", "เสื้อโปโล"]
  const shirt_size = ["S", "M", "L", "XL", "XXL"]
  const etc = ["หมวก", "แว่นตา", "ถุงเท้า", "อื่นๆ"]
  return (
    <div>
      <Container className='mt-3' fluid style={{
        backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>
        <Row>
          <Col className='ms-5' style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "1rem" }}>
            <p style={{ fontSize: "1.2rem", borderBottom: "5px solid #47474A", width: "fit-content" }}>ประเภทการสมัคร</p>
          </Col>
        </Row>

        <Row>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ประเภทกีฬา</p>
            <Form.Select aria-label="Default select example" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer"
            }}>
              {sport_type.map((data, index) => {
                return (
                  <option key={index} value={index}>{data}</option>
                )
              })}
            </Form.Select>
          </Col>

          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>รุ่นการแข่งขัน</p>
            <Form.Select aria-label="Default select example" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer"
            }}>
              {race_model.map((data, index) => {
                return (
                  <option key={index} value={index}>{data}</option>
                )
              })}
            </Form.Select>
          </Col>

          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ระยะการแข่งขัน</p>
            <Form.Select aria-label="Default select example" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer"
            }}>
              {race_range.map((data, index) => {
                return (
                  <option key={index} value={index}>{data}</option>
                )
              })}
            </Form.Select>
          </Col>

          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ค่าสมัคร</p>
            <Form.Select aria-label="Default select example" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer"
            }}>
              {Application_fee.map((data, index) => {
                return (
                  <option key={index} value={index}>{data}</option>
                )
              })}
            </Form.Select>
          </Col>
        </Row>
        

        <Row>
          <Col className='ms-5' style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "1rem" }}>
            <p style={{ fontSize: "1.2rem", borderBottom: "5px solid #47474A", width: "fit-content" }}>สินค้า</p>
          </Col>
        </Row>

        <Row className='mt-3 mb-5'>
          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ประเภทเสื้อ</p>
            <Form.Select aria-label="Default select example" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer"
            }}>
              {shirt_type.map((data, index) => {
                return (
                  <option key={index} value={index}>{data}</option>
                )
              })}
            </Form.Select>
          </Col>

          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ขนาดเสื้อ</p>
            <Form.Select aria-label="Default select example" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer"
            }}>
              {shirt_size.map((data, index) => {
                return (
                  <option key={index} value={index}>{data}</option>
                )
              })}
            </Form.Select>
          </Col>

          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>อื่นๆ</p>
            <Form.Select aria-label="Default select example" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor: "pointer"
            }}>
              {etc.map((data, index) => {
                return (
                  <option key={index} value={index}>{data}</option>
                )
              })}
            </Form.Select>
          </Col>

        </Row>
      </Container>
    </div>
  )
}

export default Form_step_2