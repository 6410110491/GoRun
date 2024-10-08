import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function Form_step_1({ formData, setFormData, loading, setLoading, error, setError, eventData, setEventData }) {
    const gender = ["ชาย", "หญิง", "อื่นๆ"];
    const blood_group = ["A", "B", "AB", "O"];

    const [userInfo, setUserInfo] = useState(null);


    const changepage = (path) => {
        window.location.href = '/' + path;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/userinfo', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for session-based auth
                });

                if (response.status === 401) {
                    // Redirect to login if not authenticated
                    changepage('login'); // Adjust the path as necessary
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    throw new Error('Failed to fetch user info');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []); // Add history to dependencies to avoid warnings

    useEffect(() => {
        if (userInfo) {
            setFormData({
                organization: userInfo.organization || '',
                profilePicture: userInfo.personalInfo?.profilePicture || '',
                username: userInfo.username || '',
                gender: userInfo.personalInfo?.gender || '',
                birthDate: userInfo.personalInfo?.birthDate || '',
                idCardNumber: userInfo.personalInfo?.idCardNumber || '',
                email: userInfo.email || '',
                phoneNumber: userInfo.personalInfo?.phoneNumber || '',
                nationality: userInfo.personalInfo?.nationality || '',
                bloodType: userInfo.personalInfo?.bloodType || '',
                chronicDiseases: userInfo.personalInfo?.chronicDiseases?.join(', ') || '',

                address: userInfo.address?.address || '',
                subDistrict: userInfo.address?.subDistrict || '',
                district: userInfo.address?.district || '',
                province: userInfo.address?.province || '',
                zipCode: userInfo.address?.postalCode || '',
            });
        }
    }, [userInfo]);


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : userInfo ? (
                <Container className='mt-3' fluid style={{
                    backgroundColor: "#E3E3E3", minHeight: "260px", padding: "1rem 2rem 1rem 2rem",
                    borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }}>
                    <Row>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", alignItems: "center" }}>
                            <img src={userInfo.personalInfo && userInfo.personalInfo.profilePicture
                                ? userInfo.personalInfo.profilePicture
                                : require('../../image/blank_profile_image.png')} alt='logo.jpg'
                                style={{ width: "100px", height: "100px", borderRadius: "100%" }} />
                            <div className='ms-3'>
                                <p>รูปภาพประจำตัว</p>
                            </div>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>ชื่อ-สกุล</p>
                                <Form.Control type='text'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder='กรอกชื่อ'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>เพศ</p>
                                <Form.Select aria-label="Default select example"
                                    type='text'
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleChange}
                                    placeholder='กรอกเพศ'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                        cursor: "pointer"
                                    }}
                                    defaultValue={formData.gender} // ตั้งค่า default value
                                >
                                    <option value="">ไม่ระบุ</option>
                                    {gender.map((data, index) => (
                                        <option key={index} value={data}>{data}</option> // ใช้ value ที่เป็นค่า gender จริงๆ
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='mt-3'>
                        <Col xl={4} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>วันเดือนปีเกิด</p>
                                <div style={{ marginTop: "-12px" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']} >
                                            <DatePicker
                                                slotProps={{ textField: { size: 'small' } }}
                                                sx={{
                                                    width: '95%',
                                                    backgroundColor: "#FFF",
                                                    borderRadius: "10px",
                                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                                    "& MuiInputBase-root": { border: "none", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }
                                                }}
                                                value={formData.birthDate ? dayjs(formData.birthDate) : null}
                                                onChange={(dueDate) => setFormData({ ...formData, birthDate: dueDate })}
                                                format="DD/MM/YYYY"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col xl={4} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>เลขประจำตัวประชาชน</p>
                                <Form.Control type='text'
                                    name='idCardNumber'
                                    value={formData.idCardNumber}
                                    onChange={handleChange}
                                    placeholder='กรอกเลขบัตรประชาชน'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={4} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>อีเมล</p>
                                <Form.Control type='email'
                                    name='email'
                                    value={formData.email}
                                    readOnly
                                    disabled
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='mt-3 mb-5'>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>เบอร์โทรศัพท์</p>
                                <Form.Control type='text'
                                    name='phoneNumber'
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder='กรอกเบอร์โทรศัพท์'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>สัญชาติ</p>
                                <Form.Control
                                    type='text'
                                    name='nationality'
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    placeholder='กรอกสัญชาติ'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>หมู่โลหิต</p>
                                <Form.Select aria-label="Default select example" style={{
                                    borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                    backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    cursor: "pointer"
                                }}
                                    name='bloodType'
                                    defaultValue={formData.bloodType} // ตั้งค่า default value
                                    onChange={handleChange}
                                    value={formData.bloodType}
                                >
                                    <option value="">ไม่ระบุ</option>
                                    {blood_group.map((data, index) => (
                                        <option key={index} value={data}>{data}</option> // ใช้ value ที่เป็นค่า bloodType จริงๆ
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>โรคประจำตัว</p>
                                <Form.Control
                                    type='text'
                                    name='chronicDiseases'
                                    value={formData.chronicDiseases}
                                    onChange={handleChange}
                                    placeholder='กรอกโรคประจำตัว'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <p>No user information available.</p>
            )}
        </div>
    )
}

export default Form_step_1;
