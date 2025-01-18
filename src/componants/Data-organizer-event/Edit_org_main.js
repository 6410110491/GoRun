import React, { useEffect, useRef, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'

import Data_org_1 from './Data_org_1'
import Data_org_2 from './Data_org_2'
import Data_org_3 from './Data_org_3'
import Data_org_4 from './Data_org_4'
import Data_org_success from './Data_org_success'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'

function Edit_org_main() {
  const { id } = useParams();
  const { t, i18n } = useTranslation()

  const [formData, setFormData] = useState({
    //Start Page 1
    organization: '',
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
    eventName: "",
    sportType: "",
    location: "",
    competitionDate: "",
    competitionTime: "",
    openRegisDate: "",
    closeRegisDate: "",
    maxRegis: "",
    competitionDetails: [
      { raceType: '', registrationFee: '' }
    ],
    generalInfo: "",
    purpose: "",
    interesting: "",
    reward: [""],
    coverPicture: "",
    banner: "",
    // End Page 2

    // Start Page 3
    whatToReceive: [""],
    route: [""],
    latitude: "",
    longitude: "",
    accommodation: "",
    foodStalls: "",
    product:
    {
      shirt: [""],
      shirtsize: [""],
      etc: [""]
    }
    ,
    etcInfo: "",
    shippingFee: "",

    onsiteStatus: false,
    shippingStatus: false,

    bankName: "",
    accountNumber: "",
    accountName: "",
    promptPayImage: "",


    // End Page 3
  });

  const [eventData, setEventData] = useState();
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [formInfo, setFormInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const steps = [
    'ข้อมูลผู้สมัคร',
    'ประเภทแข่งขัน/สินค้า',
    'ที่อยู่การจัดส่ง',
    'การชำระเงิน',
  ];

  const stepStyle = {
    padding: 2,
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "#F3C710",
        fontSize: "2rem",
      },
      "& .MuiStepConnector-line": {
        borderColor: "#F3C710",
      }
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: "#F3C710",
        fontSize: "2rem",
      },
      "& .MuiStepConnector-line": {
        borderColor: "#F3C710",
      }
    },
    '& .MuiStepper-root': {
      border: 'none', // Add other styles as needed
    },
  }

  const changepage = (path) => {
    window.location.href = "/" + path
  }

  const handleNext = async () => {
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.delete(activeStep);
      return newSkipped;
    });

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === 3) {
      setLoading(true);
      try {
        // Fetch user info from the server
        const userResponse = await fetch('http://localhost:4000/api/userinfo', {
          method: 'GET',
          credentials: 'include', // Include cookies for session-based auth
        });

        if (!userResponse.ok) throw new Error('Failed to fetch user info');

        const userData = await userResponse.json();
        setUserInfo(userData);

        const uploadFile = async (file) => {

          if (typeof file === 'string' && file.startsWith('http')) {
            return file;
          }

          // ตรวจสอบว่าไฟล์มีอยู่หรือไม่
          if (!file) {
            console.warn('No file provided for upload, skipping...');
            return ''; // ส่งกลับค่าที่ว่างเพื่อข้ามการทำงาน
          }

          try {
            const formDataForImage = new FormData();
            formDataForImage.append('image', file);

            const uploadImageResponse = await fetch('http://localhost:4000/api/images_upload', {
              method: 'POST',
              credentials: 'include', // รวมคุกกี้สำหรับการตรวจสอบสิทธิ์แบบเซสชัน
              body: formDataForImage,
            });

            if (!uploadImageResponse.ok) {
              throw new Error(`Failed to upload image: ${uploadImageResponse.statusText}`);
            }

            const uploadResponse = await uploadImageResponse.json();
            return uploadResponse.url; // ส่งกลับ URL ของรูปภาพที่อัปโหลด
          } catch (error) {
            return ''; // ส่งคืนค่าที่ว่างหากเกิดข้อผิดพลาด
          }
        };


        // Process files for reward, whatToReceive, and route
        const processFiles = async (files) => {
          if (!files || files.length === 0) {
            console.warn('No files provided, skipping file processing...');
            return [];
          }

          const urls = await Promise.all(
            files.map(async (file) => {
              const url = await uploadFile(file);
              return url;
            })
          );

          return urls.filter(url => url); // กรอง URL ที่ว่างออก (ถ้ามีข้อผิดพลาด)
        };


        const processSingleFile = async (file) => {
          if (!file) {
            return ''; // ข้ามหากไม่มีไฟล์
          }

          try {
            const url = await uploadFile(file);
            return url;
          } catch (error) {
            console.error('Error uploading single file:', error);
            return ''; // ส่งคืนค่าที่ว่างในกรณีเกิดข้อผิดพลาด
          }
        };


        // Upload images and get URLs
        const rewardUrls = await processFiles(formData.reward);
        const receiveUrls = await processFiles(formData.whatToReceive);
        const routeUrls = await processFiles(formData.route);
        const coverPictureUrls = await processSingleFile(formData.coverPicture);
        const bannerUrls = await processSingleFile(formData.banner);
        const promptPayImageUrls = await processSingleFile(formData.promptPayImage);

        // Prepare event data including the uploaded image URLs
        const eventData = {
          owner_id: userData._id,
          eventName: formData.eventName,
          sportType: formData.sportType,
          location: formData.location,
          eventDate: formData.competitionDate,
          eventTime: formData.competitionTime,
          registrationOpenDate: formData.openRegisDate,
          registrationCloseDate: formData.closeRegisDate,
          maxParticipants: formData.maxRegis,
          competitionDetails:
            formData.competitionDetails.map(detail => ({
              raceType: detail.raceType,
              registrationFee: detail.registrationFee
            })),
          generalInfo: formData.generalInfo,
          objectives: formData.purpose,
          eventHighlights: formData.interesting,
          prize: rewardUrls,
          whatToReceive: receiveUrls,
          route: routeUrls,
          coverPicture: coverPictureUrls,
          bannerPicture: bannerUrls,
          map: {
            lat: formData.latitude,
            lng: formData.longitude,
          },
          accommodation: formData.accommodation,
          foodStalls: formData.foodStalls,
          etcInfo: formData.etcInfo,
          organization: formData.organization,
          product: {
            shirt: formData.product.shirt,
            shirtsize: formData.product.shirtsize,
            etc: formData.product.etc
          },
          shippingFee: formData.shippingFee,
          paymentInfo: {
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            accountName: formData.accountName,
            promptPayImage: promptPayImageUrls,
          },
          onsiteStatus: formData.onsiteStatus,
          shippingStatus: formData.shippingStatus,
        };

        // Send event data to the server to create a new event
        const eventResponse = await axios.patch(`http://localhost:4000/api/events/${id}`, eventData);


        if (eventResponse.status === 200) {
          setLoading(false); // หยุดการโหลดเมื่อเสร็จสิ้น
          console.log('Event created successfully:', eventResponse.data.event);
        }

        // console.log('Event created successfully:', eventResponse);

      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  useEffect(() => {
    setLoading(true);

    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/userinfo', {
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

    const fetchFormInfo = async () => {
      try {
        const formResponse = await fetch(`http://localhost:4000/api/events/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (formResponse.ok) {
          const formEventData = await formResponse.json();


          setLoading(true)
          // ทำการตั้งค่า setFormInfo ก่อน
          setFormInfo(formEventData);
          // รอให้ setFormInfo ทำงานเสร็จก่อน จากนั้นค่อยทำ setFormData
          setFormData(() => ({
            // Page 1
            organization: formEventData?.organization || '',
            profilePicture: formEventData?.owner[0]?.personalInfor?.profilePicture || '',
            username: formEventData?.owner[0]?.personalInfor?.username || '',
            gender: formEventData?.owner[0]?.personalInfor?.gender || '',
            birthDate: formEventData?.owner[0]?.personalInfor?.birthDate || '',
            idCardNumber: formEventData?.owner[0]?.personalInfor?.idCardNumber || '',
            email: formEventData?.owner[0]?.personalInfor?.email || '',
            phoneNumber: formEventData?.owner[0]?.personalInfor?.phoneNumber || '',
            nationality: formEventData?.owner[0]?.personalInfor?.nationality || '',
            bloodType: formEventData?.owner[0]?.personalInfor?.bloodType || '',
            chronicDiseases: formEventData?.owner[0]?.personalInfor?.chronicDiseases || '',
            address: formEventData?.owner[0]?.personalInfor?.address || '',
            subDistrict: formEventData?.owner[0]?.personalInfor?.subDistrict || '',
            district: formEventData?.owner[0]?.personalInfor?.district || '',
            province: formEventData?.owner[0]?.personalInfor?.province || '',
            zipCode: formEventData?.owner[0]?.personalInfor?.zipCode || '',

            // Page 2
            eventName: formEventData?.eventName || '',
            sportType: formEventData?.sportType || '',
            location: formEventData?.location || '',
            competitionDate: formEventData?.eventDate || '',
            competitionTime: formEventData?.eventTime || '',
            openRegisDate: formEventData?.registrationOpenDate || '',
            closeRegisDate: formEventData?.registrationCloseDate || '',
            maxRegis: formEventData?.maxParticipants || '',
            competitionDetails: formEventData?.competitionDetails || [{ raceType: '', registrationFee: '' }],
            generalInfo: formEventData?.generalInfo || '',
            purpose: formEventData?.objectives || '',
            interesting: formEventData?.eventHighlights || '',
            reward: formEventData?.prize || [''],
            coverPicture: formEventData?.coverPicture || '',
            banner: formEventData?.bannerPicture || '',

            // Page 3
            whatToReceive: formEventData?.whatToReceive || [''],
            route: formEventData?.route || [''],
            latitude: formEventData?.map?.lat || '',
            longitude: formEventData?.map?.lng || '',
            accommodation: formEventData?.accommodation || '',
            foodStalls: formEventData?.foodStalls || '',
            product: {
              shirt: formEventData?.product?.shirt || [''],
              shirtsize: formEventData?.product?.shirtsize || [''],
              etc: formEventData?.product?.etc || [''],
            },
            etcInfo: formEventData?.etcInfo || '',
            shippingFee: formEventData?.shippingFee || '',
            onsiteStatus: formEventData?.onsiteStatus || false,
            shippingStatus: formEventData?.shippingStatus || false,
            bankName: formEventData?.paymentInfo?.bankName || '',
            accountNumber: formEventData?.paymentInfo?.accountNumber || '',
            accountName: formEventData?.paymentInfo?.accountName || '',
            promptPayImage: formEventData?.promptPayImage || '',
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


  const componants = [
    <Data_org_1 formData={formData} setFormData={setFormData} isEditMode={true} />,
    <Data_org_2 formData={formData} setFormData={setFormData} isEditMode={true} />,
    <Data_org_3 formData={formData} setFormData={setFormData} isEditMode={true} />,
    <Data_org_4 formData={formData} isEditMode={true} />
  ]


  console.log(formData)


  return (
    <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} sx={stepStyle}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps} >
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Data_org_success loading={loading} setLoading={setLoading} isEditMode={true} />
        ) : (
          <React.Fragment>
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

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                style={{ backgroundColor: "#47474A", border: 'none', borderRadius: '10px', width: '15%' }}
              >
                {t('ย้อนกลับ')}
              </Button>

              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: '15%' }}>
                {activeStep === steps.length - 1 ? t('เสร็จสิ้นเสร็จสิ้น') : t('ถัดไป')}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}

export default Edit_org_main