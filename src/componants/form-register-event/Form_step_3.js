import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Form_step_3({ formData, setFormData, eventData, setEventData }) {
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveDraft = async () => {
    const userResponse = await fetch('http://localhost:4000/api/userinfo', {
      method: 'GET',
      credentials: 'include', // Include cookies for session-based auth
    });

    if (!userResponse.ok) throw new Error('Failed to fetch user info');

    const userData = await userResponse.json();


    const eventRegisData = {
      user_id: userData._id,
      username: formData.username,
      gender: formData.gender,
      birthDate: formData.birthDate,
      idCardNumber: formData.idCardNumber,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      nationality: formData.nationality,
      bloodType: formData.bloodType,
      chronicDiseases: formData.chronicDiseases,
      address: formData.address,
      subDistrict: formData.subDistrict,
      district: formData.district,
      province: formData.province,
      zipCode: formData.zipCode,
      sportType: formData.sport,
      raceType: formData.raceType,
      registrationFee: formData.registrationFee,
      shirt: formData.shirt,
      shirtSize: formData.shirtSize,
      etc: formData.etc,
      nameShip: formData.nameShip,
      lastNameShip: formData.lastNameShip,
      phoneNumberShip: formData.phoneNumberShip,
      addressShip: formData.addressShip,
      subDistrictShip: formData.subDistrictShip,
      districtShip: formData.districtShip,
      provinceShip: formData.provinceShip,
      zipCodeShip: formData.zipCodeShip,
      datePay: formData.datePay,
      timePay: formData.timePay,

      registrationDate: new Date(),
      paymentSlipDate: formData.datePay,
      paymentSlipTime: formData.timePay,
    };


    try {
      const eventResponse = await axios.post(`http://localhost:4000/api/register/${id}`, eventRegisData);
    } catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <div>
      <Container className='mt-3' fluid style={{
        backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>
        <Row className='mt-3'>
          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ชื่อ</p>
            <Form.Control type="text" placeholder="กรอกชื่อ" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}
              name='nameShip'
              value={formData.nameShip}
              onChange={handleChange}
              onBlur={saveDraft}
            />
          </Col>
          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>สกุล</p>
            <Form.Control type="text" placeholder="กรอกสกุล" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}
              name='lastNameShip'
              value={formData.lastNameShip}
              onChange={handleChange}
              onBlur={saveDraft}
            />
          </Col>
          <Col xl={4} md={4} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>เบอร์โทรศัพท์</p>
            <Form.Control type="text" placeholder="กรอกเบอร์โทรศัพท์" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}
              name='phoneNumberShip'
              value={formData.phoneNumberShip}
              onChange={handleChange}
              onBlur={saveDraft}
            />
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col xl={6} md={12} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ที่อยู่</p>
            <Form.Control type="text" placeholder="กรอกที่อยู่" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}
              name='addressShip'
              value={formData.addressShip}
              onChange={handleChange}
              onBlur={saveDraft}
            />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>ตำบล/แขวง</p>
            <Form.Control type="text" placeholder="กรอกตำบล/แขวง" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}
              name='subDistrictShip'
              value={formData.subDistrictShip}
              onChange={handleChange}
              onBlur={saveDraft}
            />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>อำเภอ/เขต</p>
            <Form.Control type="text" placeholder="กรอกอำเภอ/เขต" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}
              name='districtShip'
              value={formData.districtShip}
              onChange={handleChange}
              onBlur={saveDraft}
            />
          </Col>
        </Row>

        <Row className='mt-3 mb-5'>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>จังหวัด</p>
            <Form.Control type="text" placeholder="กรอกจังหวัด" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}
              name='provinceShip'
              value={formData.provinceShip}
              onChange={handleChange}
              onBlur={saveDraft}
            />
          </Col>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>รหัสไปรษณีย์</p>
            <Form.Control type="text" placeholder="กรอกรหัสไปรษณีย์" style={{
              borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
              backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}
              name='zipCodeShip'
              value={formData.zipCodeShip}
              onChange={handleChange}
              onBlur={saveDraft}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Form_step_3