import React from 'react'
import { Button, Container } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function App_history() {

    const data = [
        { id: 1, details: 'FLY GREEN CHARITY RUN 2024', date: '01/01/2024' },
        { id: 2, details: 'งานวิ่งครบรอบ 45 ปี เครือนำทอง เอไอเอ', date: '5/03/2024' },
        { id: 3, details: 'DOK FAI BAN Marathon 2025', date: '10/04/2024' },
    ];

    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        ประวัติการสมัคร
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

                <div>
                    <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: 'auto', marginTop: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ลำดับ</TableCell>
                                    <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ชื่องาน</TableCell>
                                    <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>วันที่สมัคร</TableCell>
                                    <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}></TableCell>
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
                                                variant="warning"
                                                color="secondary"
                                                onClick={() => { }}
                                                style={{ marginRight: '8px', color: "white" }}
                                            >
                                                ดูรายละเอียด
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container >
        </Container >
    )

}

export default App_history
