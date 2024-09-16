import React, { useState } from 'react'
import { Accordion, Button, Container, Modal } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button as MuiButton } from '@mui/material';

function App_information() {


  const data = [
    { id: 1, name: "นายยินดี  มีสุข", details: ["TG RUN", "วิ่งมาราธอน"], date: '01/01/2024' },
    { id: 2, name: "นายพอเพียง รักสัตย์ ", details: ["งานวิ่งการกุศล", "วิ่งมาราธอน"], date: '05/01/2024' },
    { id: 3, name: "นางสาวพอใจ อยู่ดี", details: ["Run for Change", "วิ่งมาราธอน"], date: '10/01/2024' },
  ];

  const handleEdit = (id) => {
    console.log(`แก้ไขข้อมูลที่ ${id}`);
  };

  const handleConfirm = (id) => {
    console.log(`ยืนยันข้อมูลที่ ${id}`);
  };

  const [showPopup, setShowPopup] = useState(false);
  const handleOpen = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  // Confirm popup
  const [showConfirmPopup, setConFirmPopup] = useState(false);
  const handleOpenConFirmPopup = () => {
    setShowPopup(false);
    setConFirmPopup(true);
  };

  const handleCloseConFirmPopup = () => {
    setShowPopup(true);
    setConFirmPopup(false);
  };

  return (
    <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
      {/* Head */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            ข้อมูลการสมัคร
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
        <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: 'auto', marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ลำดับ</TableCell>
                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ชื่อ-สกุล</TableCell>
                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>รายละเอียด</TableCell>
                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>วันที่สมัคร</TableCell>
                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>สถานะ</TableCell>
                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>การดำเนินการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center"><p>{item.id}</p></TableCell>
                  <TableCell align="center"><p>{item.name}</p></TableCell>
                  <TableCell align="center"><p>
                    ชื่องาน: {item.details[0]} <br />
                    ประเภทงาน: {item.details[1]}
                  </p></TableCell>
                  <TableCell align="center"><p>{item.date}</p></TableCell>
                  <TableCell align="center">
                    <p>รอการตรวจสอบ</p>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="warning"
                      color="secondary"
                      onClick={handleOpen}
                      style={{ marginRight: '8px', color: "white" }}
                    >
                      ตรวจสอบ
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>

      <Modal show={showPopup} onHide={handleClose} size="xl">
        <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
          <Modal.Title>ตรวจสอบข้อมูลการสมัคร</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "14px" }}>ยอดค่าสมัคร :</p>
          <p style={{ fontSize: "14px" }}>สถานะการสมัคร :</p>
          <p style={{ fontSize: "14px" }}>วันที่สมัคร :</p>
          <p style={{ fontSize: "14px" }}>วันที่โอน :</p>
          <p style={{ fontSize: "14px" }}>วันที่ส่งหลักฐาน :</p>
          <p style={{ fontSize: "14px" }}>สมัครเสร็จสมบูรณ์ :</p>
          <p style={{ fontSize: "16px", fontWeight:"bold" }}>รายชื่อผู้สมัคร</p>

          <Accordion >
            <Accordion.Item eventKey="0">
              <Accordion.Header>นายยินดี  มีสุข</Accordion.Header>
              <Accordion.Body>
                ประเภท : มาราธอน 10.5 กม. ชาย อายุ 30-35 ปี <br />
                เสื้อ : เสื้อคอปก L <br />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}
            style={{ border: 'none', borderRadius: '10px' }}>
            ยกเลิก
          </Button>
          <Button variant="success" color="success" onClick={handleOpenConFirmPopup}
            style={{ border: 'none', borderRadius: '10px' }}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>



      {/* confirm popup */}
      <Modal show={showConfirmPopup} onHide={handleCloseConFirmPopup} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
          <Modal.Title>เปิดรับสมัครงานกีฬา</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ยืนยันการเปิดรับสมัครงานกีฬาหรือไม่</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConFirmPopup}
            style={{ border: 'none', borderRadius: '10px' }}>
            ยกเลิก
          </Button>
          <Button variant="success" color="success" onClick={handleConfirm}
            style={{ border: 'none', borderRadius: '10px' }}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default App_information
