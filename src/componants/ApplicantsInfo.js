import React, { useEffect, useState } from 'react'
import { Accordion, Button, Container, Modal, Spinner, Tabs, Tab, Badge } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

function ApplicantsInfo() {
    const { id } = useParams();

    const [applicantsInfo, setApplicantsInfo] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [eventInfo, setEventInfo] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const changepage = (path) => {
        window.location.href = "/" + path
    }

    useEffect(() => {
        const fetchApplicantDetail = async () => {
            setLoading(true); // Set loading to true when starting data fetch
            setError(null); // Reset error state before fetching
            try {
                const response = await fetch(`http://localhost:4000/api/register/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 401) {
                    changepage('login');
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setApplicantsInfo(data);
                } else {
                    throw new Error('Failed to fetch event data');
                }
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false when fetch is complete
            }
        };

        fetchApplicantDetail();
    }, [id]);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/events/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 401) {
                    changepage('login');
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setEventInfo(data);
                } else {
                    throw new Error('Failed to fetch event data');
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchEventDetail();
    }, [id]); // เพิ่ม `id` เป็น dependency

    const [showPopup, setShowPopup] = useState(false);
    const handleOpen = () => {
        setShowPopup(true);
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    // Confirm popup
    const [showConfirmPopup, setConFirmPopup] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    const handleOpenConFirmPopup = () => {
        setShowPopup(false);
        setConFirmPopup(true);
    };

    const handleCloseConFirmPopup = () => {
        setShowPopup(true);
        setConFirmPopup(false);
    };

    const handleOpenDetail = (item) => {
        setSelectedItem(item);
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
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
        <Container style={{ marginTop: '2rem', marginBottom: "2rem", minHeight: "100vh" }}>
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                    <p>Error: {error}</p>
                </div>
            ) : (
                <>
                    {/* Head */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                            <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                                รายชื่อผู้สมัครงาน {eventInfo.eventName}
                            </p>
                        </div>
                    </div>

                    {/* ScrollToTop */}
                    <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

                    <Container className='mt-5' fluid style={{
                        minHeight: "100vh",
                        backgroundColor: "#E3E3E3",
                        padding: "1rem 2rem 1rem 2rem",
                        borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                    }}>
                        <div style={{ width: "100%", height: "min-content", backgroundColor: "#FFF" }}>
                            <TableContainer component={Paper} sx={{ maxWidth: 10000, margin: 'auto', marginTop: 4 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ลำดับ</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ชื่อ-สกุล</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>รายละเอียด</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>วันที่สมัคร</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>สถานะ</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>การดำเนินการ</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {applicantsInfo === null || applicantsInfo.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center" style={{ padding: "3rem" }}>
                                                    <p>No data</p>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            applicantsInfo.registrations.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="center"><p>{index + 1}</p></TableCell>
                                                    <TableCell align="center"><p>{item.username}</p></TableCell>
                                                    <TableCell align="center"><p>
                                                        ชื่องาน: {eventInfo.eventName} <br />
                                                        ประเภทงาน: {eventInfo.sportType} <br />
                                                    </p></TableCell>
                                                    <TableCell align="center"><p>{formatDate(item.registrationDate)}</p></TableCell>
                                                    <TableCell align="center">
                                                        {item.status === 'approved' && <p style={{ color: 'green' }}>อนุมัติแล้ว</p>}
                                                        {item.status === 'rejected' && <p style={{ color: 'red' }}>ไม่อนุมัติ</p>}
                                                        {item.status === 'pending' && <p>รอการตรวจสอบ</p>}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Button
                                                            variant="warning"
                                                            color="secondary"
                                                            onClick={() => {
                                                                handleOpen();
                                                                setSelectedItem(item, index);
                                                            }}
                                                            style={{ marginRight: '8px', color: "white" }}
                                                        >
                                                            ดูรายละเอียด
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Container>

                    {/* Popup Modal */}
                    <Modal show={showPopup} onHide={handleClose} size="xl">
                        <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
                            <Modal.Title>ตรวจสอบข้อมูลการสมัคร</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p style={{ fontSize: "14px" }}>ยอดค่าสมัคร : {selectedItem.registrationFee}</p>
                            {selectedItem.status === 'approved' && <p style={{ fontSize: "14px" }}>สถานะการสมัคร : อนุมัติแล้ว</p>}
                            {selectedItem.status === 'rejected' && <p style={{ fontSize: "14px" }}>สถานะการสมัคร : ไม่อนุมัติ</p>}
                            {selectedItem.status === 'pending' && <p style={{ fontSize: "14px" }}> สถานะการสมัคร : รอการตรวจสอบ</p>}
                            <p style={{ fontSize: "14px" }}>วันที่สมัคร : {formatDate(selectedItem.registrationDate)}</p>
                            <p style={{ fontSize: "14px" }}>วันที่โอน : {formatDate(selectedItem.datePay)}</p>
                            {/* <p style={{ fontSize: "14px" }}>วันที่ส่งหลักฐาน : </p> */}
                            <p style={{ fontSize: "14px" }}>สมัครเสร็จสมบูรณ์ :</p>
                            <p style={{
                                fontSize: "14px",
                                color: selectedItem.comment && selectedItem.comment.length > 0 ? "red" : "black"
                            }}>หมายเหตุ : {selectedItem.comment || ""} </p>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>รายชื่อผู้สมัคร</p>

                            <Accordion >
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>{selectedItem.username}</Accordion.Header>
                                    <Accordion.Body>
                                        ประเภท : {selectedItem.raceType}<br />
                                        เสื้อ : {selectedItem.shirt} {selectedItem.shirtSize} <br />

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}
                                style={{ border: 'none', borderRadius: '10px' }}>
                                ปิด
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}

        </Container>
    )
}

export default ApplicantsInfo