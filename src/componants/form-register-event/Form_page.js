import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'
import ScrollToTop from 'react-scroll-to-top'
import Form_step_1 from './Form_step_1'
import Form_step_2 from './Form_step_2'
import Form_step_3 from './Form_step_3'
import Form_step_4 from './Form_step_4'
import Form_page_success from './Form_page_success'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next';

function Form_page() {
  let slipFile = null;
  const { t, i18n } = useTranslation()
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);

  const birthDatePickerRef = useRef(null);
  const payDatePickerRef = useRef(null);
  const payTimePickerRef = useRef(null);


  const steps = [
    t('ข้อมูลผู้สมัคร'),
    t('ประเภทแข่งขัน/สินค้า'),
    t('ที่อยู่การจัดส่ง'),
    t('ชำระเงิน'),
  ];
  const stepStyle = {
    padding: 2,
    "& .Mui-active": {
      "& .MuiStepIcon-root": {
        color: "#F3C710",
        fontSize: "2rem",
      },
      "& .MuiStepConnector-line": {
        borderColor: "#F3C710",
      }
    },
    "& .Mui-completed": {
      "& .MuiStepIcon-root": {
        color: "#F3C710",
        fontSize: "2rem",
      },
      "& .MuiStepConnector-line": {
        borderColor: "#F3C710",
      }
    }
  };

  const { id } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [formInfo, setFormInfo] = useState(null);



  const [eventData, setEventData] = useState();
  const [formData, setFormData] = useState({
    //Start Page 1
    profilePicture: '',
    username: '',
    gender: '',
    birthDate: '',
    idCardNumber: '',
    email: '',
    phoneNumber: '',
    nationality: '',
    bloodType: '',
    chronicDiseases: '',


    address: '',
    subDistrict: '',
    district: '',
    province: '',
    zipCode: '',
    // End Page 1

    // Start Page 2
    sportType: eventData?.sportType,
    raceType: '',
    registrationFee: '',
    shirt: '',
    shirtSize: '',
    etc: '',
    // End Page 2

    // Start Page 3
    shippingChoice: '',
    nameShip: '',
    lastNameShip: '',
    phoneNumberShip: '',
    addressShip: '',
    subDistrictShip: '',
    districtShip: '',
    provinceShip: '',
    zipCodeShip: '',

    // End Page 3

    // Start Page 4
    slipImage: '',
    datePay: '',
    timePay: '',
    // End Page 4
  });

  const datePickerValidateStyles = (fieldKey) => ({
    width: "95%",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: validated && formData[fieldKey] === "" ? "#dc3545" : "none",
      "&:hover": {
        borderColor: validated && formData[fieldKey] === "" ? "#dc3545" : "none",
      },
      "&:focus": {
        borderColor: validated && formData[fieldKey] === "" ? "#dc3545" : "none",
        boxShadow:
          validated && formData[fieldKey] === ""
            ? "0 0 0 .25rem rgba(220, 53, 69, .25)"
            : "0 0 0 .25rem rgba(13, 110, 253, .25)",
      },
      borderRadius: "10px",
      backgroundImage:
        validated && formData[fieldKey] === ""
          ? `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`
          : "none",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 2.25rem center, center right 2.25rem",
      backgroundSize: "18px 18px",
    },
    "& .MuiOutlinedInput-root": {
      borderColor: validated && formData[fieldKey] === "" ? "#dc3545" : "none",
      borderRadius: "10px",
    },
    "& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
      borderColor: validated && formData[fieldKey] === "" ? "#dc3545" : "none",
      borderRadius: "10px",
    },
    "& .MuiPickersDay-root.Mui-selected": {
      borderColor: validated && formData[fieldKey] === "" ? "#dc3545" : "none",
    },
  });


  const componants = [
    <Form_step_1 formData={formData} setFormData={setFormData}
      loading={loading} setLoading={setLoading}
      error={error} setError={setError}
      eventData={eventData} setEventData={setEventData}
      userInfo={userInfo}
      formRef={formRef}
      validated={validated}
      setValidated={setValidated}
      birthDatePickerRef={birthDatePickerRef}
      datePickerValidateStyles={datePickerValidateStyles}
    />,
    <Form_step_2 formData={formData} setFormData={setFormData}
      loading={loading} setLoading={setLoading}
      error={error} setError={setError}
      eventData={eventData} setEventData={setEventData}
      formRef={formRef}
      validated={validated}
      setValidated={setValidated}
    />,
    <Form_step_3 formData={formData} setFormData={setFormData}
      loading={loading} setLoading={setLoading}
      error={error} setError={setError}
      eventData={eventData} setEventData={setEventData}
      formRef={formRef}
      validated={validated}
      setValidated={setValidated}
    />,
    <Form_step_4 formData={formData} setFormData={setFormData}
      loading={loading} setLoading={setLoading}
      error={error} setError={setError}
      eventData={eventData} setEventData={setEventData}
      slipFile={slipFile}
      datePickerValidateStyles={datePickerValidateStyles}
      formRef={formRef}
      validated={validated}
      setValidated={setValidated}
      payDatePickerRef={payDatePickerRef}
      payTimePickerRef={payTimePickerRef}
    />
  ]

  const formatDate = (date) => {
    if (!date) return '';

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const changepage = (path) => {
    window.location.href = '/' + path;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = formRef.current;

    if (!formData.birthDate || formData.birthDate === "") {
      const birthDateInput = birthDatePickerRef.current?.querySelector('input');
      if (birthDateInput) {
        birthDateInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        birthDateInput.focus();
        setValidated(true);
      }
      return;
    }

    if (form && form.checkValidity() === false) {
      const firstInvalidField = form.querySelector(':invalid');
      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidField.focus();
        setValidated(true);
        return;
      }
    }

    if (activeStep === 3) {
      if (!formData.datePay || formData.datePay === "" || !formData.timePay || formData.timePay === "") {

        const payDatePicker = payDatePickerRef.current?.querySelector('input');
        const payTimePicker = payTimePickerRef.current?.querySelector('input');

        if (payDatePicker) {
          payDatePicker.scrollIntoView({ behavior: 'smooth', block: 'center' });
          payDatePicker.focus();
          setValidated(true);
        } else if (payTimePicker) {
          payTimePicker.scrollIntoView({ behavior: 'smooth', block: 'center' });
          payTimePicker.focus();
          setValidated(true);
        }
        return;
      }
    }

    // ไปยังขั้นตอนถัดไป
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setValidated(false); // รีเซ็ตสถานะ validated  

    if (activeStep === 3) {
      setLoading(true);
      try {
        const uploadFile = async (file) => {
          const formDataForImage = new FormData();
          formDataForImage.append('image', file);

          const uploadImageResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/images_upload`, {
            method: 'POST',
            credentials: 'include', // รวมคุกกี้สำหรับการตรวจสอบสิทธิ์แบบเซสชัน
            body: formDataForImage,
          });

          if (!uploadImageResponse.ok) {
            throw new Error('Failed to upload image');
          }

          const uploadResponse = await uploadImageResponse.json();
          return uploadResponse.url; // ส่งกลับ URL ของรูปภาพที่อัปโหลด
        };

        const processSingleFile = async (file) => {
          if (!file) return ''; // ตรวจสอบว่าไฟล์มีอยู่หรือไม่

          try {
            const url = await uploadFile(file);
            return url;
          } catch (error) {
            console.error('Error uploading file:', error);
            return ''; // ส่งคืนค่าที่ว่างหากเกิดข้อผิดพลาด
          }
        };

        const slipFileUrls = await processSingleFile(formData.slipImage);

        const newStatus = slipFileUrls ? "pending" : "pending payment";


        // Prepare event data including the uploaded image URLs
        const eventRegisData = {
          user_id: userInfo._id,
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
          slipImage: slipFileUrls,
          datePay: formData.datePay,
          timePay: formData.timePay,

          status: newStatus,

          registrationDate: new Date(),
          paymentSlipDate: formData.datePay,
          paymentSlipTime: formData.timePay,

          shippingChoice: formData.shippingChoice
        };

        // Send event data to the server to create a new event
        const eventResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/register/${id}`, eventRegisData);


        if (eventResponse.status === 201) {
          setLoading(false); // หยุดการโหลดเมื่อเสร็จสิ้น
        }


      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }

    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      window.history.back();
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const fetchEventInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setEventData(data);
        } else {
          throw new Error('Failed to fetch events info');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventInfo();
  }, []); // Add history to dependencies to avoid warnings

  useEffect(() => {
    setLoading(true);

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/userinfo`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          changepage('login');
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          await fetchFormInfo(data._id);
        } else {
          throw new Error('Failed to fetch user info');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFormInfo = async (userId) => {
      try {
        const formResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/register/${id}/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (formResponse.ok) {
          const formData = await formResponse.json();


          setLoading(true)
          // ทำการตั้งค่า setFormInfo ก่อน
          setFormInfo(formData);

          // รอให้ setFormInfo ทำงานเสร็จก่อน จากนั้นค่อยทำ setFormData
          setFormData(() => ({
            profilePicture: formData.profilePicture || userInfo?.personalInfo?.profilePicture,
            username: formData.username || userInfo?.username,
            gender: formData.gender || userInfo?.personalInfo?.gender,
            birthDate: formData.birthDate || userInfo?.personalInfo?.birthDate,
            idCardNumber: formData.idCardNumber || userInfo?.personalInfo?.idCardNumber,
            email: formData.email || userInfo?.email,
            phoneNumber: formData.phoneNumber || userInfo?.personalInfo?.phoneNumber,
            nationality: formData.nationality || userInfo?.personalInfo?.nationality,
            bloodType: formData.bloodType || userInfo?.personalInfo?.bloodType,
            chronicDiseases: formData.chronicDiseases || userInfo?.personalInfo?.chronicDiseases?.join(', '),

            address: formData.address || userInfo?.address?.address,
            subDistrict: formData.subDistrict || userInfo?.address?.subDistrict,
            district: formData.district || userInfo?.address?.district,
            province: formData.province || userInfo?.address?.province,
            zipCode: formData.zipCode || userInfo?.address?.postalCode,

            sportType: formData.sportType || eventData?.sportType || '',
            raceType: formData.raceType || '',
            registrationFee: formData.registrationFee || '',
            shirt: formData.shirt || '',
            shirtSize: formData.shirtSize || '',
            etc: formData.etc || '',
            nameShip: formData.nameShip || '',
            lastNameShip: formData.lastNameShip || '',
            phoneNumberShip: formData.phoneNumberShip || '',
            addressShip: formData.addressShip || '',
            subDistrictShip: formData.subDistrictShip || '',
            districtShip: formData.districtShip || '',
            provinceShip: formData.provinceShip || '',
            zipCodeShip: formData.zipCodeShip || '',
            slipImage: formData.slipImage || '',
            datePay: formData.datePay || '',
            timePay: formData.timePay || '',

            shippingChoice: formData.shippingChoice
          }));




        } else {
          throw new Error('Failed to fetch form info');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false)
      }
    };

    fetchUserInfo();
  }, []);


  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
          {/* Title */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ fontSize: "2rem", fontWeight: "550" }}>
              {eventData?.eventName}
            </p>
          </div>

          <Row className='mt-3' style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <Col md={12} xl={8} style={{ marginBottom: "3rem" }}>
              <div style={{ padding: "0", width: "100%", height: "402px" }}>
                <img style={{
                  width: "100%", height: "402px",
                }} src={eventData?.coverPicture} alt="Image" />
              </div>
            </Col>

            <Col md={12} xl={4}>
              <Container fluid style={{
                backgroundColor: "#E3E3E3", minHeight: "180px", padding: "0",
                borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }}>
                <Container className='mb-2' fluid style={{
                  backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                  display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                  {eventData?.eventName}
                </Container>

                <p className='ms-3'>{t('สถานที่')} : {eventData?.location}</p>
                <p className='ms-3'>{t('วันที่')} : {formatDate(eventData?.eventDate)} </p>
                <p className='ms-3'>{t('ผู้จัดงาน')} : {eventData.organization ? eventData.organization : eventData.owner[0].username} </p>

              </Container>
            </Col>
          </Row>

          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} sx={stepStyle}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <Form_page_success loading={loading} setLoading={setLoading} />
            ) : (
              <React.Fragment>
                <Form onSubmit={handleNext}>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    {componants.map((data, index) => {
                      return (
                        <div key={index}>
                          {activeStep === index && data}
                        </div>
                      )
                    })
                    }
                  </Typography>
                </Form>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    onClick={handleBack}
                    style={{ backgroundColor: "#47474A", border: 'none', borderRadius: '10px', width: '15%' }}
                  >
                    {t('ย้อนกลับ')}
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    onClick={handleNext}
                    disabled={loading}
                    style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: '15%' }}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : (activeStep === steps.length - 1 ? t('เสร็จสิ้น') : t('ถัดไป'))}
                  </Button>


                </Box>
              </React.Fragment>
            )}
          </Box>


        </Container>
      )}
    </div>
  )
}

export default Form_page