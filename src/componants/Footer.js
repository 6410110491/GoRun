import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {
    return (
        <div >
            <Container fluid style={{ backgroundColor: "#040404", height: "200px", display:"flex", justifyContent:"center" }}>
                <img src={require('../image/logo2.jpg')}
                    style={{ width: "50px", height: "50px", borderRadius: "100%", border: "3px solid #FFF", marginTop:"1rem"}} />
            </Container>

            <Container fluid style={{ backgroundColor: "#F3C710", height: "25px" }}></Container>
        </div>
    )
}

export default Footer