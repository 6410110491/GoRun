import React from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'
import ScrollToTop from 'react-scroll-to-top'
import Form_step_1 from './Form_step_1'
import Form_step_2 from './Form_step_2'
import Form_step_3 from './Form_step_3'
import Form_step_4 from './Form_step_4'
import Form_page_success from './Form_page_success'

function Form_page() {
  const imageSrc = require('../../image/event-pic-3.jpg')

  const componants = [
    <Form_step_1 />, <Form_step_2 />, <Form_step_3 />, <Form_step_4 />
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
    <div style={{ minHeight: "100vh" }}>
      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

      <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        {/* Title */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <p style={{ fontSize: "2rem", fontWeight: "550" }}>
            Card Title
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
              }} src={imageSrc} alt="Image" />
            </div>
          </Col>

          <Col md={12} xl={4}>
            <Container fluid style={{
              backgroundColor: "#E3E3E3", height: "180px", padding: "0",
              borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}>
              <Container className='mb-2' fluid style={{
                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
                display: "flex", justifyContent: "center", alignItems: "center"
              }}>
                Card Title
              </Container>

              <p className='ms-3'>สถานที่ : จันทบุรี</p>
              <p className='ms-3'>วันที่ : 26 พฤษภาคม 2567 </p>
              <p className='ms-3'>ผู้จัดงาน : RACEUP WORK </p>

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
            <Form_page_success />
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
    </div>
  )
}

export default Form_page