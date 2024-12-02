import React from 'react'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { FaTrash } from 'react-icons/fa';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';


function Data_org_2({ formData, setFormData, prizeFile, coverPictureFile, BannerFile }) {

  const { t, i18n } = useTranslation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddForm = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      competitionDetails: [
        ...(prevFormData.competitionDetails || []), // ตรวจสอบว่ามีค่าไหม ถ้าไม่มีให้เป็น array ว่าง
        { raceType: '', fee: '' }
      ]
    }));
  };

  const handleAddformChange = (index, e) => {
    const { name, value } = e.target;
    const newCompetitionDetails = [...formData.competitionDetails];
    newCompetitionDetails[index][name] = value;
    setFormData({
      ...formData,
      competitionDetails: newCompetitionDetails
    });
  };

  const handleRemoveForm = () => {
    setFormData(prevFormData => {
      const newFormArray = [...prevFormData.competitionDetails];
      newFormArray.pop(); // ลบฟอร์มตัวสุดท้ายออก
      return {
        ...prevFormData,
        competitionDetails: newFormArray // ตั้งค่าให้เป็นอาร์เรย์ ไม่ใช่อ็อบเจ็กต์
      };
    });
  };


  const handlePrizeChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const fileContents = await Promise.all(
        files.map((file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
        )
      );
      setFormData({ ...formData, reward: files });
      prizeFile = files; // เก็บไฟล์ลงในตัวแปร prizeFile
    }
  };

  const handleCoverPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setFormData({ ...formData, coverPicture: file });
      coverPictureFile = file;
    }
  };

  const handleBannerPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setFormData({ ...formData, banner: file });
      BannerFile = file;
    }
  };


  return (
    <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
      {/* Head */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            {t('รายละเอียดงาน')}
          </p>
        </div>
      </div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

      <Container className='mt-5' fluid style={{
        minHeight: "100vh",
        backgroundColor: "#E3E3E3", padding: "1rem 2rem 1rem 2rem",
        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>
        <Row>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('ชื่องาน')} <span className='requiredstar'>*</span> </p>
            <Form.Control
              type="text"
              placeholder={t("กรอกชื่องาน")}
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('ประเภทกีฬา')} <span className='requiredstar'>*</span></p>
            <Form.Control
              type="text"
              placeholder={t("กรอกประเภทกีฬา")}
              name='sportType'
              value={formData.sportType}
              onChange={handleChange}
              required
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('สถานที่จัดงาน')} <span className='requiredstar'>*</span></p>
            <Form.Control
              type="text"
              placeholder={t("กรอกสถานที่จัดงาน")}
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('วันที่แข่งขัน')}</p>
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
                    value={formData.competitionDate ? dayjs(formData.competitionDate) : null}
                    onChange={(dueDate) => setFormData({ ...formData, competitionDate: dueDate })}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col xl={3} md={6} sm={12} className='mt-2'>
            <p>{t('เวลาการแข่งขัน')}</p>
            <div style={{ marginTop: "-12px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker
                    clearable
                    ampm={false}
                    timeSteps={{ minutes: 1 }}
                    slotProps={{ textField: { size: 'small' } }}
                    sx={{
                      width: '95%',
                      backgroundColor: "#FFF",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& MuiInputBase-root": { border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }
                    }}
                    value={formData.competitionTime ? dayjs(formData.competitionTime) : null}
                    onChange={(dueDate) => setFormData({ ...formData, competitionTime: dueDate })}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Col>

          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('วันที่เปิดรับสมัคร')}</p>
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
                    value={formData.openRegisDate ? dayjs(formData.openRegisDate) : null}
                    onChange={(dueDate) => setFormData({ ...formData, openRegisDate: dueDate })}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('วันที่ปิดรับสมัคร')}</p>
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
                    value={formData.closeRegisDate ? dayjs(formData.closeRegisDate) : null}
                    onChange={(dueDate) => setFormData({ ...formData, closeRegisDate: dueDate })}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Col>
          <Col xl={3} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('จำนวนรับสมัคร')}</p>
            <Form.Control
              type="number"
              placeholder={t("กรอกจำนวนรับสมัคร")}
              name='maxRegis'
              value={formData.maxRegis}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
        </Row>


        <Row className='mt-3'>
          <div>
            {formData.competitionDetails && formData.competitionDetails.map((formDataItem, index) => (
              <Row className='mt-3' key={index}>
                <Col xl={3} md={6} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                  <p>{t('ประเภทการแข่งขัน')}</p>
                  <Form.Control
                    type="text"
                    placeholder={t("กรอกประเภทการแข่งขัน")}
                    name='raceType'
                    value={formDataItem.raceType}
                    onChange={(e) => handleAddformChange(index, e)}
                    style={{
                      borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                      backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                    }} />
                  <Form.Text id="raceTypeHelpBlock" muted>
                    เช่น Fun Run, Half Marathon, VIP
                  </Form.Text>
                </Col>
                <Col xl={3} md={6} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                  <p>{t('ค่าสมัคร')}</p>
                  <Form.Control
                    type="number"
                    placeholder={t("กรอกค่าสมัคร")}
                    name='fee'
                    value={formDataItem.fee}
                    onChange={(e) => handleAddformChange(index, e)}
                    style={{
                      borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                      backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                    }} />
                </Col>
              </Row>
            ))}
            <Row className='mt-1'>
              <Col xl={6} md={12} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Button className="mt-3" onClick={handleAddForm}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "none", borderRadius: "10px", width: "fit-content", padding: "10px"
                    }}>
                    {t('เพิ่มประเภทการแข่งขัน')}
                  </Button>
                  {formData.competitionDetails?.length > 0 && (
                    <Button className="mt-3" onClick={handleRemoveForm}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "red", marginLeft: "1rem" }}>
                      <FaTrash />
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Row>


        <Row className='mt-5'>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ margin: "0" }}>{t('เพิ่มรูปหน้าปก')}</p>
            <Form.Group controlId='formprizePicture'>
              <Form.Control
                accept=".png,.jpg,.jpeg,"
                type='file'
                multiple
                name='image'
                rows={3}
                placeholder={t('เลือกรูปหน้าปก')}
                onChange={handleCoverPictureChange}
              />
            </Form.Group>
          </Col>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ margin: "0" }}>{t('เพิ่มรูปปก (ขนาด 970 x 250 พิกเซล)')}</p>
            <Form.Group controlId='formprizePicture'>
              <Form.Control
                accept=".png,.jpg,.jpeg,"
                type='file'
                multiple
                name='image'
                rows={3}
                placeholder={t('เลือกรูปปกแบนเนอร์')}
                onChange={handleBannerPictureChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('ข้อมูลทั่วไป')}</p>
            <Form.Control
              as="textarea"
              rows={3}
              name='generalInfo'
              value={formData.generalInfo}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('วัตถุประสงค์')}</p>
            <Form.Control
              as="textarea"
              rows={3}
              name='purpose'
              value={formData.purpose}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>{t('ความน่าสนใจของงาน')}</p>
            <Form.Control
              as="textarea"
              rows={3}
              name='interesting'
              value={formData.interesting}
              onChange={handleChange}
              style={{
                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }} />
          </Col>
          <Col xl={6} md={6} sm={12} className='mt-2'
            style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ margin: "0" }}>{t('รางวัล')}</p>
            <Form.Group controlId='formprizePicture'>
              <Form.Control
                accept=".png,.jpg,.jpeg,"
                type='file'
                multiple
                name='image'
                rows={3}
                placeholder='รูปรางวัล'
                onChange={handlePrizeChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>

    </Container >



  )
}


export default Data_org_2
