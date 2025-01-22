import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Form_step_3({ formData, setFormData, eventData, setEventData }) {
  const { id } = useParams();
  const { t, i18n } = useTranslation()

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

      shippingChoice: formData.shippingChoice
    };


    try {
      const eventResponse = await axios.post(`http://localhost:4000/api/register/${id}`, eventRegisData);
      console.log(eventResponse)
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
        <Row>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('ช่องทางการรับสินค้า')}</p>
            <Form.Group>
              <Row>
                {eventData.shippingStatus && (
                  <Col xl={4} md={6} sm={12} className="mt-2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Check
                      type="radio"
                      id="shipping"
                      label={t("จัดส่งสินค้า")}
                      name="shippingChoice" // ชื่อเดียวกันสำหรับ radio group
                      value="shipping"
                      onChange={handleChange}
                      onBlur={saveDraft}
                      checked={formData.shippingChoice === "shipping"} // ตรวจสอบค่าที่เลือก
                    />
                  </Col>
                )}
                {eventData.onsiteStatus && (
                  <Col xl={4} md={6} sm={12} className="mt-2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Check
                      type="radio"
                      id="onsite"
                      label={t("รับสินค้าหน้างาน")}
                      name="shippingChoice" // ชื่อเดียวกันสำหรับ radio group
                      value="onsite"
                      onChange={handleChange}
                      onBlur={saveDraft}
                      checked={formData.shippingChoice === "onsite"} // ตรวจสอบค่าที่เลือก
                    />
                  </Col>
                )}
              </Row>
            </Form.Group>
          </Col>
        </Row>

        {formData.shippingChoice === 'shipping' ? (
          <>
            <Row className='mt-3'>
              <Col xl={4} md={4} sm={12} className='mt-2'
                style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p>{t('ชื่อ')}</p>
                <Form.Control type="text" placeholder={t("กรอกชื่อ")} style={{
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
                <p>{t('สกุล')}</p>
                <Form.Control type="text" placeholder={t("กรอกสกุล")} style={{
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
                <p>{t('เบอร์โทรศัพท์')}</p>
                <Form.Control type="text" placeholder={t("กรอกเบอร์โทรศัพท์")} style={{
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
                <p>{t('ที่อยู่')}</p>
                <Form.Control type="text" placeholder={t("กรอกที่อยู่")} style={{
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
                <p>{t('ตำบล/แขวง')}</p>
                <Form.Control type="text" placeholder={t("กรอกตำบล/แขวง")} style={{
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
                <p>{t('อำเภอ/เขต')}</p>
                <Form.Control type="text" placeholder={t("กรอกอำเภอ/เขต")} style={{
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
                <p>{t('จังหวัด')}</p>
                <Form.Control type="text" placeholder={t("กรอกจังหวัด")} style={{
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
                <p>{t('รหัสไปรษณีย์')}</p>
                <Form.Control type="text" placeholder={t("กรอกรหัสไปรษณีย์")} style={{
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
          </>) : null}
      </Container>
    </div>
  )
}

export default Form_step_3