import React from 'react'
import dayjs from 'dayjs';
import { Container, Row } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Card_event from './Card_event';


function Calendar() {
  return (
    <Container className='mt-5' style={{ minHeight: "100vh" }} >
      {/* Head */}
      <p style={{ fontSize: "2rem" }}>ปฏิทินงานทั้งหมด</p>
      <div style={{ height: "5px", width: "100%", backgroundColor: "#47474A" }}></div>

      {/* ScroolToTop */}
      <ScrollToTop smooth style={{ borderRadius: "20px" }} />

      {/* Calendar */}
      <div style={{ marginTop: "2rem" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DateCalendar style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }} defaultValue={dayjs('2022-04-17')} readOnly />
        </LocalizationProvider>
      </div>

      <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>
        <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
        <p style={{ fontSize: "1.5rem" }}>รายการวิ่งทั้งหมดในเดือน มกราคม 2567</p>
        <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
      </div>

      {/* card */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <Row style={{
          display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
          justifyContent: "center", alignItems: "center"
        }}>
          <Card_event />
        </Row>
      </div>

    </Container>
  )
}

export default Calendar