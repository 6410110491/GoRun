import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from 'react-bootstrap';

function Form_page_success() {
    const changepage = (path) => {
        window.location.href = "/" + path
    }
    return (
        <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            marginTop: "2rem"
        }}>
            <CheckCircleOutlineIcon style={{ fontSize: "10rem", color: "#4CAF50" }} />
            <p style={{ fontSize: "3rem" }}>การชำระเงินเสร็จสิ้น</p>
            <p style={{ fontSize: "1rem" }}>ขอบคุณที่ใช้บริการ</p>
            <p style={{ fontSize: "1rem" }}>กรุณารอการตรวจสอบการชำระเงิน</p>

            <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', marginTop:"3rem" }}
                onClick={() => changepage("")}>กลับสู่หน้าหลัก</Button>
        </div>
    )
}

export default Form_page_success