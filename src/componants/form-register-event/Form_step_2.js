import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Form_step_2({ formData, setFormData, loading, setLoading, error, setError, eventData, setEventData, formRef, validated }) {
  const { id } = useParams();
  const [selectedRaceIndex, setSelectedRaceIndex] = useState(''); // กำหนดค่าเริ่มต้นเป็น ''

  const { t, i18n } = useTranslation()

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

      // registrationDate: new Date(),
      paymentSlipDate: formData.datePay,
      paymentSlipTime: formData.timePay,

      shippingChoice: formData.shippingChoice
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
        backgroundColor: "#E3E3E3", minHeight: "260px", padding: "1rem 2rem 1rem 2rem",
        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>
        <Form ref={formRef} noValidate validated={validated}>
          <Row>
            <Col className='ms-5' style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "1rem" }}>
              <p style={{ fontSize: "1.2rem", borderBottom: "5px solid #47474A", width: "fit-content" }}>{t('ประเภทการสมัคร')}</p>
            </Col>
          </Row>

          <Row>
            <Col xl={4} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ประเภทกีฬา')} </p>
              <Form.Control type='text'
                name='sportType'
                value={formData.sportType || ''}
                onChange={handleChange}
                onBlur={saveDraft}
                disabled
                placeholder={t('กรอกประเภทกีฬา')}
                required
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", height: "40px"
                }} />
            </Col>

            <Col xl={4} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ประเภทการแข่งขัน')} <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formRaceType" style={{ paddingInline: "12px" }}>
                <Form.Select
                  value={selectedRaceIndex}
                  onChange={handleRaceTypeChange}
                  onBlur={saveDraft}
                  required
                  name='raceType'
                  style={{
                    borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                    backgroundColor: "#fff", height: "40px",
                    cursor: "pointer"
                  }}>
                  <option value="">{t('เลือกประเภทการแข่งขัน')}</option>
                  {eventData.competitionDetails && eventData.competitionDetails.length > 0 ? (
                    eventData.competitionDetails.map((data, index) => (
                      <option key={index} value={index}>
                        {data.raceType}
                      </option>
                    ))
                  ) : (
                    <option value="">{t('ไม่มีข้อมูล')}</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xl={4} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ค่าสมัคร')}(THB)</p>
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
                  backgroundColor: "#fff", height: "40px",
                }}
              />
            </Col>
          </Row>

          {/* สินค้า */}
          <Row>
            <Col className='ms-5' style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "1rem" }}>
              <p style={{ fontSize: "1.2rem", borderBottom: "5px solid #47474A", width: "fit-content" }}>{t('สินค้า')}</p>
            </Col>
          </Row>

          <Row className='mt-3 mb-5'>
            <Col xl={4} md={4} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ประเภทเสื้อ')} <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formShirt" style={{ paddingInline: "12px" }}>
                <Form.Select
                  aria-label="Default select example"
                  value={formData.shirt || ''}
                  name='shirt'
                  onChange={handleChange}
                  onBlur={saveDraft}
                  required
                  style={{
                    borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                    backgroundColor: "#fff", height: "40px",
                    cursor: "pointer"
                  }}>

                  <option value="">{t('เลือกประเภทเสื้อ')}</option>
                  {eventData.product && eventData.product.shirt && eventData.product.shirt.length > 0 ? (
                    eventData.product.shirt.map((data, index) => (
                      <option key={index} value={data}>{data}</option>
                    ))
                  ) : (
                    <option value="">{t('ไม่มีข้อมูล')}</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xl={4} md={4} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ขนาดเสื้อ')} <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formShirtSize" style={{ paddingInline: "12px" }}>
                <Form.Select
                  aria-label="Default select example"
                  value={formData.shirtSize || ''}
                  name='shirtSize'
                  onChange={handleChange}
                  onBlur={saveDraft}
                  required
                  style={{
                    borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                    backgroundColor: "#fff", height: "40px",
                    cursor: "pointer"
                  }}>
                  <option value="">{t('เลือกขนาดเสื้อ')}</option>
                  {eventData.product && eventData.product.shirtsize && eventData.product.shirtsize.length > 0 ? (
                    eventData.product.shirtsize.map((data, index) => (
                      <option key={index} value={data}>{data}</option>
                    ))
                  ) : (
                    <option value="">{t('ไม่มีข้อมูล')}</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xl={4} md={4} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('อื่นๆ')}</p>
              <Form.Select
                aria-label="Default select example"
                value={formData.etc || ''}
                name='etc'
                onChange={handleChange}
                onBlur={saveDraft}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", height: "40px",
                  cursor: "pointer"
                }}>
                <option value="">{t('เลือกอื่นๆ')}</option>
                {eventData.product && eventData.product.etc && eventData.product.etc.length > 0 ? (
                  eventData.product.etc.map((data, index) => (
                    <option key={index} value={data}>{data}</option>
                  ))
                ) : (
                  <option value="">{t('ไม่มีข้อมูล')}</option>
                )}
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </Container>
    </div >
  )
}

export default Form_step_2;
