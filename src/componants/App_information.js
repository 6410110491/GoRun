import React, { useEffect, useState } from 'react'
import { Accordion, Button, Container, Modal, Spinner, Tabs, Tab, Badge, Form, Row, Col } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as XLSX from "xlsx";

import { FaFileExcel } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function App_information() {
  const { id } = useParams();
  const [applicantsInfo, setApplicantsInfo] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [key, setKey] = useState('pending');

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const { t, i18n } = useTranslation()

  const [formData, setFormData] = useState({
    comment: '',
  });

  useEffect(() => {
    const fetchApplicantDetail = async () => {
      setLoading(true); // Set loading to true when starting data fetch
      setError(null); // Reset error state before fetching
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register/${id}`, {
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
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/${id}`, {
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
          setIsRegistrationOpen(data.status)
        } else {
          throw new Error('Failed to fetch event data');
        }
      } catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    };
    fetchEventDetail();
  }, [id]); // เพิ่ม `id` เป็น dependency

  const changepage = (path) => {
    window.location.href = "/" + path
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirm = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register/${id}/${selectedItem._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status: 'approved' }),
    });

    if (response.ok) {
      console.log('Confirm success');
      window.location.reload();
    }

    setConFirmPopup(false);
    setShowPopup(false);
  };

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

  const [showRejectPopup, setRejectPopup] = useState(false);
  const handleOpenConFirmRejectPopup = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register/${id}/${selectedItem._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status: 'rejected', comment: formData.comment }),
    });

    if (response.ok) {
      console.log('Confirm success');
      window.location.reload();
    }
  };

  const handleCloseRejectPopup = () => {
    setShowPopup(true);
    setRejectPopup(false);
  };

  const handleOpenRejectPopup = () => {
    setRejectPopup(true);
    setShowPopup(false);
  }


  const formatDate = (date) => {
    if (!date) return '';

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const getFilteredRegistrations = (status) => {
    if (!applicantsInfo || !applicantsInfo.registrations) return [];
    return applicantsInfo.registrations.filter(registration => registration.status === status);
  };

  // ฟังก์ชันสำหรับสลับสถานะการเปิด/ปิดรับสมัคร
  const toggleRegistration = async () => {
    setIsRegistrationOpen(!isRegistrationOpen);
    setLoading(true)
    try {
      // สลับสถานะและอัปเดตในฐานข้อมูล
      const newStatus = !isRegistrationOpen;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...eventInfo,
          status: newStatus,
        }),
      });
      if (response.ok) {
        return
      }
      // ถ้าสำเร็จให้ปรับสถานะใน client
      setIsRegistrationOpen(newStatus);
    } catch (error) {
      console.error("Error updating event registration status:", error);
    } finally {
      setLoading(false)
    }
  };

  const data = getFilteredRegistrations("approved") || [];
  const formattedData = data.map((registration) => ({
    ชื่อผู้ใช้: registration?.username || "-",
    เพศ: registration?.gender || "-",
    วันเกิด: formatDate(registration?.birthDate) || "-",
    เลขบัตรประชาชน: registration?.idCardNumber || "-",
    อีเมล: registration?.email || "-",
    เบอร์โทรศัพท์: registration?.phoneNumber || "-",
    สัญชาติ: registration?.nationality || "-",
    กรุ๊ปเลือด: registration?.bloodType || "-",
    โรคประจำตัว: registration?.chronicDiseases || "-",
    ประเภทการแข่งขัน: registration?.raceType || "-",
    หลักฐานการโอนเงิน: registration?.slipImage || "-",
    ค่าสมัคร: registration?.registrationFee || 0,
    ขนาดเสื้อ: registration?.shirtSize || "-",
    ตัวเลือกการรับสินค้า: registration?.shippingChoice || "-",
    ชื่อผู้รับสินค้า: registration?.nameShip || "-",
    นามสกุลผู้รับสินค้า: registration?.lastNameShip || "-",
    เบอร์โทรศัพท์ผู้รับสินค้า: registration?.phoneNumberShip || "-",
    ที่อยู่จัดส่ง: registration?.addressShip || "-",
    ตำบลจัดส่ง: registration?.subDistrictShip || "-",
    อำเภอจัดส่ง: registration?.districtShip || "-",
    จังหวัดจัดส่ง: registration?.provinceShip || "-",
    รหัสไปรษณีย์จัดส่ง: registration?.zipCodeShip || "-",
    วันที่สมัคร: formatDate(registration?.registrationDate) || "-",
  }));

  console.log(data);

  // ฟังก์ชันคำนวณความกว้างของคอลัมน์
  const calculateColumnWidths = (data) => {
    if (!data || data.length === 0) return [];

    const keys = Object.keys(data[0]);
    return keys.map((key) => ({
      wch: Math.max(
        key.length, // ความยาวของหัวคอลัมน์
        ...data.map((item) =>
          item[key] ? item[key].toString().length : 0 // ความยาวสูงสุดของข้อมูลในแต่ละแถว
        )
      ) + 2,
    }));
  };

  const exportToExcel = () => {
    if (!data || data.length === 0) {
      console.error("ไม่มีข้อมูลสำหรับการส่งออก");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(formattedData); // ใช้ข้อมูลที่ฟอร์แมตแล้ว
    const columnWidths = calculateColumnWidths(formattedData);
    worksheet["!cols"] = columnWidths; // ตั้งค่าความกว้างของคอลัมน์

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    XLSX.writeFile(workbook, `${eventInfo.eventName || "ExportedData"}.xlsx`);
  };

  const onEditForm = () => {
    changepage(`dataorganizer/edit/${id}`)
  };

  return (
    <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
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
                {t('ข้อมูลการสมัคร')}
              </p>
            </div>
          </div>

          <div style={{ margin: "1.25rem" }}>
            <Row style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
              {/* ปุ่ม "ส่งออกเป็นไฟล์ Excel" */}
              <Col xs={12} sm={6} md={4} xl={3} xxl={2} className="mb-2 mb-md-0">
                <Tooltip title="ระบบจะส่งออกแค่ชื่อผู้สมัครที่อนุมัติแล้วเท่านั้น" arrow>
                  <Button
                    onClick={exportToExcel}
                    variant="outline-success"
                    style={{ width: "100%" }} // ทำให้ปุ่มยืดเต็มความกว้างในหน้าจอเล็ก
                  >
                    <FaFileExcel /> {t("ส่งออกเป็นไฟล์ Excel")}
                  </Button>
                </Tooltip>
              </Col>

              {/* ปุ่ม "สถานะการรับสมัคร" และ "แก้ไข" */}
              <Col xs={12} sm={6} md={6} xl={4} xxl={4}>
                <Row className="align-items-center">
                  <Col xs={8} sm={8} md={8} xl={9} xxl={8} className="d-flex align-items-center">
                    <div>{t("สถานะการรับสมัคร")}:</div>
                    <Button
                      onClick={toggleRegistration}
                      style={{
                        backgroundColor: isRegistrationOpen ? "#28a745" : "#dc3545",
                        border: "none",
                        marginLeft: "0.75rem",
                      }}
                    >
                      {isRegistrationOpen ? t("ปิดรับสมัคร") : t("เปิดรับสมัคร")}
                    </Button>
                  </Col>
                  <Col xs={4} sm={4} md={4} xl={3} xxl={4}>
                    <Button
                      onClick={onEditForm}
                      variant="warning"
                      style={{
                        border: "none",
                        color: "#fff",
                        width: "100%", // ทำให้ปุ่มยืดเต็มความกว้างในหน้าจอเล็ก
                      }}
                    >
                      <FaEdit /> {t("แก้ไข")}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
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
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="pending" title={
                  <>
                    {t('รอการตรวจสอบ')} {getFilteredRegistrations('pending').length === 0 ? "" : <Badge bg="danger">{getFilteredRegistrations('pending').length}</Badge>}
                  </>
                } >
                  <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ลำดับ')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ชื่อ-สกุล')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('รายละเอียด')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('วันที่สมัคร')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('สถานะ')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('การดำเนินการ')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          getFilteredRegistrations('pending').length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={10} align="center" style={{ padding: "3rem" }}>
                                <p>{t('ไม่พบข้อมูล')}</p>
                              </TableCell>
                            </TableRow>
                          )
                            :
                            (getFilteredRegistrations('pending').map((item, index) => (
                              <TableRow key={index}>
                                <TableCell align="center"><p>{index + 1}</p></TableCell>
                                <TableCell align="center"><p>{item.username}</p></TableCell>
                                <TableCell align="center"><p>
                                  {t('ชื่องาน')}: {eventInfo.eventName} <br />
                                  {t('ประเภทงาน')}: {eventInfo.sportType} <br />
                                </p></TableCell>
                                <TableCell align="center"><p>{formatDate(item.registrationDate)}</p></TableCell>
                                <TableCell align="center">
                                  <p>{t('รอการตรวจสอบ')}</p>
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
                                    {t('ตรวจสอบ')}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Tab>

                <Tab eventKey="approved" title={t("อนุมัติ")}>
                  <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ลำดับ')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ชื่อ-สกุล')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('รายละเอียด')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('วันที่สมัคร')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('สถานะ')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('การดำเนินการ')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          getFilteredRegistrations('approved').length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={10} align="center" style={{ padding: "3rem" }}>
                                <p>{t('ไม่พบข้อมูล')}</p>
                              </TableCell>
                            </TableRow>
                          ) :
                            (getFilteredRegistrations('approved').map((item, index) => (
                              <TableRow key={index}>
                                <TableCell align="center"><p>{index + 1}</p></TableCell>
                                <TableCell align="center"><p>{item.username}</p></TableCell>
                                <TableCell align="center"><p>
                                  {t('ชื่องาน')}: {eventInfo.eventName} <br />
                                  {t('ประเภทงาน')}: {eventInfo.sportType} <br />
                                </p></TableCell>
                                <TableCell align="center"><p>{formatDate(item.registrationDate)}</p></TableCell>
                                <TableCell align="center">
                                  <p>{t('อนุมัติ')}</p>
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    variant="warning"
                                    color="secondary"
                                    onClick={() => {
                                      handleOpenDetail(item);
                                    }}
                                    style={{ marginRight: '8px', color: "white" }}
                                  >
                                    {t('ดูรายละเอียด')}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Tab>

                <Tab eventKey="rejected" title={t("ไม่อนุมัติ")}>
                  <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ลำดับ')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('ชื่อ-สกุล')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('รายละเอียด')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('วันที่สมัคร')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('สถานะ')}</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>{t('การดำเนินการ')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          getFilteredRegistrations('rejected').length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={10} align="center" style={{ padding: "3rem" }}>
                                <p>{t('ไม่พบข้อมูล')}</p>
                              </TableCell>
                            </TableRow>
                          ) :
                            (getFilteredRegistrations('rejected').map((item, index) => (
                              <TableRow key={index}>
                                <TableCell align="center"><p>{index + 1}</p></TableCell>
                                <TableCell align="center"><p>{item.username}</p></TableCell>
                                <TableCell align="center"><p>
                                  {t('ชื่องาน')}: {eventInfo.eventName} <br />
                                  {t('ประเภทงาน')}: {eventInfo.sportType} <br />
                                </p></TableCell>
                                <TableCell align="center"><p>{formatDate(item.registrationDate)}</p></TableCell>
                                <TableCell align="center">
                                  <p>{t('ไม่อนุมัติ')}</p>
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    variant="warning"
                                    color="secondary"
                                    onClick={() => {
                                      handleOpenDetail(item);
                                    }}
                                    style={{ marginRight: '8px', color: "white" }}
                                  >
                                    {t('ดูรายละเอียด')}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Tab>
              </Tabs>
            </div>
          </Container>

          {/* Popup Modal */}
          <Modal show={showPopup} onHide={handleClose} size="xl" centered style={{
            maxHeight: "80vh", // กำหนดความสูงสูงสุดของ Modal
            marginTop: "4.75rem"
          }}>
            <Modal.Header closeButton style={{
              backgroundColor: "#F3C710", // สีพื้นหลัง
              color: "#FFF",
              position: "sticky", // กำหนด Sticky
              top: 0, // ติดด้านบน
              zIndex: 1020, // เลเยอร์สูงกว่าเนื้อหาใน Modal.Body
            }}>
              <Modal.Title>{t('ตรวจสอบข้อมูลการสมัคร')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: "14px" }}>{t('ยอดชำระทั้งหมด')} : {selectedItem.registrationFee}</p>
              {selectedItem.status === 'approved' && <p style={{ fontSize: "14px" }}>{t('สถานะการสมัคร')} : {t('อนุมัติ')}</p>}
              {selectedItem.status === 'rejected' && <p style={{ fontSize: "14px" }}>{t('สถานะการสมัคร')} : {t('ไม่อนุมัติ')}</p>}
              {selectedItem.status === 'pending' && <p style={{ fontSize: "14px" }}> {t('สถานะการสมัคร')} : {t('รอการตรวจสอบ')}</p>}
              <p style={{ fontSize: "14px" }}>{t('วันที่สมัคร')} : {formatDate(selectedItem.registrationDate)}</p>
              <p style={{ fontSize: "14px" }}>{t('วันที่โอน')} : {formatDate(selectedItem.datePay)}</p>
              {/* <p style={{ fontSize: "14px" }}>วันที่ส่งหลักฐาน : </p> */}
              <p style={{ fontSize: "14px" }}>
                {t('ตัวเลือกการรับสินค้า')} : {selectedItem.shippingChoice === "onsite"
                  ? t('รับสินค้าหน้างาน')
                  : selectedItem.shippingChoice === "shipping"
                    ? t('จัดส่งสินค้า')
                    : ''}
              </p>

              <p style={{ fontSize: "16px", fontWeight: "bold" }}>{t('ข้อมูลผู้สมัคร')}</p>

              <Accordion >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{selectedItem.username}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                        {t('ชื่อผู้สมัคร')} : {selectedItem.username} <br />
                        {t('วันเดือนปีเกิด')} : {formatDate(selectedItem.birthDate)} <br />
                        {t('เบอร์โทรศัพท์')} : {selectedItem.phoneNumber} <br />
                        {t('สัญชาติ')} : {selectedItem.nationality} <br />
                        {t('ประเภทเสื้อ')} : {selectedItem.shirt} <br />
                      </Col>

                      <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                        {t('ประเภทการแข่งขัน')} : {selectedItem.raceType} <br />
                        {t('เลขบัตรประชาชน')} : {selectedItem.idCardNumber} <br />
                        {t('โรคประจำตัว')} : {selectedItem.chronicDiseases} <br />
                        {t('หมู่โลหิต')} : {selectedItem.usernabloodTypeme} <br />
                        {t('ขนาดเสื้อ')} : {selectedItem.shirtSize} <br />
                      </Col>
                    </Row>
                    {selectedItem.shippingChoice === 'shipping' ?
                      (<>
                        <Row>
                          <p style={{ fontSize: "16px", fontWeight: "bold", marginTop: '1.25rem', marginBottom: "0.125rem" }}>
                            {t('ที่อยู่จัดส่งผู้สมัคร')}
                          </p>
                          <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                            {t('ชื่อ')} : {selectedItem.nameShip} <br />
                            {t('เบอร์โทรศัพท์')} : {selectedItem.phoneNumber} <br />
                            {t('ตำบล/แขวง')} : {selectedItem.subDistrictShip} <br />
                            {t('จังหวัด')} : {selectedItem.provinceShip} <br />
                          </Col>

                          <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                            {t('สกุล')} : {selectedItem.lastNameShip} <br />
                            {t('ที่อยู่')} : {selectedItem.addressShip} <br />
                            {t('อำเภอ/เขต')} : {selectedItem.districtShip} <br />
                            {t('รหัสไปรษณีย์')} : {selectedItem.zipCodeShip} <br />
                          </Col>
                        </Row>
                      </>) : null
                    }
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <div style={{ margin: "1rem 0rem" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>{t('หลักฐานการโอนเงิน')}</p>
                {selectedItem.slipImage && (
                  <img
                    src={selectedItem.slipImage}
                    alt="image"
                    style={{
                      maxWidth: "300px",
                      width: "60%",
                      height: 'auto',
                      marginLeft: "3rem"
                    }}
                  />
                )}

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleOpenRejectPopup}
                style={{ border: 'none', borderRadius: '10px' }}>
                {t('ไม่อนุมัติ')}
              </Button>
              <Button variant="success" color="success" onClick={handleOpenConFirmPopup}
                style={{ border: 'none', borderRadius: '10px' }}>
                {t('อนุมัติ')}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal showDetail */}
          <Modal show={showDetail} onHide={handleCloseDetail} size="xl" centered style={{
            maxHeight: "80vh", // กำหนดความสูงสูงสุดของ Modal
            marginTop: "4.75rem"
          }}>
            <Modal.Header closeButton style={{
              backgroundColor: "#F3C710", // สีพื้นหลัง
              color: "#FFF",
              position: "sticky", // กำหนด Sticky
              top: 0, // ติดด้านบน
              zIndex: 1020, // เลเยอร์สูงกว่าเนื้อหาใน Modal.Body
            }}>
              <Modal.Title>{t('รายละเอียดข้อมูลการสมัคร')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: "14px" }}>{t('ยอดชำระทั้งหมด')} : {selectedItem.registrationFee}</p>
              {selectedItem.status === 'approved' && <p style={{ fontSize: "14px" }}>{t('สถานะการสมัคร')} : {t('อนุมัติแล้ว')}</p>}
              {selectedItem.status === 'rejected' && <p style={{ fontSize: "14px" }}>{t('สถานะการสมัคร')} : {t('ไม่อนุมัติ')}</p>}
              {selectedItem.status === 'pending' && <p style={{ fontSize: "14px" }}> {t('สถานะการสมัคร')} : {t('รอการตรวจสอบ')}</p>}
              <p style={{ fontSize: "14px" }}>{t('วันที่สมัคร')} : {formatDate(selectedItem.registrationDate)}</p>
              <p style={{ fontSize: "14px" }}>{t('วันที่โอน')} : {formatDate(selectedItem.datePay)}</p>
              {/* <p style={{ fontSize: "14px" }}>วันที่ส่งหลักฐาน : </p> */}
              <p style={{ fontSize: "14px" }}>
                {t('ตัวเลือกการรับสินค้า')} : {selectedItem.shippingChoice === "onsite"
                  ? t('รับสินค้าหน้างาน')
                  : selectedItem.shippingChoice === "shipping"
                    ? t('จัดส่งสินค้า')
                    : ''}
              </p>

              <p style={{ fontSize: "16px", fontWeight: "bold" }}>{t('ข้อมูลผู้สมัคร')}</p>

              <Accordion >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{selectedItem.username}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                        {t('ชื่อผู้สมัคร')} : {selectedItem.username} <br />
                        {t('วันเดือนปีเกิด')} : {formatDate(selectedItem.birthDate)} <br />
                        {t('เบอร์โทรศัพท์')} : {selectedItem.phoneNumber} <br />
                        {t('สัญชาติ')} : {selectedItem.nationality} <br />
                        {t('ประเภทเสื้อ')} : {selectedItem.shirt} <br />
                      </Col>

                      <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                        {t('ประเภทการแข่งขัน')} : {selectedItem.raceType} <br />
                        {t('เลขบัตรประชาชน')} : {selectedItem.idCardNumber} <br />
                        {t('โรคประจำตัว')} : {selectedItem.chronicDiseases} <br />
                        {t('หมู่โลหิต')} : {selectedItem.usernabloodTypeme} <br />
                        {t('ขนาดเสื้อ')} : {selectedItem.shirtSize} <br />
                      </Col>
                    </Row>

                    {selectedItem.shippingChoice === 'shipping' ?
                      (<>
                        <Row>
                          <p style={{ fontSize: "16px", fontWeight: "bold", marginTop: '1.25rem', marginBottom: "0.125rem" }}>
                            {t('ที่อยู่จัดส่งผู้สมัคร')}
                          </p>
                          <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                            {t('ชื่อ')} : {selectedItem.nameShip} <br />
                            {t('เบอร์โทรศัพท์')} : {selectedItem.phoneNumber} <br />
                            {t('ตำบล/แขวง')} : {selectedItem.subDistrictShip} <br />
                            {t('จังหวัด')} : {selectedItem.provinceShip} <br />
                          </Col>

                          <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                            {t('สกุล')} : {selectedItem.lastNameShip} <br />
                            {t('ที่อยู่')} : {selectedItem.addressShip} <br />
                            {t('อำเภอ/เขต')} : {selectedItem.districtShip} <br />
                            {t('รหัสไปรษณีย์')} : {selectedItem.zipCodeShip} <br />
                          </Col>
                        </Row>
                      </>) : null
                    }
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <div style={{ margin: "1rem 0rem" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>{t('หลักฐานการโอนเงิน')}</p>
                {selectedItem.slipImage && (
                  <img
                    src={selectedItem.slipImage}
                    alt="image"
                    style={{
                      maxWidth: "300px",
                      width: "60%",
                      height: 'auto',
                      marginLeft: "3rem"
                    }}
                  />
                )}

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetail}
                style={{ border: 'none', borderRadius: '10px' }}>
                {t('ยกเลิก')}
              </Button>
              <Button variant="success" onClick={handleCloseDetail}
                style={{ border: 'none', borderRadius: '10px' }}>
                {t('ตกลง')}
              </Button>
            </Modal.Footer>
          </Modal>


          {/* Confirm Popup */}
          <Modal show={showConfirmPopup} onHide={handleCloseConFirmPopup} centered>
            <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
              <Modal.Title>{t('ยืนยันการดำเนินการ')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{t('ยืนยันการดำเนินการหรือไม่')}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConFirmPopup}
                style={{ border: 'none', borderRadius: '10px' }}>
                {t('ยกเลิก')}
              </Button>
              <Button variant="success" color="success" onClick={handleConfirm}
                style={{ border: 'none', borderRadius: '10px' }}>
                {t('ยืนยัน')}
              </Button>
            </Modal.Footer>
          </Modal>


          {/* confirm reject popup */}
          <Modal show={showRejectPopup} onHide={handleCloseRejectPopup} centered>
            <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
              <Modal.Title>{t('ตรวจสอบข้อมูลผู้สมัคร')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{t('คุณแน่ใจหรือไม่ที่จะไม่อนุมัติผู้ใช้งานดังกล่าว')}</p>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>{t('หมายเหตุ')}</Form.Label>
                  <Form.Control as="textarea" rows={3} type="text" placeholder={t("กรอกหมายเหตุ")}
                    name="comment" onChange={handleChange}
                  />
                </Form.Group>
              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseRejectPopup}
                style={{ border: 'none', borderRadius: '10px' }}>
                {t('ยกเลิก')}
              </Button>
              <Button variant="success" color="success" onClick={handleOpenConFirmRejectPopup}
                style={{ border: 'none', borderRadius: '10px' }}>
                {t('ยืนยัน')}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
      }
    </Container >
  )
}

export default App_information
