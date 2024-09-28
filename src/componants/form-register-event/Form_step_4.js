import React from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



function Form_step_4({ formData, setFormData, eventData, slipFile }) {
  const formatDate = (date) => {
    if (!date) return '';

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const totalPayment = (parseInt(formData.registrationFee, 10) || 0) + (eventData.shippingFee || 0);

  const handleSlipsPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setFormData({ ...formData, slipImage: file });
      slipFile = file;
    }
  };

  return (
    <div>
      <Container className='mt-3' fluid style={{
        backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>

        {/* สรุปรายการสมัคร */}
        <Container fluid style={{
          backgroundColor: "#FFF", height: "auto", padding: "0 0 0.5rem 0",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginTop: "1.5rem"
        }}>
          <Container className='mb-2' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            สรุปรายการสมัคร
          </Container>

          <p className='ms-3'>ประเภท : {formData.sportType}</p>
          <p className='ms-3'>ค่าสมัคร :  THB {formData.registrationFee}</p>
          <p className='ms-3'>ค่าจัดส่ง : THB {eventData.shippingFee}</p>
          <p className='ms-3'>ยอดชำระทั้งหมด : THB {totalPayment}</p>

        </Container>

        {/* ข้อมูลการจัดส่ง */}
        <Container fluid style={{
          backgroundColor: "#FFF", height: "auto", padding: "0 0 0.5rem 0",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginTop: "3rem"
        }}>
          <Container className='mb-2' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            ข้อมูลการจัดส่ง
          </Container>

          <p className='ms-3' style={{
            wordBreak: "break-all"
          }}>ที่อยู่การจัดส่ง : {formData.addressShip}</p>
        </Container>


        {/* ข้อมูลผู้สมัคร */}
        <Container fluid style={{
          backgroundColor: "#FFF", height: "auto", padding: "0 0 0.5rem 0",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginTop: "3rem"
        }}>
          <Container className='mb-2' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            ข้อมูลผู้สมัคร
          </Container>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>ชื่อผู้สมัคร : {formData.username}</p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>ประเภทการแข่งขัน : {formData.raceType}</p></Col>
          </Row>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>วันเดือนปีเกิด : {formatDate(formData.birthDate)}</p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>เลขประจำตัวประชาชน : {formData.idCardNumber}</p></Col>
          </Row>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>เบอร์โทรศัพท์ : {formData.phoneNumber}</p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>โรคประจำตัว : {formData.chronicDiseases}</p></Col>
          </Row>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>สัญชาติ : {formData.nationality}</p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>หมู่โลหิต : {formData.bloodType}</p></Col>
          </Row>
          <Row>
            <Col xl={6} sm={12}><p className='ms-3'>ประเภทเสื้อ : {formData.shirt}</p></Col>
            <Col xl={6} sm={12}><p className='ms-3'>ขนาดเสื้อ : {formData.shirtSize}</p></Col>
          </Row>
        </Container>

        {/* ช่องทางชำระเงิน */}
        <Container fluid style={{
          backgroundColor: "#FFF", height: "auto", padding: "0 0 0.5rem 0",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginTop: "3rem"
        }}>
          <Container className='mb-2' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", textAlign: "center",
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            ช่องทางชำระเงิน
          </Container>

          <Row>
            <Col xl={5} md={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img src={eventData?.paymentInfo?.promptPayImage} alt='logo.jpg'
                style={{ width: "300px", height: "400px" }} />
            </Col>
            <Col xl={7} md={12}>
              <p className='ms-3'>ธนาคาร : {eventData.paymentInfo.bankName}</p>
              <p className='ms-3'>ชื่อบัญชี : {eventData.paymentInfo.accountName}</p>
              <p className='ms-3'>เลขที่บัญชี : {eventData.paymentInfo.accountNumber}</p>
              <p className='ms-3' style={{ fontWeight: "700" }}>จำนวนเงินที่ต้องชำระ : THB {totalPayment}</p>

            </Col>
            <Col xl={12} style={{ marginTop: "2rem" }}>
              <Container fluid style={{
                backgroundColor: "#E3E3E3", height: "180px", padding: "1rem", width: "50%",
                borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}>
                <Row style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "2rem 0" }}>
                  <Form.Group controlId='formReceivePicture'>
                    <Form.Control
                      accept=".png,.jpg,.jpeg,"
                      type='file'
                      multiple
                      name='image'
                      rows={3}
                      placeholder='รูปภาพสิ่งที่จะได้รับ'
                      onChange={handleSlipsPictureChange}
                    />
                  </Form.Group>
                  <p style={{ textAlign: 'center', margin: "2rem 0" }}>
                    อัพโหลดหลักฐานการโอนเงิน
                  </p>
                </Row>
              </Container>
            </Col>

            <Col xl={12} style={{ marginTop: "2rem", marginBottom: "3rem" }}>
              <Container fluid style={{
                backgroundColor: "#E3E3E3", height: "auto", padding: "1.5rem 1rem 1.5rem 1rem", width: "50%",
                borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
              }}>
                <Row>
                  <Col xl={6} md={6} sm={12}>
                    <p>วันที่โอน</p>
                    <div style={{ marginTop: "-10px" }}>
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
                            onChange={(dueDate) => setFormData({ ...formData, datePay: dueDate })}
                            // value={dueDate}
                            format="DD/MM/YYYY"
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </Col>

                  <Col xl={6} md={6} sm={12}>
                    <p>เวลาที่โอน</p>
                    <div style={{ marginTop: "-10px" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DesktopTimePicker']}>
                          <DesktopTimePicker
                            clearable
                            ampm={false}
                            // value={dueTime}
                            timeSteps={{ minutes: 1 }}
                            onChange={(dueDate) => setFormData({ ...formData, timePay: dueDate })}
                            slotProps={{ textField: { size: 'small' } }}
                            sx={{
                              width: '95%',
                              backgroundColor: "#FFF",
                              borderRadius: "10px",
                              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                              "& MuiInputBase-root": { border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </Col>
                </Row>
              </Container>

            </Col>



          </Row>
        </Container>


      </Container>
    </div>
  )
}

export default Form_step_4