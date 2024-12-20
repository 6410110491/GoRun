import React, { useEffect, useState } from 'react'
import { Accordion, Button, Container, Modal, Spinner } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

function App_history() {

    const data = [
        { id: 1, details: 'FLY GREEN CHARITY RUN 2024', date: '01/01/2024' },
        { id: 2, details: 'งานวิ่งครบรอบ 45 ปี เครือนำทอง เอไอเอ', date: '5/03/2024' },
        { id: 3, details: 'DOK FAI BAN Marathon 2025', date: '10/04/2024' },
    ];

    const [loading, setLoading] = useState(true);
    const [EventHistory, SetEventHistory] = useState();
    const [eventDetail, setEventDetail] = useState(null);
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState();


    console.log(selectedItem);
    const { t, i18n } = useTranslation()


    const [showPopup, setShowPopup] = useState(false);
    const handleOpen = () => {
        setShowPopup(true);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        const fetchEventHistory = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:4000/api/register', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 401) {
                    changepage('login');
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    SetEventHistory(data);
                } else {
                    throw new Error('Failed to fetch event data');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };


        fetchEventHistory();
    }, []);

    useEffect(() => {
        const fetchEventHistoryDetail = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:4000/api/register/detail/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 401) {
                    changepage('login');
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setEventDetail(data);
                } else {
                    throw new Error('Failed to fetch event data');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };


        fetchEventHistoryDetail();
    }, []);

    const onEditForm = () => {
        changepage(`event/form/${selectedItemId}`)
    };

    const changepage = (path) => {
        window.location.href = "/" + path;
    };

    const formatDate = (date) => {
        if (!date) return '';

        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
        const day = String(d.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        {t('ประวัติการสมัคร')}
                    </p>
                </div>
            </div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (

                <Container className='mt-5' fluid style={{
                    minHeight: "100vh",
                    backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
                    borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }}>

                    <div>
                        <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: 'auto', marginTop: 4 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ลำดับ')}</TableCell>
                                        <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ชื่องาน')}</TableCell>
                                        <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('วันที่สมัคร')}</TableCell>
                                        <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('สถานะ')}</TableCell>
                                        <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {EventHistory === null || EventHistory.length === 0 || eventDetail === null || eventDetail.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center" style={{ padding: "3rem" }}>
                                                <p>{t('ไม่พบข้อมูล')}</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : (

                                        EventHistory.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{item.eventName}</TableCell>
                                                <TableCell align="center">{formatDate(eventDetail[index].registrationDate)}</TableCell>
                                                <TableCell align="center">
                                                    {eventDetail[index].status === 'pending payment' && t('รอการชำระเงิน')}
                                                    {eventDetail[index].status === 'approved' && t('อนุมัติแล้ว')}
                                                    {eventDetail[index].status === 'rejected' && t('ไม่อนุมัติ')}
                                                    {eventDetail[index].status === 'pending' && t('รอการตรวจสอบ')}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        variant="warning"
                                                        color="secondary"
                                                        style={{ marginRight: '8px', color: "white" }}
                                                        onClick={() => {
                                                            handleOpen();
                                                            setSelectedItem(eventDetail[index]);
                                                            setSelectedItemId(item.event_id)
                                                        }}
                                                    >
                                                        {t('ดูรายละเอียด')}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer >
                    </div >
                </Container >
            )
            }

            {/* Popup Modal */}
            <Modal show={showPopup} onHide={handleClose} size="xl">
                <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                    <Modal.Title>{t('ข้อมูลการสมัคร')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: "14px" }}>{t('ยอดชำระทั้งหมด')} : {selectedItem.registrationFee}</p>
                    {selectedItem.status === 'approved' && <p style={{ fontSize: "14px" }}>{t('สถานะการสมัคร')} : {t('อนุมัติแล้ว')}</p>}
                    {selectedItem.status === 'rejected' && <p style={{ fontSize: "14px" }}>{t('สถานะการสมัคร')} : {t('ไม่อนุมัติ')}</p>}
                    {selectedItem.status === 'pending' && <p style={{ fontSize: "14px" }}> {t('สถานะการสมัคร')} : {t('รอการตรวจสอบ')}</p>}
                    <p style={{ fontSize: "14px" }}>{t('วันที่สมัคร')} : {formatDate(selectedItem.registrationDate)}</p>
                    <p style={{ fontSize: "14px" }}>{t('วันที่โอน')} : {formatDate(selectedItem.datePay)}</p>
                    {/* <p style={{ fontSize: "14px" }}>วันที่ส่งหลักฐาน : </p> */}
                    <p style={{ fontSize: "14px" }}>{t('สมัครเสร็จสมบูรณ์')} :</p>
                    <p style={{
                        fontSize: "14px",
                        color: selectedItem.comment && selectedItem.comment.length > 0 ? "red" : "black"
                    }}>{t('หมายเหตุ')} : {selectedItem.comment || ""} </p>
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>{t('รายชื่อผู้สมัคร')}</p>

                    <Accordion >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>{selectedItem.username}</Accordion.Header>
                            <Accordion.Body>
                                {t('ประเภทการแข่งขัน')} : {selectedItem.raceType}<br />
                                {t('ประเภทเสื้อ')} : {selectedItem.shirt} {selectedItem.shirtSize} <br />

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" color="secondary" onClick={onEditForm}
                        style={{ border: 'none', borderRadius: '10px', color: "white" }}>
                        {t('แก้ไข')}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ปิด')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    )

}

export default App_history
