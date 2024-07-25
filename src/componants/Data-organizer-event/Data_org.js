import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'

import Data_org_1 from './Data_org_1'
import Data_org_2 from './Data_org_2'
import Data_org_3 from './Data_org_3'
import Data_org_4 from './Data_org_4'

function Data_org() {
    const componants = [
        <Data_org_1 />, <Data_org_2 />, <Data_org_3 />,<Data_org_4 />
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
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
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
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <div>Success</div>
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