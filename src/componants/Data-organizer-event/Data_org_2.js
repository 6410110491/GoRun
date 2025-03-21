import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Form, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { FaTrash } from 'react-icons/fa';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import $ from 'jquery';
import 'select2'


function Data_org_2({ formData, setFormData, isEditMode, formRef, validated, setValidated, datePickerValidateStyles,
  competitionDatePickerRef, competitionTimePickerRef, openRegisDatePickerRef, closeRegisDatePickerRef
}) {

  const { t, i18n } = useTranslation()
  const sport_type = ['วิ่ง', 'ว่ายน้ำ', 'ปั่นจักรยาน']

  const province = ['กระบี่', 'กรุงเทพมหานคร', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร',
    'ขอนแก่น',
    'จันทบุรี',
    'ฉะเชิงเทรา',
    'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่',
    'ตรัง', 'ตราด', 'ตาก',
    'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน',
    'บึงกาฬ', 'บุรีรัมย์',
    'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี',
    'พระนครศรีอยุธยา', 'พะเยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่',
    'ภูเก็ต',
    'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน',
    'ยโสธร', 'ยะลา',
    'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี',
    'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย',
    'ศรีสะเกษ',
    'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์',
    'หนองคาย', 'หนองบัวลำภู',
    'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 'อุบลราชธานี']

  // เก็บไฟล์และลิงก์รูปภาพที่จะแสดงตัวอย่าง
  const [previewCoverImage, setPreviewCoverImage] = useState(null); // เก็บลิงก์หรือ URL สำหรับแสดงภาพตัวอย่างภาพปก
  const [previewPrizeImages, setPreviewPrizeImages] = useState([]);
  const [previewBannerImage, setPreviewBannerImage] = useState(null);


  useEffect(() => {
    // สำหรับภาพปก
    if (formData.coverPicture) {
      setPreviewCoverImage(
        typeof formData.coverPicture === "string"
          ? formData.coverPicture
          : URL.createObjectURL(formData.coverPicture)
      );
    }

    // สำหรับภาพรางวัล
    if (formData.reward && Array.isArray(formData.reward)) {
      setPreviewPrizeImages(
        formData.reward.map((file) =>
          typeof file === "string" ? file : URL.createObjectURL(file)
        )
      );
    }

    // สำหรับภาพแบนเนอร์
    if (formData.banner) {
      setPreviewBannerImage(
        typeof formData.banner === "string"
          ? formData.banner
          : URL.createObjectURL(formData.banner)
      );
    }
  }, [formData]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddForm = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      competitionDetails: [
        ...(prevFormData.competitionDetails || []),
        { raceType: '', registrationFee: '', productShippingStatus: false }
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
      newFormArray.pop();
      return {
        ...prevFormData,
        competitionDetails: newFormArray
      };
    });
  };

  const handleFormCheckChange = (index, e) => {
    const { name, checked } = e.target; // ใช้ checked แทน value เพราะเป็น checkbox

    setFormData((prevState) => {
      const updatedCompetitionDetails = [...prevState.competitionDetails];
      updatedCompetitionDetails[index] = {
        ...updatedCompetitionDetails[index],
        [name]: checked, // ใช้ checked เพื่ออัปเดตค่า true/false
      };

      return {
        ...prevState,
        competitionDetails: updatedCompetitionDetails,
      };
    });
  };



  const handleCoverPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewCoverImage(reader.result);
        setFormData((prevFormData) => ({
          ...prevFormData,
          coverPicture: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };



  const handlePrizeChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      const previewUrls = files.map((file) => URL.createObjectURL(file));

      setPreviewPrizeImages((prev) => [...prev, ...previewUrls]);

      setFormData((prevFormData) => ({
        ...prevFormData,
        reward: [...(prevFormData.reward || []), ...files],
      }));
    }
  };




  const handleBannerPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewBannerImage(reader.result);
        setFormData((prevFormData) => ({
          ...prevFormData,
          banner: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };




  // ฟังก์ชันลบรูปภาพตัวอย่าง
  const handleRemoveImage = () => {
    setPreviewCoverImage(null);
    setFormData(prevFormData => ({
      ...prevFormData,
      coverPicture: ""
    }));
  };

  // ฟังก์ชันลบตัวอย่างภาพรางวัล
  const handleRemovePrizeImages = (index) => {
    setPreviewPrizeImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFormData((prevFormData) => ({
      ...prevFormData,
      reward: prevFormData.reward.filter((_, i) => i !== index),
    }));
  };

  // ฟังก์ชันลบตัวอย่างภาพแบนเนอร์
  const handleRemoveBannerImage = () => {
    setPreviewBannerImage(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      banner: null,
    }));
  };

  // Select2 for Province
  $(document).ready(function () {
    $('#single-select-field').select2({
      theme: "bootstrap-5",
      width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
      placeholder: $(this).data('placeholder'),
    });

    $('#single-select-field').change(function () {
      const selectedProvince = $(this).val(); // ดึงค่าที่เลือก
      setFormData({
        ...formData,
        location: selectedProvince
      }) // ส่งค่าที่เลือกไปยัง state
    });
  });



  return (
    <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
      {/* Head */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            {isEditMode ? t('แก้ไขรายละเอียดงาน') : t('รายละเอียดงาน')}
          </p>
        </div>
      </div>

      <Form ref={formRef} noValidate validated={validated}>

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
              <Form.Group as={Row} controlId="formEventName" style={{ paddingInline: "12px" }}>
                <Form.Control
                  type="text"
                  placeholder={t("กรอกชื่องาน")}
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                    backgroundColor: "#fff", height: "40px"
                  }} />
              </Form.Group>
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('ประเภทกีฬา')} <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formSportType" style={{ paddingInline: "12px" }}>
                <Form.Select
                  aria-label="sportType"
                  style={{
                    borderRadius: "10px",
                    marginTop: "-15px",
                    maxWidth: "95%",
                    backgroundColor: "#fff",
                    height: "40px",
                    cursor: "pointer",
                  }}
                  placeholder={t("กรอกประเภทกีฬา")}
                  name='sportType'
                  value={formData.sportType}
                  onChange={handleChange}
                  required
                >
                  <option value="" >{t('เลือกประเภทกีฬา')}</option>
                  {sport_type.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('สถานที่จัดงาน')} <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formLocation">
                <select
                  style={{ width: "95%" }}
                  className="form-select"
                  id="single-select-field"
                  value={formData.location}
                  required
                >
                  <option value="">{t('เลือกจังหวัด')}</option>
                  {province.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('วันที่แข่งขัน')}  <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formCompetitionDate">
                <div style={{ marginTop: "-12px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ padding: "0", marginTop: "-2px", overflow: "unset" }}>
                      <DatePicker
                        slotProps={{ textField: { size: 'small' } }}
                        required={true}
                        ref={competitionDatePickerRef}
                        sx={datePickerValidateStyles("competitionDate")}
                        value={formData.competitionDate ? dayjs(formData.competitionDate) : null}
                        onChange={(dueDate) => setFormData({ ...formData, competitionDate: dueDate })}
                        format="DD/MM/YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col xl={3} md={6} sm={12} className='mt-2'>
              <p>{t('เวลาการแข่งขัน')}  <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formCompetitionTime">
                <div style={{ marginTop: "-12px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']} sx={{ padding: "0", marginTop: "-2px", overflow: "unset" }}>
                      <TimePicker
                        clearable
                        ampm={false}
                        timeSteps={{ minutes: 1 }}
                        slotProps={{ textField: { size: 'small' } }}
                        sx={datePickerValidateStyles("competitionTime")}
                        value={formData.competitionTime ? dayjs(formData.competitionTime) : null}
                        onChange={(dueDate) => setFormData({ ...formData, competitionTime: dueDate })}
                        required={true}
                        ref={competitionTimePickerRef}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </Form.Group>
            </Col>

            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('วันที่เปิดรับสมัคร')}  <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formOpenRegisDate">
                <div style={{ marginTop: "-12px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ padding: "0", marginTop: "-2px", overflow: "unset" }}>
                      <DatePicker
                        slotProps={{ textField: { size: 'small' } }}
                        sx={datePickerValidateStyles("openRegisDate")}
                        value={formData.openRegisDate ? dayjs(formData.openRegisDate) : null}
                        onChange={(dueDate) => setFormData({ ...formData, openRegisDate: dueDate })}
                        format="DD/MM/YYYY"
                        required={true}
                        ref={openRegisDatePickerRef}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </Form.Group>
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('วันที่ปิดรับสมัคร')}  <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formCloseRegisDate">
                <div style={{ marginTop: "-12px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ padding: "0", marginTop: "-2px", overflow: "unset" }}>
                      <DatePicker
                        slotProps={{ textField: { size: 'small' } }}
                        sx={datePickerValidateStyles("closeRegisDate")}
                        value={formData.closeRegisDate ? dayjs(formData.closeRegisDate) : null}
                        onChange={(dueDate) => setFormData({ ...formData, closeRegisDate: dueDate })}
                        format="DD/MM/YYYY"
                        required={true}
                        ref={closeRegisDatePickerRef}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </Form.Group>
            </Col>
            <Col xl={3} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p>{t('จำนวนรับสมัคร')}  <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formMaxRegis" style={{ paddingInline: "12px" }}>
                <Form.Control
                  type="number"
                  placeholder={t("กรอกจำนวนรับสมัคร")}
                  name='maxRegis'
                  value={formData.maxRegis}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                    backgroundColor: "#fff", height: "40px"
                  }} />
              </Form.Group>
            </Col>
          </Row>


          <Row className='mt-3'>
            <div>
              {formData.competitionDetails && formData.competitionDetails.map((formDataItem, index) => (
                <Row className='mt-3' key={index}>
                  <Col xl={3} md={6} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                    <p>{t('ประเภทการแข่งขัน')}  <span className='requiredstar'>*</span></p>
                    <Form.Group as={Row} controlId="formRaceType" style={{ paddingInline: "12px" }}>
                      <Form.Control
                        type="text"
                        placeholder={t("กรอกประเภทการแข่งขัน")}
                        name='raceType'
                        value={formDataItem.raceType}
                        onChange={(e) => handleAddformChange(index, e)}
                        required
                        style={{
                          borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                          backgroundColor: "#fff", height: "40px"
                        }} />
                      <Form.Text id="raceTypeHelpBlock" muted>
                        เช่น Fun Run, Half Marathon, VIP
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col xl={3} md={6} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                    <p>{t('ค่าสมัคร')}  <span className='requiredstar'>*</span></p>
                    <Form.Group as={Row} controlId="formRegistrationFee" style={{ paddingInline: "12px" }}>
                      <Form.Control
                        type="number"
                        placeholder={t("กรอกค่าสมัคร")}
                        name='registrationFee'
                        value={formDataItem.registrationFee}
                        onChange={(e) => handleAddformChange(index, e)}
                        required
                        style={{
                          borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                          backgroundColor: "#fff", height: "40px"
                        }} />
                    </Form.Group>
                  </Col>
                  <Col xl={3} md={6} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column", justifyContent: 'center' }}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="tooltip-productShippingStatus">กรณีไม่ต้องการให้ผู้สมัครเลือกรับสินค้าประเภทแข่งขันดังกล่าวทำเครื่องหมายในช่อง 'ปิดการเลือกสินค้า'</Tooltip>}
                    >
                      <Form.Check
                        type="checkbox"
                        id="productShippingStatus"
                        label={t("ปิดการเลือกสินค้า")}
                        name="productShippingStatus"
                        checked={formData.competitionDetails[index].productShippingStatus || false}
                        onChange={(e) => handleFormCheckChange(index, e)}
                        style={{ paddingInline: "36px" }}
                      />
                    </OverlayTrigger>
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
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          backgroundColor: "red", marginLeft: "1rem", border: "none"
                        }}>
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Row>


          <Row className='mt-5'>
            <Col xl={6} md={6} sm={12} >
              <Col className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ margin: "0" }}>{t('เพิ่มรูปหน้าปก')}  <span className='requiredstar'>*</span></p>
                <Form.Group as={Row} controlId="formCoverPicture" style={{ paddingInline: "12px" }}>
                  <Form.Control
                    accept=".png,.jpg,.jpeg"
                    type='file'
                    onChange={handleCoverPictureChange}
                    required={formData.coverPicture.length === 0}
                  />
                </Form.Group>
              </Col>

              {/* แสดงตัวอย่างรูปภาพ */}
              <Row className="mt-3">
                {previewCoverImage && (
                  <Col xs={6} md={4} lg={3} className="mb-3">
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                      <img
                        src={typeof previewCoverImage === "string" ? previewCoverImage : URL.createObjectURL(previewCoverImage)} // แสดง URL หรือไฟล์
                        alt="Uploaded preview"
                        style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          borderRadius: '50%',
                          border: "none"
                        }}
                        onClick={handleRemoveImage}
                      >
                        &times;
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
            </Col>


            <Col xl={6} md={6} sm={12} className="mt-2">
              <p style={{ margin: "0" }}>{t('เพิ่มรูปปก (ขนาด 970 x 250 พิกเซล)')}</p>
              <Form.Group as={Row} controlId="formBannerPicture" style={{ paddingInline: "12px" }}>
                <Form.Control
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  name="bannerImage"
                  onChange={handleBannerPictureChange}
                />
              </Form.Group>

              {/* แสดงตัวอย่างรูปภาพ */}
              <Row className="mt-3">
                {previewBannerImage && (
                  <Col xs={6} md={4} lg={3} className="mb-3">
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                      <img
                        src={typeof previewBannerImage === "string" ? previewBannerImage : URL.createObjectURL(previewBannerImage)} // แสดง URL หรือไฟล์
                        alt="Uploaded preview"
                        style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          borderRadius: '50%',
                          border: "none"
                        }}
                        onClick={handleRemoveBannerImage}
                      >
                        &times;
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
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
                  borderRadius: "10px", marginTop: "-15px",
                  backgroundColor: "#fff", height: "100%"
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
                  borderRadius: "10px", marginTop: "-15px",
                  backgroundColor: "#fff", height: "100%"
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
                  borderRadius: "10px", marginTop: "-15px",
                  backgroundColor: "#fff", height: "100%"
                }} />
            </Col>
            <Col xl={6} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ margin: "0" }}>{t('เพิ่มรูปรางวัล (เพิ่มได้มากกว่า 1)')}  <span className='requiredstar'>*</span></p>
              <Form.Group as={Row} controlId="formPrizePicture" style={{ paddingInline: "12px" }}>
                <Form.Control
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  multiple
                  name="prizeImages"
                  onChange={handlePrizeChange}
                  required={formData.reward.length === 0}
                />
              </Form.Group>

              {/* แสดงตัวอย่างรูปภาพ */}
              <Row className="mt-3">
                {previewPrizeImages &&
                  previewPrizeImages
                    .filter((image) => typeof image === "string" ? image.trim() !== "" : true) // กรอง string ที่ไม่ใช่ค่าว่าง
                    .map((image, index) => (
                      <Col xs={6} md={4} lg={3} className="mb-3" key={index}>
                        <div style={{ position: "relative", textAlign: "center" }}>
                          <img
                            src={typeof image === "string" ?
                              image :
                              URL.createObjectURL(image)} // ตรวจสอบชนิดข้อมูลก่อน
                            alt={`Uploaded preview ${index}`}
                            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              borderRadius: "50%",
                              border: "none"
                            }}
                            onClick={() => handleRemovePrizeImages(index)}
                          >
                            &times;
                          </Button>
                        </div>
                      </Col>
                    ))}
              </Row>




            </Col>
          </Row>
        </Container>
      </Form>
    </Container >



  )
}


export default Data_org_2
