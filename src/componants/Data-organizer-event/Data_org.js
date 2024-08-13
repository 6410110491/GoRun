import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'

import Data_org_1 from './Data_org_1'
import Data_org_2 from './Data_org_2'
import Data_org_3 from './Data_org_3'
import Data_org_4 from './Data_org_4'
import Data_org_success from './Data_org_success'
import axios from 'axios'

function Data_org() {
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
        eventName: "",
        sportType: "",
        location: "",
        competitionDate: "",
        competitionTime: "",
        openRegisDate: "",
        closeRegisDate: "",
        maxRegis: "",
        competitionType: "",
        distance: "",
        fee: "",
        generalInfo: "",
        purpose: "",
        interesting: "",
        reward: "",
        // End Page 2

        // Start Page 3
        whatToReceive: "",
        route: "",
        map: "",
        accommodation: "",
        foodStalls: "",
        // End Page 3
    });

    const componants = [
        <Data_org_1 formData={formData} setFormData={setFormData} />,
        <Data_org_2 formData={formData} setFormData={setFormData} />,
        <Data_org_3 formData={formData} setFormData={setFormData} />,
        <Data_org_4 formData={formData} setFormData={setFormData} />
    ]

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
    const [userInfo, setUserInfo] = useState(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const clearForm = () => {
        setFormData(prevState => Object.fromEntries(Object.keys(prevState).map(key => [key, ''])));
    };


    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = async () => {
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.delete(activeStep);
            return newSkipped;
        });

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if (activeStep === 3) {
            try {
                // Fetch user info from the server
                const userResponse = await fetch('http://localhost:4000/api/userinfo', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for session-based auth
                });

                if (!userResponse.ok) throw new Error('Failed to fetch user info');

                const userData = await userResponse.json();
                setUserInfo(userData);

                // Send event data to the server to create a new event
                const eventResponse = await axios.post('http://localhost:4000/api/events', {
                    owner_id: userData._id,
                    eventName: formData.eventName,
                    sportType: formData.sportType,
                    location: formData.location,
                    eventDate: formData.competitionDate,
                    eventTime: formData.competitionTime,
                    registrationOpenDate: formData.openRegisDate,
                    registrationCloseDate: formData.closeRegisDate,
                    maxParticipants: formData.maxRegis,
                    raceCategory: formData.competitionType,
                    distance: formData.distance,
                    registrationFee: formData.fee,
                    generalInfo: formData.generalInfo,
                    objectives: formData.purpose,
                    eventHighlights: formData.interesting,
                    prize: formData.reward,
                    whatToReceive: formData.whatToReceive,
                    route: formData.route,
                    map: formData.map,
                    accommodation: formData.accommodation,
                    foodStalls: formData.foodStalls,
                });

                console.log(eventResponse.data);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    };




    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


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
                    <Data_org_success />
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
                                ย้อนกลับ
                            </Button>

                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', width: '15%' }}>
                                {activeStep === steps.length - 1 ? 'เสร็จสิ้น' : 'ถัดไป'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Container>
    )
}

export default Data_org