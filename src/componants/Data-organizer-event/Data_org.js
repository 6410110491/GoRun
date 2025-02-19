import React, { useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'

import Data_org_1 from './Data_org_1'
import Data_org_2 from './Data_org_2'
import Data_org_3 from './Data_org_3'
import Data_org_4 from './Data_org_4'
import Data_org_success from './Data_org_success'
import axios from 'axios'
import { useTranslation } from 'react-i18next';

function Data_org() {
    const { t, i18n } = useTranslation()
    const [validated, setValidated] = useState(false);
    const formRef = useRef(null);

    const birthDatePickerRef = useRef(null);
    const competitionDatePickerRef = useRef(null);
    const competitionTimePickerRef = useRef(null);
    const openRegisDatePickerRef = useRef(null);
    const closeRegisDatePickerRef = useRef(null);

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
            { raceType: '', registrationFee: '', productShippingStatus: false }
        ],
        generalInfo: "",
        purpose: "",
        interesting: "",
        reward: [],
        coverPicture: "",
        banner: "",
        // End Page 2

        // Start Page 3
        whatToReceive: [],
        route: [],
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



    const [userInfo, setUserInfo] = useState(null);
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

        if (activeStep === 1) {
            if (!formData.competitionDate || formData.competitionDate === "" ||
                !formData.competitionTime || formData.competitionTime === "" ||
                !formData.openRegisDate || formData.openRegisDate === "" ||
                !formData.closeRegisDate || formData.closeRegisDate === "") {

                const competitionDatePicker = competitionDatePickerRef.current?.querySelector('input');
                const competitionTimePicker = competitionTimePickerRef.current?.querySelector('input');
                const openRegisDatePicker = openRegisDatePickerRef.current?.querySelector('input');
                const closeRegisDatePicker = closeRegisDatePickerRef.current?.querySelector('input');

                if (competitionDatePicker) {
                    competitionDatePicker.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    competitionDatePicker.focus();
                    setValidated(true);
                } else if (competitionTimePicker) {
                    competitionTimePicker.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    competitionTimePicker.focus();
                    setValidated(true);
                } else if (openRegisDatePicker) {
                    openRegisDatePicker.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    openRegisDatePicker.focus();
                    setValidated(true);
                } else if (closeRegisDatePicker) {
                    closeRegisDatePicker.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    closeRegisDatePicker.focus();
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
                // Fetch user info from the server
                const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/userinfo`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies for session-based auth
                });

                if (!userResponse.ok) throw new Error('Failed to fetch user info');

                const userData = await userResponse.json();
                setUserInfo(userData);

                const uploadFile = async (file) => {
                    // ตรวจสอบว่าไฟล์มีอยู่หรือไม่
                    if (!file) {
                        console.warn('No file provided for upload, skipping...');
                        return ''; // ส่งกลับค่าที่ว่างเพื่อข้ามการทำงาน
                    }

                    try {
                        const formDataForImage = new FormData();
                        formDataForImage.append('image', file);

                        const uploadImageResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/images_upload`, {
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
                            registrationFee: detail.registrationFee,
                            productShippingStatus: detail.productShippingStatus
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

                    personalInfor: {
                        profilePicture: formData?.profilePicture || '',
                        username: formData?.username || '',
                        gender: formData?.gender || '',
                        birthDate: formData?.birthDate || '',
                        idCardNumber: formData?.idCardNumber || '',
                        email: formData?.email || '',
                        phoneNumber: formData?.phoneNumber || '',
                        nationality: formData?.nationality || '',
                        bloodType: formData?.bloodType || '',
                        chronicDiseases: formData?.chronicDiseases || '',
                        address: formData?.address || '',
                        subDistrict: formData?.subDistrict || '',
                        district: formData?.district || '',
                        province: formData?.province || '',
                        zipCode: formData?.zipCode || '',
                    }
                };

                // Send event data to the server to create a new event
                const eventResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/events`, eventData);


                if (eventResponse.status === 201) {
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

    console.log(formData)

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const componants = [
        <Data_org_1 formData={formData} setFormData={setFormData} isEditMode={false}
            formRef={formRef}
            validated={validated}
            setValidated={setValidated}
            birthDatePickerRef={birthDatePickerRef}
            datePickerValidateStyles={datePickerValidateStyles} />,
        <Data_org_2 formData={formData} setFormData={setFormData}
            isEditMode={false}
            formRef={formRef}
            validated={validated}
            setValidated={setValidated}
            competitionDatePickerRef={competitionDatePickerRef}
            competitionTimePickerRef={competitionTimePickerRef}
            openRegisDatePickerRef={openRegisDatePickerRef}
            closeRegisDatePickerRef={closeRegisDatePickerRef}
            datePickerValidateStyles={datePickerValidateStyles}
        />,
        <Data_org_3 formData={formData} setFormData={setFormData}
            isEditMode={false}
            formRef={formRef}
            validated={validated}
            setValidated={setValidated}
        />,
        <Data_org_4 formData={formData} isEditMode={false} />
    ]


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
                    <Data_org_success loading={loading} setLoading={setLoading} isEditMode={false} />
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
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                style={{ backgroundColor: "#47474A", border: 'none', borderRadius: '10px', width: '15%' }}
                            >
                                {t('ย้อนกลับ')}
                            </Button>

                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: '15%' }}>
                                {activeStep === steps.length - 1 ? t('เสร็จสิ้น') : t('ถัดไป')}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Container>
    )
}

export default Data_org