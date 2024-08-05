import React from 'react'
import ScrollToTop from "react-scroll-to-top";

import { Container } from 'react-bootstrap'

function Data_org_4() {
  return (
    <div>
      <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
        {/* Head */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
            <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
              สรุปรายละเอียดงาน
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


        </Container >
      </Container >
    </div>
  )
}

export default Data_org_4