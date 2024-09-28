import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'

function Form_step_2({ formData, setFormData, loading, setLoading, error, setError, eventData, setEventData }) {
  const [selectedRaceIndex, setSelectedRaceIndex] = useState(''); // กำหนดค่าเริ่มต้นเป็น ''

  // ตั้งค่า selectedRaceIndex ตามค่าใน formData เมื่อ formData เปลี่ยนแปลง
  useEffect(() => {
    if (eventData.competitionDetails && formData.raceType) {
      const index = eventData.competitionDetails.findIndex(item => item.raceType === formData.raceType);
      if (index !== -1) {
        setSelectedRaceIndex(index);
      }
    }
  }, [formData.raceType, eventData.competitionDetails]);

  // ดึงข้อมูลประเภทกีฬาและตั้งค่าใน formData เมื่อ eventData เปลี่ยนแปลง
  useEffect(() => {
    if (eventData.sportType) {
      setFormData(prevFormData => ({
        ...prevFormData,
        sportType: eventData.sportType || ''
      }));
    }
  }, [eventData, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // เมื่อมีการเลือก raceType จะเก็บ index ที่เลือก และตั้งค่า raceType และ registrationFee ใน formData
  const handleRaceTypeChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === '') {
      setSelectedRaceIndex('');
      setFormData(prevFormData => ({
        ...prevFormData,
        raceType: '',
        registrationFee: ''
      }));
    } else {
      const selectedIndex = parseInt(selectedValue, 10);
      setSelectedRaceIndex(selectedIndex);
      setFormData(prevFormData => ({
        ...prevFormData,
        raceType: eventData.competitionDetails[selectedIndex]?.raceType || '',
        registrationFee: eventData.competitionDetails[selectedIndex]?.registrationFee || 0
      }));
    }
  };

  return (
    <div>
      <Container className='mt-3' fluid style={{
        backgroundColor: "#E3E3E3", minHeight: "260px", padding: "1rem 2rem 1rem 2rem",
        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>
        <Row>
          <Col className='ms-5' style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "1rem" }}>
            <p style={{ fontSize: "1.2rem", borderBottom: "5px solid #47474A", width: "fit-content" }}>ประเภทการสมัคร</p>
          </Col>
        </Row>

        <Row>
          <Col xl={4} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ประเภทกีฬา</p>
            <Form.Control type='text'
              name='sportType'
              value={formData.sportType || ''}
              onChange={handleChange}
              disabled
              placeholder='กรอกประเภทกีฬา'
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>

          <Col xl={4} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ประเภทการแข่งขัน</p>
            <Form.Select
              value={selectedRaceIndex}
              onChange={handleRaceTypeChange}
              name='raceType'
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer"
              }}>
              <option value="">เลือกประเภทการแข่งขัน</option>
              {eventData.competitionDetails && eventData.competitionDetails.length > 0 ? (
                eventData.competitionDetails.map((data, index) => (
                  <option key={index} value={index}>
                    {data.raceType}
                  </option>
                ))
              ) : (
                <option value="">ไม่มีข้อมูล</option>
              )}
            </Form.Select>
          </Col>

          <Col xl={4} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ค่าสมัคร(THB)</p>
            <Form.Control
              type='text'
              value={
                formData.registrationFee !== undefined
                  ? formData.registrationFee
                  : (selectedRaceIndex !== '' && eventData.competitionDetails[selectedRaceIndex]?.registrationFee) || ''
              }
              disabled
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer"
              }}
            />
          </Col>
        </Row>

        {/* สินค้า */}
        <Row>
          <Col className='ms-5' style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "1rem" }}>
            <p style={{ fontSize: "1.2rem", borderBottom: "5px solid #47474A", width: "fit-content" }}>สินค้า</p>
          </Col>
        </Row>

        <Row className='mt-3 mb-5'>
          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ประเภทเสื้อ</p>
            <Form.Select
              aria-label="Default select example"
              value={formData.shirt || ''}
              name='shirt'
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer"
              }}>
              <option value="">เลือกประเภทเสื้อ</option>
              {eventData.product && eventData.product.shirt && eventData.product.shirt.length > 0 ? (
                eventData.product.shirt.map((data, index) => (
                  <option key={index} value={data}>{data}</option>
                ))
              ) : (
                <option value="">ไม่มีข้อมูล</option>
              )}
            </Form.Select>
          </Col>

          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ขนาดเสื้อ</p>
            <Form.Select
              aria-label="Default select example"
              value={formData.shirtSize || ''}
              name='shirtSize'
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer"
              }}>
              <option value="">เลือกขนาดเสื้อ</option>
              {eventData.product && eventData.product.shirtsize && eventData.product.shirtsize.length > 0 ? (
                eventData.product.shirtsize.map((data, index) => (
                  <option key={index} value={data}>{data}</option>
                ))
              ) : (
                <option value="">ไม่มีข้อมูล</option>
              )}
            </Form.Select>
          </Col>

          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>อื่นๆ</p>
            <Form.Select
              aria-label="Default select example"
              value={formData.etc || ''}
              name='etc'
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer"
              }}>
              <option value="">เลือกอื่นๆ</option>
              {eventData.product && eventData.product.etc && eventData.product.etc.length > 0 ? (
                eventData.product.etc.map((data, index) => (
                  <option key={index} value={data}>{data}</option>
                ))
              ) : (
                <option value="">ไม่มีข้อมูล</option>
              )}
            </Form.Select>
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default Form_step_2;
