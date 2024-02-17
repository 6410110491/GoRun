import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {
    return (
        <div >
            <Container fluid style={{ backgroundColor: "#040404", height: "200px",}}>
                    <div style={{display:'flex', justifyContent:"center"}}>
                        <img src={require('../image/logo2.jpg')}
                            style={{ width: "50px", height: "50px", borderRadius: "100%", border: "3px solid #FFF", marginTop: "1rem" }} />
                    </div>
                    <div style={{display:'flex',  flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", marginTop: "10px" }}>GoRun Webapplication</p>
                        <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", }}>prince of songkla university</p>
                        <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", }}>6410110307@psu.ac.th</p>
                        <p style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold", }}>6410110491@psu.ac.th</p>

                    </div>
        

            </Container>

            <Container fluid style={{ backgroundColor: "#F3C710", height: "25px" , display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div style={{ color: "#FFF", fontSize: "10px", fontWeight: "bold"}}>2024 Gorun All rights reserved</div>
            </Container>
        </div>
    )
}

export default Footer