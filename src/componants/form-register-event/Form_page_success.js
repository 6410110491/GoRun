import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Spinner } from 'react-bootstrap';

function Form_page_success({ loading, setLoading }) {
    const changepage = (path) => {
        window.location.href = "/" + path
    }
    return (
        <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            marginTop: "2rem"
        }}>
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", }}>
                    <CheckCircleOutlineIcon style={{ fontSize: "10rem", color: "#4CAF50" }} />
                    <p style={{ fontSize: "3rem" }}>การสมัครสำเร็จเสร็จสิ้น</p>
                    <p style={{ fontSize: "1rem" }}>ขอบคุณที่ใช้บริการ</p>
                    <p style={{ fontSize: "1rem" }}>กรุณารอการตรวจสอบการชำระเงิน</p>

                    <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', marginTop: "3rem" }}
                        onClick={() => changepage("")}>
                        กลับสู่หน้าหลัก
                    </Button>
                </div>
            )}

        </div>
    )
}

export default Form_page_success