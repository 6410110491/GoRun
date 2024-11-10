import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Container, Row } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Card_event from './Card_event';

import AOS from 'aos';
import 'aos/dist/aos.css';

function Calendar() {
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

  const [event, setEvent] = useState([]);

  const changepage = (path) => {
    window.location.href = "/" + path
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/events', {
          method: 'GET',
          credentials: 'include', // Include cookies for session-based auth
        });

        if (response.status === 401) {
          // Redirect to login if not authenticated
          changepage('login'); // Adjust the path as necessary
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          throw new Error('Failed to fetch event data');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // กำหนดเวลาของแอนิเมชัน (มิลลิวินาที)
      easing: 'ease-in-out', // ปรับค่า easing ของแอนิเมชัน
      once: true, // ให้แอนิเมชันทำงานครั้งเดียวเมื่อเห็น element
    });
  }, []);
  return (
    <Container className='mt-5' style={{ minHeight: "100vh" }} >
      {/* Head */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            ปฏิทินงานทั้งหมด
          </p>
        </div>
      </div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

      {/* Calendar */}
      <div style={{ marginTop: "2rem" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DateCalendar style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }} defaultValue={dayjs(new Date())} readOnly />
        </LocalizationProvider>
      </div>

      <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>
        <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
        <p style={{ fontSize: "1.5rem", marginLeft: '0.5rem', marginRight: '0.5rem' }}>รายการวิ่งทั้งหมดในเดือน มกราคม 2567</p>
        <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
      </div>

      {/* card */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <Row style={{
          display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
          justifyContent: "center", alignItems: "center"
        }}>
          {event.map((data, index) => {
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 50}`}
                style={{ width: "fit-content" }}
              >
                <Card_event data={data} />
              </div>
            )
          })}
        </Row>
      </div>

    </Container>
  )
}

export default Calendar