import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Form, } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

function Data_org_1({ formData, setFormData }) {
  const gender = ["ชาย", "หญิง", "อื่นๆ",]
  const blood_group = ["A", "B", "AB", "O"]
  const { t, i18n } = useTranslation()

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const changepage = (path) => {
    window.location.href = '/' + path;
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/userinfo', {
          method: 'GET',
          credentials: 'include', // Include cookies for session-based auth
        });

        if (response.status === 401) {
          // Redirect to login if not authenticated
          changepage('login'); // Adjust the path as necessary
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          throw new Error('Failed to fetch user info');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []); // Add history to dependencies to avoid warnings

  useEffect(() => {
    if (userInfo) {
      setFormData((prevData) => ({
        ...prevData,
        organization: userInfo.organization || '',
        profilePicture: userInfo.personalInfo?.profilePicture || '',
        username: userInfo.username || '',
        gender: userInfo.personalInfo?.gender || '',
        birthDate: userInfo.personalInfo?.birthDate || '',
        idCardNumber: userInfo.personalInfo?.idCardNumber || '',
        email: userInfo.email || '',
        phoneNumber: userInfo.personalInfo?.phoneNumber || '',
        nationality: userInfo.personalInfo?.nationality || '',
        bloodType: userInfo.personalInfo?.bloodType || '',
        chronicDiseases: userInfo.personalInfo?.chronicDiseases?.join(', ') || '',

        address: userInfo.address?.address || '',
        subDistrict: userInfo.address?.subDistrict || '',
        district: userInfo.address?.district || '',
        province: userInfo.address?.province || '',
        zipCode: userInfo.address?.postalCode || '',
      }));
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
      {/* Head */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            {t('ข้อมูลผู้จัดงาน')}
          </p>
        </div>
      </div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : userInfo ? (

        <Container className='mt-5' fluid style={{
          minHeight: "100vh",
          backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
        }}>

          <div style={{ width: "15%", textAlign: 'center' }}>
            <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
              {t('ข้อมูลทั่วไป')}
            </p>
          </div>

          <Row>
            <Col xl={4} md={12} sm={12} className='mt-2'
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={userInfo.personalInfo?.profilePicture || require('../../image/blank_profile_image.png')}
                alt='logo.jpg'
                style={{ width: "100px", height: "100px", borderRadius: "100%" }}
              />
              <p className='ms-3'>{t('รูปภาพประจำตัว')}</p>
            </Col>
            <Col xl={4} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ชื่อองค์กร/หน่วยงาน')} <span className='requiredstar'>*</span></p>
              <Form.Control type='text'
                name='organization'
                value={formData.organization}
                onChange={handleChange}
                placeholder={t('กรอกชื่อองค์กร/หน่วยงาน')}
                required
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>

            <Col xl={4} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ชื่อ-สกุล')}</p>
              <Form.Control type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                placeholder={t('กรอกชื่อ')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>

          </Row>

          <Row className='mt-3'>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('เพศ')}</p>
              <Form.Select aria-label="Default select example"
                type='text'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                placeholder={t('กรอกเพศ')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  cursor: "pointer"
                }}
                defaultValue={formData.gender} // ตั้งค่า default value
              >
                <option value="">{t('ไม่ระบุ')}</option>
                {gender.map((data, index) => (
                  <option key={index} value={data}>{data}</option> // ใช้ value ที่เป็นค่า gender จริงๆ
                ))}
              </Form.Select>

            </Col>

            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('วันเดือนปีเกิด')}</p>
              <div style={{ marginTop: "-12px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']} >
                    <DatePicker
                      slotProps={{ textField: { size: 'small' } }}
                      sx={{
                        width: '95%',
                        backgroundColor: "#FFF",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                        "& MuiInputBase-root": { border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }
                      }}
                      value={formData.birthDate ? dayjs(formData.birthDate) : null}
                      onChange={(dueDate) => setFormData({ ...formData, birthDate: dueDate })}
                      format="DD/MM/YYYY"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('เลขบัตรประชาชน')}</p>
              <Form.Control type='text'
                name='idCardNumber'
                value={formData.idCardNumber}
                onChange={handleChange}
                placeholder={t('กรอกเลขบัตรประชาชน')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('อีเมล')}</p>
              <Form.Control type='email'
                name='email'
                value={formData.email}
                readOnly
                disabled
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>
          </Row>


          <Row className='mt-3 mb-5'>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('เบอร์โทรศัพท์')}</p>
              <Form.Control type='text'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder={t('กรอกเบอร์โทรศัพท์')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('สัญชาติ')}</p>
              <Form.Control
                type='text'
                name='nationality'
                value={formData.nationality}
                onChange={handleChange}
                placeholder={t('กรอกสัญชาติ')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('หมู่โลหิต')}</p>
              <Form.Select aria-label="Default select example" style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer"
              }}
                defaultValue={formData.bloodType} // ตั้งค่า default value
                onChange={handleChange}
                value={formData.bloodType}
              >
                <option value="">{t('ไม่ระบุ')}</option>
                {blood_group.map((data, index) => (
                  <option key={index} value={data}>{data}</option> // ใช้ value ที่เป็นค่า gender จริงๆ
                ))}
              </Form.Select>
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('โรคประจำตัว')}</p>
              <Form.Control
                type='text'
                name='chronicDiseases'
                value={formData.chronicDiseases}
                onChange={handleChange}
                placeholder={t('กรอกโรคประจำตัว')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>
          </Row>



          <div style={{ width: "15%", textAlign: 'center' }}>
            <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
              {t('ที่อยู่ปัจจุบัน')}
            </p>
          </div>

          <Row>
            <Col xl={6} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ที่อยู่')}</p>
              <Form.Control
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                placeholder={t('กรอกที่อยู่')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ตำบล/แขวง')}</p>
              <Form.Control
                type='text'
                name='subDistrict'
                value={formData.subDistrict}
                onChange={handleChange}
                placeholder={t('กรอกตำบล/แขวง')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>

            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('อำเภอ/เขต')}</p>
              <Form.Control
                type='text'
                name='district'
                value={formData.district}
                onChange={handleChange}
                placeholder={t('อำเภอ/เขต')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>

          </Row>
          <Row className='mt-3'>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('จังหวัด')}</p>
              <Form.Control type='text'
                name='province'
                value={formData.province}
                onChange={handleChange}
                placeholder={t('จังหวัด')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('รหัสไปรษณีย์')}</p>
              <Form.Control
                type='text'
                name='zipCode'
                value={formData.zipCode}
                onChange={handleChange}
                placeholder={t('กรอกรหัสไปรษณีย์')}
                style={{
                  borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                  backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }} />
            </Col>
          </Row>

        </Container>
      ) : (
        <p>{t('ไม่พบข้อมูล')}</p>
      )}
    </Container>
  )
}


export default Data_org_1
