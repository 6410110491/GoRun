import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button as MuiButton } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Card_event from './Card_event';


function Evevt_history() {
    const demo_api = [
        {
            "id": 1,
            "name": "งานวิ่งมาราธอน",
            "province": "กรุงเทพมหานคร",
            "date": "2024-4-17",
            "organizer": "สมาคมวิ่ง",
            "img": 'event-pic-1.jpg'
        },
    ]

    const handleEdit = (id) => {
        console.log(`แก้ไขข้อมูลที่ ${id}`);
    };

    const handleConfirm = (id) => {
        console.log(`ยืนยันข้อมูลที่ ${id}`);
    };

    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        ประวัติการจัดงาน
                    </p>
                </div>
            </div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
                <p style={{ fontSize: "1.5rem", marginLeft: '0.5rem', marginRight: '0.5rem' }}>กำลังดำเนินการ</p>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
            </div>

            {/* Card */}
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Row style={{
                    display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
                    justifyContent: "center", alignItems: "center"
                }}>
                    {demo_api.map((data, index) => {
                        return (
                            <Card_event key={index} data={data} />
                        )
                    })}
                </Row>
            </div>

            <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
                <p style={{ fontSize: "1.5rem", marginLeft: '0.5rem', marginRight: '0.5rem' }}>สิ้นสุดแล้ว</p>
                <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
                
                {/* <Row key={item.id} >
                    <Button
                        variant="danger"
                        color="secondary"
                        onClick={() => handleEdit(item.id)}
                        style={{ marginRight: '8px' }}
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
                </Row> */}
            </div>
        </Container>
    )
}

export default Evevt_history