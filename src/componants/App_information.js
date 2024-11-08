import React, { useEffect, useState } from 'react'
import { Accordion, Button, Container, Modal, Spinner, Tabs, Tab, Badge, Form, Row, Col } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

function App_information() {
  const { id } = useParams();
  const [applicantsInfo, setApplicantsInfo] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [key, setKey] = useState('pending');

  const [formData, setFormData] = useState({
    comment: '',
  });

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
      setLoading(true);
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
    const response = await fetch(`http://localhost:4000/api/register/${id}/${selectedItem._id}`, {
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
    const response = await fetch(`http://localhost:4000/api/register/${id}/${selectedItem._id}`, {
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
                ข้อมูลการสมัคร
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
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="pending" title={
                  <>
                    รอการตรวจสอบ {getFilteredRegistrations('pending').length === 0 ? "" : <Badge bg="danger">{getFilteredRegistrations('pending').length}</Badge>}
                  </>
                } >
                  <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
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
                        {
                          getFilteredRegistrations('pending').length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={10} align="center" style={{ padding: "3rem" }}>
                                <p>No data</p>
                              </TableCell>
                            </TableRow>
                          )
                            :
                            (getFilteredRegistrations('pending').map((item, index) => (
                              <TableRow key={index}>
                                <TableCell align="center"><p>{index + 1}</p></TableCell>
                                <TableCell align="center"><p>{item.username}</p></TableCell>
                                <TableCell align="center"><p>
                                  ชื่องาน: {eventInfo.eventName} <br />
                                  ประเภทงาน: {eventInfo.sportType} <br />
                                </p></TableCell>
                                <TableCell align="center"><p>{formatDate(item.registrationDate)}</p></TableCell>
                                <TableCell align="center">
                                  <p>รอการตรวจสอบ</p>
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
                                    ตรวจสอบ
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Tab>

                <Tab eventKey="approved" title="อนุมัติแล้ว">
                  <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ลำดับ</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ชื่อ-สกุล</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>รายละเอียด</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>วันที่สมัคร</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>สถานะ</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          getFilteredRegistrations('approved').length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={10} align="center" style={{ padding: "3rem" }}>
                                <p>No data</p>
                              </TableCell>
                            </TableRow>
                          ) :
                            (getFilteredRegistrations('approved').map((item, index) => (
                              <TableRow key={index}>
                                <TableCell align="center"><p>{index + 1}</p></TableCell>
                                <TableCell align="center"><p>{item.username}</p></TableCell>
                                <TableCell align="center"><p>
                                  ชื่องาน: {eventInfo.eventName} <br />
                                  ประเภทงาน: {eventInfo.sportType} <br />
                                </p></TableCell>
                                <TableCell align="center"><p>{formatDate(item.registrationDate)}</p></TableCell>
                                <TableCell align="center">
                                  <p>อนุมัติแล้ว</p>
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
                                    ดูรายละเอียด
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Tab>

                <Tab eventKey="rejected" title="ไม่อนุมัติ">
                  <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ลำดับ</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>ชื่อ-สกุล</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>รายละเอียด</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>วันที่สมัคร</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}>สถานะ</TableCell>
                          <TableCell align="center" style={{ fontSize: "1.25rem", fontFamily: 'Anuphan' }}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          getFilteredRegistrations('rejected').length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={10} align="center" style={{ padding: "3rem" }}>
                                <p>No data</p>
                              </TableCell>
                            </TableRow>
                          ) :
                            (getFilteredRegistrations('rejected').map((item, index) => (
                              <TableRow key={index}>
                                <TableCell align="center"><p>{index + 1}</p></TableCell>
                                <TableCell align="center"><p>{item.username}</p></TableCell>
                                <TableCell align="center"><p>
                                  ชื่องาน: {eventInfo.eventName} <br />
                                  ประเภทงาน: {eventInfo.sportType} <br />
                                </p></TableCell>
                                <TableCell align="center"><p>{formatDate(item.registrationDate)}</p></TableCell>
                                <TableCell align="center">
                                  <p>ไม่อนุมัติ</p>
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
                                    ดูรายละเอียด
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
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>ข้อมูลผู้สมัคร</p>

              <Accordion >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{selectedItem.username}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                        ชื่อผู้สมัคร : {selectedItem.username} <br />
                        วันเดือนปีเกิด : {formatDate(selectedItem.birthDate)} <br />
                        เบอร์โทรศัพท์ : {selectedItem.phoneNumber} <br />
                        สัญชาติ : {selectedItem.nationality} <br />
                        ประเภทเสื้อ : {selectedItem.shirt} <br />
                      </Col>

                      <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                        ประเภทการแข่งขัน : {selectedItem.raceType} <br />
                        เลขประจำตัวประชาชน : {selectedItem.idCardNumber} <br />
                        โรคประจำตัว : {selectedItem.chronicDiseases} <br />
                        หมู่โลหิต : {selectedItem.usernabloodTypeme} <br />
                        ขนาดเสื้อ : {selectedItem.shirtSize} <br />
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <div style={{ margin: "1rem 0rem" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>หลักฐานการโอนเงิน</p>
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
                ไม่อนุมัติ
              </Button>
              <Button variant="success" color="success" onClick={handleOpenConFirmPopup}
                style={{ border: 'none', borderRadius: '10px' }}>
                อนุมัติ
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal showDetail */}
          <Modal show={showDetail} onHide={handleCloseDetail} size="xl">
            <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
              <Modal.Title>รายละเอียดข้อมูลการสมัคร</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedItem && (
                <>
                  <p style={{ fontSize: "14px" }}>ยอดค่าสมัคร : {selectedItem.registrationFee}</p>
                  {selectedItem.status === 'approved' && <p style={{ fontSize: "14px" }}>สถานะการสมัคร : อนุมัติแล้ว</p>}
                  {selectedItem.status === 'rejected' && <p style={{ fontSize: "14px" }}>สถานะการสมัคร : ไม่อนุมัติ</p>}
                  {selectedItem.status === 'pending' && <p style={{ fontSize: "14px" }}> สถานะการสมัคร : รอการตรวจสอบ</p>}
                  <p style={{ fontSize: "14px" }}>วันที่สมัคร : {formatDate(selectedItem.registrationDate)}</p>
                  <p style={{ fontSize: "14px" }}>วันที่โอน : {formatDate(selectedItem.datePay)}</p>
                  {/* <p style={{ fontSize: "14px" }}>วันที่ส่งหลักฐาน : </p> */}
                  <p style={{ fontSize: "14px" }}>สมัครเสร็จสมบูรณ์ :</p>
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>ข้อมูลผู้สมัคร</p>

                  <Accordion >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{selectedItem.username}</Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                            ชื่อผู้สมัคร : {selectedItem.username} <br />
                            วันเดือนปีเกิด : {formatDate(selectedItem.birthDate)} <br />
                            เบอร์โทรศัพท์ : {selectedItem.phoneNumber} <br />
                            สัญชาติ : {selectedItem.nationality} <br />
                            ประเภทเสื้อ : {selectedItem.shirt} <br />
                          </Col>

                          <Col xl={6} lg={6} md={12} sm={12} style={{ gap: "0.5rem" }}>
                            ประเภทการแข่งขัน : {selectedItem.raceType} <br />
                            เลขประจำตัวประชาชน : {selectedItem.idCardNumber} <br />
                            โรคประจำตัว : {selectedItem.chronicDiseases} <br />
                            หมู่โลหิต : {selectedItem.usernabloodTypeme} <br />
                            ขนาดเสื้อ : {selectedItem.shirtSize} <br />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <div style={{ margin: "1rem 0rem" }}>
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>หลักฐานการโอนเงิน</p>
                    <img src={selectedItem.slipImage} alt="image" style={{
                      maxWidth: "300px", width: "60%", height: 'auto',
                      marginLeft: "3rem"
                    }} />
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetail}
                style={{ border: 'none', borderRadius: '10px' }}>
                ยกเลิก
              </Button>
              <Button variant="success" onClick={handleCloseDetail}
                style={{ border: 'none', borderRadius: '10px' }}>
                ตกลง
              </Button>
            </Modal.Footer>
          </Modal>


          {/* Confirm Popup */}
          <Modal show={showConfirmPopup} onHide={handleCloseConFirmPopup} centered>
            <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
              <Modal.Title>ยืนยันการดำเนินการ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>ยืนยันการดำเนินการหรือไม่?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConFirmPopup}
                style={{ border: 'none', borderRadius: '10px' }}>
                ยกเลิก
              </Button>
              <Button variant="success" color="success" onClick={handleConfirm}
                style={{ border: 'none', borderRadius: '10px' }}>
                ยืนยัน
              </Button>
            </Modal.Footer>
          </Modal>


          {/* confirm reject popup */}
          <Modal show={showRejectPopup} onHide={handleCloseRejectPopup} centered>
            <Modal.Header closeButton style={{ backgroundColor: "#F3C710", color: "#FFF" }}>
              <Modal.Title>ยืนยันตัวตน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>คุณแน่ใจหรือไม่ที่จะไม่อนุมัติผู้ใช้งานดังกล่าว</p>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>หมายเหตุ</Form.Label>
                  <Form.Control as="textarea" rows={3} type="text" placeholder="กรอกหมายเหตุ"
                    name="comment" onChange={handleChange}
                  />
                </Form.Group>
              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseRejectPopup}
                style={{ border: 'none', borderRadius: '10px' }}>
                ยกเลิก
              </Button>
              <Button variant="success" color="success" onClick={handleOpenConFirmRejectPopup}
                style={{ border: 'none', borderRadius: '10px' }}>
                ยืนยัน
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
