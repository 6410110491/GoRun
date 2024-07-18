import React from 'react'
import { Col, Button, Row, Container, Card, Form, img } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button as MuiButton } from '@mui/material';

function App_information() {


  const data = [
    { id: 1, details: 'สมัครงาน A', date: '01/01/2024' },
    { id: 2, details: 'สมัครงาน B', date: '05/01/2024' },
    { id: 3, details: 'สมัครงาน C', date: '10/01/2024' },
  ];

  const handleEdit = (id) => {
    console.log(`แก้ไขข้อมูลที่ ${id}`);
  };

  const handleConfirm = (id) => {
    console.log(`ยืนยันข้อมูลที่ ${id}`);
  };

  return (
    <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
      {/* Head */}
      <p style={{ fontSize: "2rem" }}>ข้อมูลการสมัคร</p>
      <div style={{ height: "5px", width: "100%", backgroundColor: "#47474A" }}></div>

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
                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>รายละเอียด</TableCell>
                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>วันที่สมัคร</TableCell>
                <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>การดำเนินการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.details}</TableCell>
                  <TableCell align="center">{item.date}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="danger"
                      color="secondary"
                      onClick={() => handleEdit(item.id)}
                      style={{ marginRight: '8px'}}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      variant="success"
                      color="success"
                      onClick={() => handleConfirm(item.id)}
                    >
                      ยืนยัน
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </Container>
  )
}

export default App_information
