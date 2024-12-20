import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Container, Row } from 'react-bootstrap';
import ScrollToTop from 'react-scroll-to-top';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Card_event from './Card_event';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

function Calendar() {
  const [event, setEvent] = useState([]);  // Data for events from API
  const [selectedMonth, setSelectedMonth] = useState(dayjs());  // Selected month from calendar

  const changepage = (path) => {
    window.location.href = "/" + path;
  }

  const { t, i18n } = useTranslation()

  // Fetch events from the API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/events', {
          method: 'GET',
          credentials: 'include',  // Include cookies for session-based auth
        });

        if (response.status === 401) {
          // Redirect to login if not authenticated
          changepage('login');
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setEvent(data);  // Set the events into state
        } else {
          throw new Error('Failed to fetch event data');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, []);

  // Initialize AOS (Animation library)
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Animation duration
      easing: 'ease-in-out',  // Easing function
      once: true,  // Run the animation once
    });
  }, []);

  // Filter events based on the selected month
  const filterEventsByMonth = (events, selectedMonth) => {
    const selectedMonthIndex = selectedMonth.month();  // Get the selected month (0-indexed)
    // console.log('Selected Month:', selectedMonth.format('MMMM YYYY'));  // Log the selected month for debugging

    return events.filter(event => {
      const eventMonth = dayjs(event.eventDate);  // Convert the event's date to a dayjs object
      const eventMonthIndex = eventMonth.month();  // Get the month of the event date
      // console.log('Event Month:', eventMonth.format('DD MMMM YYYY'));  // Log event month for debugging
      return eventMonthIndex === selectedMonthIndex;
    });
  };
  const filteredEvents = filterEventsByMonth(event, selectedMonth);  // Filter events based on selected month


  return (
    <Container className='mt-5' style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A" }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            {t('ปฏิทินงานทั้งหมด')}
          </p>
        </div>
      </div>

      {/* ScrollToTop button */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

      {/* Calendar */}
      <div style={{ marginTop: "2rem" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedMonth}
            views={['month']} // เลือกแค่เดือน
            onChange={(newMonth) => setSelectedMonth(newMonth)}  // Update selected month when user selects a month
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          />
        </LocalizationProvider>
      </div>

      {/* Section Header */}
      <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>
        <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
        <p style={{ fontSize: "1.5rem", marginLeft: '0.5rem', marginRight: '0.5rem' }}>
          {t('รายการกีฬาทั้งหมดในเดือน')} {selectedMonth.format('MMMM YYYY')}
        </p>
        <div style={{ height: "5px", width: "20px", backgroundColor: "#47474A", marginBottom: "10px" }}></div>
      </div>

      {/* Event Cards */}
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <Row style={{
          display: "flex", flexWrap: "wrap", width: "85%", marginTop: "3rem",
          justifyContent: "center", alignItems: "center"
        }}>
          {filteredEvents.length === 0 ? (
            <h5 style={{ textAlign: "center" }}>{t('ไม่พบข้อมูล')}</h5>
          ) : (
            filteredEvents.map((data, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 50}`}  // Delay the animation for each card
                style={{ width: "fit-content" }}
              >
                <Card_event data={data} />
              </div>
            ))
          )}
        </Row>
      </div>
    </Container>
  );
}

export default Calendar;
