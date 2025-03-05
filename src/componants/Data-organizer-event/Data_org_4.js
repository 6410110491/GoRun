import React from 'react'
import ScrollToTop from "react-scroll-to-top";
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

function Data_org_4({ formData, setFormData, loading, setLoading, isEditMode }) {
  const { t, i18n } = useTranslation()
  return (
    <div>
      <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
        {/* Head */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
            <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
              {isEditMode ? t('สรุปการแก้ไขรายละเอียดงาน') : t('สรุปรายละเอียดงาน')}
            </p>
          </div>
        </div>

        {/* ScroolToTop */}
        <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

        <Container className='mt-5' fluid style={{
          minHeight: "100vh",
          backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
          borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
        }}>

          {/* เริ่มต้นข้อมูลส่วนตัวผู้จัดงาน */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            {t('ข้อมูลส่วนตัวผู้จัดงาน')}
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%",
          }}>
            <p className='ms-3'>{t('ชื่อผู้จัดงาน')}: {formData.username}</p>
            <p className='ms-3'>{t('เบอร์โทรศัพท์')}: {formData.phoneNumber}</p>
            <p className='ms-3'>{t('อีเมล')}: {formData.email}</p>

          </Container>
          {/* สิ้นสุดข้อมูลส่วนตัวผู้จัดงาน */}


          {/* ข้อมูลทั่วไป */}
          {formData && formData.generalInfo ? (
            <>
              <Container className='mt-4 ms-5' fluid style={{
                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                marginBottom: "-20px", position: "relative"
              }}>
                {t('ข้อมูลทั่วไป')}
              </Container>
              <Container className='ms-3' fluid style={{
                backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
                borderRadius: "10px", width: "95%", whiteSpace: 'pre-line'
              }}>
                <p className='ms-3'>{formData.generalInfo}</p>

              </Container>
            </>) : <></>
          }



          {/* วัตถุประสงค์ */}
          {formData && formData.purpose ? (
            <>
              <Container className='mt-4 ms-5' fluid style={{
                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                marginBottom: "-20px", position: "relative"
              }}>
                {t('วัตถุประสงค์')}
              </Container>
              <Container className='ms-3' fluid style={{
                backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
                borderRadius: "10px", width: "95%", whiteSpace: 'pre-line'
              }}>
                <p className='ms-3'>{formData.purpose}</p>

              </Container>
            </>) : <></>
          }



          {/* ความน่าสนใจของงาน */}
          {formData && formData.interesting ? (
            <>
              <Container className='mt-4 ms-5' fluid style={{
                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                marginBottom: "-20px", position: "relative"
              }}>
                {t('ความน่าสนใจของงาน')}
              </Container>
              <Container className='ms-3' fluid style={{
                backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
                borderRadius: "10px", width: "95%", whiteSpace: 'pre-line'
              }}>
                <p className='ms-3'>{formData.interesting}</p>

              </Container>
            </>) : <></>
          }


          {/* ระยะวิ่ง/ค่าสมัคร */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            {t('ประเภทการแข่งขัน/ค่าสมัคร')}
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            {formData.competitionDetails && formData.competitionDetails.map((formDataItem, index) => (
              <div key={index}>
                <Row className='mt-1'>
                  <Col xl={5} md={5} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                    <p className='ms-3'>{t('ประเภทการแข่งขัน')}: {formDataItem.raceType}</p>
                  </Col>
                  <Col xl={3} md={3} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                    <p className='ms-3'>{t('ค่าสมัคร')}: {formDataItem.registrationFee}</p>
                  </Col>
                  {formDataItem.productShippingStatus === true ? (
                    <Col xl={4} md={4} sm={12} className='mt-2' style={{ display: "flex", flexDirection: "column" }}>
                      <p className='ms-3'>{t('ปิดการเลือกสินค้า')}</p>
                    </Col>
                  ) : <></>}
                </Row>
                {/* แสดง Divider ยกเว้นรายการสุดท้าย */}
                {index < formData.competitionDetails.length - 1 && (
                  <hr style={{ margin: "1rem", borderBottom: "1px solid #47474A" }} />
                )}
              </div>
            ))}
          </Container>



          {/* เส้นทางการแข่งขัน */}
          {formData && formData.route.length > 0 ? (
            <>
              < Container className='mt-4 ms-5' fluid style={{
                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                marginBottom: "-20px", position: "relative"
              }}>
                {t('เส้นทางการแข่งขัน')}
              </Container>
              <Container className='ms-3' fluid style={{
                backgroundColor: "#fff",
                minHeight: "100px",
                padding: "1.5rem 0 16px 0",
                marginBottom: "1.25rem",
                borderRadius: "10px",
                width: "95%"
              }}>
                {formData.route && formData.route.length > 0 ? (
                  formData.route.map((file, index) => (
                    <p key={index} className='ms-3'>{file.name}</p>
                  ))
                ) : (
                  <p className='ms-3'></p>
                )}
              </Container>
            </>) : <></>
          }


          {/* รางวัล */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            {t('รางวัล')}
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            {formData.reward && formData.reward.length > 0 ? (
              formData.reward.map((file, index) => (
                <p key={index} className='ms-3'>{file.name}</p>
              ))
            ) : (
              <p className='ms-3'></p>
            )}
          </Container>


          {/* สิ่งที่จะได้รับ */}
          <Container className='mt-4 ms-5' fluid style={{
            backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
            marginBottom: "-20px", position: "relative"
          }}>
            {t('สิ่งที่จะได้รับ')}
          </Container>
          <Container className='ms-3' fluid style={{
            backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
            borderRadius: "10px", width: "95%"
          }}>
            {formData.whatToReceive && formData.whatToReceive.length > 0 ? (
              formData.whatToReceive.map((file, index) => (
                <p key={index} className='ms-3'>{file.name}</p>
              ))
            ) : (
              <p className='ms-3'></p>
            )}
          </Container>




          {/* ข้อมูลเพิ่มเติม */}
          {formData && formData.etcInfo ? (
            <>
              <Container className='mt-4 ms-5' fluid style={{
                backgroundColor: "#F3C710", height: "40px", borderRadius: "10px", fontSize: "20px", width: "fit-content",
                marginBottom: "-20px", position: "relative"
              }}>
                {t('ข้อมูลเพิ่มเติม')}
              </Container>
              <Container className='ms-3' fluid style={{
                backgroundColor: "#fff", minHeight: "100px", padding: "1.5rem 0 16px 0", marginBottom: "1.25rem",
                borderRadius: "10px", width: "95%"
              }}>
                <p className='ms-3'>{formData.etcInfo}</p>

              </Container>
            </>) : <></>
          }
        </Container>

      </Container >
    </div>
  )
}

export default Data_org_4