import React, { useEffect, useState } from 'react'
import '../App.css';
import { Container, Row } from 'react-bootstrap'

import Card_event from './Card_event'
import ScrollToTop from 'react-scroll-to-top'

import AOS from 'aos';
import 'aos/dist/aos.css';

function All_events() {
  const demo_api = [
    {
      "id": 1,
      "name": "งานวิ่งมาราธอน",
      "province": "กรุงเทพมหานคร",
      "date": "2024-4-18",
      "organizer": "สมาคมวิ่ง",
      "img": 'event-pic-1.jpg'
    },
    {
      "id": 2,
      "name": "งานวิ่งการกุศล",
      "province": "สุราษฎร์ธานี",
      "date": "2024-4-18",
      "organizer": "สมาคมวิ่ง",
      "img": 'event-pic-2.jpg'
    },
    {
      "id": 3,
      "name": "Run for change",
      "province": "กาญจนบุรี",
      "date": "2024-4-18",
      "organizer": "สมาคมวิ่ง",
      "img": 'event-pic-3.jpg'
    },
  ]

  const [eventMe, setEventMe] = useState([]);

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
          setEventMe(data);
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
    <Container className='mt-5' fluid style={{ minHeight: "100vh", padding: "0" }} >
      {/* Head */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            งานทั้งหมด
          </p>
        </div>
      </div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />


      {/* Card */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", minHeight: "50vh" }}>
        <Row style={{
          display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
          justifyContent: "center", alignItems: "center"
        }}>
          {eventMe.map((data, index) => {
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

export default All_events