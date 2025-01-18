import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function Data_org_success({ loading, setLoading, isEditMode }) {
    const { t, i18n } = useTranslation()
    const changepage = (path) => {
        window.location.href = "/" + path
    }

    return (
        <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            marginTop: "2rem", height: "90vh"
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
                    <p style={{ fontSize: "3rem" }}>
                        {isEditMode ? t('แก้ไขงานกีฬาเสร็จสิ้น') : t('เปิดรับสมัครงานกีฬาเสร็จสิ้น')}
                    </p>
                    <p style={{ fontSize: "1.25rem" }}>{t('ขอบคุณที่ใช้บริการ')}</p>

                    <Button style={{ backgroundColor: "#F3C710", border: 'none', borderRadius: '10px', marginTop: "3rem" }}
                        onClick={() => changepage("")}>
                        {t('กลับสู่หน้าหลัก')}
                    </Button>
                </div>
            )}

        </div>
    )
}

export default Data_org_success