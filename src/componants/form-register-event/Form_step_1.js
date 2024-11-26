import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Form_step_1({ formData, setFormData, loading, setLoading, error, setError, eventData, setEventData, userInfo }) {
    const { id } = useParams();
    const gender = ["ชาย", "หญิง", "อื่นๆ"];
    const blood_group = ["A", "B", "AB", "O"];
    const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);

    const { t, i18n } = useTranslation()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    useEffect(() => {
        if (userInfo && !isUserInfoLoaded) {
            setFormData((prevData) => ({
                ...prevData,
                profilePicture: formData.profilePicture || userInfo?.personalInfo?.profilePicture,
                username: formData.username || userInfo?.username,
                gender: formData.gender || userInfo?.personalInfo?.gender,
                birthDate: formData.birthDate || userInfo?.personalInfo?.birthDate,
                idCardNumber: formData.idCardNumber || userInfo?.personalInfo?.idCardNumber,
                email: formData.email || userInfo?.email,
                phoneNumber: formData.phoneNumber || userInfo?.personalInfo?.phoneNumber,
                nationality: formData.nationality || userInfo?.personalInfo?.nationality,
                bloodType: formData.bloodType || userInfo?.personalInfo?.bloodType,
                chronicDiseases: formData.chronicDiseases || userInfo?.personalInfo?.chronicDiseases?.join(', '),

                address: formData.address || userInfo?.address?.address,
                subDistrict: formData.subDistrict || userInfo?.address?.subDistrict,
                district: formData.district || userInfo?.address?.district,
                province: formData.province || userInfo?.address?.province,
                zipCode: formData.zipCode || userInfo?.address?.postalCode,
            }));
            setIsUserInfoLoaded(true); // ตั้งค่า state ว่าข้อมูลโหลดแล้ว
        }
    }, [userInfo, isUserInfoLoaded]);


    const saveDraft = async () => {
        const eventRegisData = {
            user_id: userInfo._id,
            username: formData.username,
            gender: formData.gender,
            birthDate: formData.birthDate,
            idCardNumber: formData.idCardNumber,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            nationality: formData.nationality,
            bloodType: formData.bloodType,
            chronicDiseases: formData.chronicDiseases,
            address: formData.address,
            subDistrict: formData.subDistrict,
            district: formData.district,
            province: formData.province,
            zipCode: formData.zipCode,
            sportType: formData.sport,
            raceType: formData.raceType,
            registrationFee: formData.registrationFee,
            shirt: formData.shirt,
            shirtSize: formData.shirtSize,
            etc: formData.etc,
            nameShip: formData.nameShip,
            lastNameShip: formData.lastNameShip,
            phoneNumberShip: formData.phoneNumberShip,
            addressShip: formData.addressShip,
            subDistrictShip: formData.subDistrictShip,
            districtShip: formData.districtShip,
            provinceShip: formData.provinceShip,
            zipCodeShip: formData.zipCodeShip,
            datePay: formData.datePay,
            timePay: formData.timePay,

            registrationDate: new Date(),
            paymentSlipDate: formData.datePay,
            paymentSlipTime: formData.timePay,
        };

        try {
            const eventResponse = await axios.post(`http://localhost:4000/api/register/${id}`, eventRegisData);
        } catch (err) {
            console.error('Error:', err);
        }
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <div>{error}</div>
            ) : userInfo ? (
                <Container className='mt-3' fluid style={{
                    backgroundColor: "#E3E3E3", minHeight: "260px", padding: "1rem 2rem 1rem 2rem",
                    borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }}>
                    <Row>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", alignItems: "center" }}>
                            <img
                                src={userInfo.personalInfo?.profilePicture || require('../../image/blank_profile_image.png')}
                                alt='logo.jpg'
                                style={{ width: "100px", height: "100px", borderRadius: "100%" }}
                            />

                            <div className='ms-3'>
                                <p>{t('รูปภาพประจำตัว')}</p>
                            </div>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>{t('ชื่อ-สกุล')}</p>
                                <Form.Control type='text'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    onBlur={saveDraft}
                                    placeholder={t('กรอกชื่อ')}
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>{t('เพศ')}</p>
                                <Form.Select aria-label="Default select example"
                                    type='text'
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleChange}
                                    onBlur={saveDraft}
                                    placeholder={t('กรอกเพศ')}
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                        cursor: "pointer"
                                    }}
                                // defaultValue={formData.gender} // ตั้งค่า default value
                                >
                                    <option value="">{t('ไม่ระบุ')}</option>
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
                                <p>{t('วันเดือนปีเกิด')}</p>
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
                                <p>{t('เลขบัตรประชาชน')}</p>
                                <Form.Control type='text'
                                    name='idCardNumber'
                                    value={formData.idCardNumber}
                                    onChange={handleChange}
                                    onBlur={saveDraft}
                                    placeholder={t('กรอกเลขบัตรประชาชน')}
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={4} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>{t('อีเมล')}</p>
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
                                <p>{t('เบอร์โทรศัพท์')}</p>
                                <Form.Control type='text'
                                    name='phoneNumber'
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={saveDraft}
                                    placeholder={t('กรอกเบอร์โทรศัพท์')}
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>{t('สัญชาติ')}</p>
                                <Form.Control
                                    type='text'
                                    name='nationality'
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    onBlur={saveDraft}
                                    placeholder={t('กรอกสัญชาติ')}
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>{t('หมู่โลหิต')}</p>
                                <Form.Select aria-label="Default select example" style={{
                                    borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                    backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    cursor: "pointer"
                                }}
                                    name='bloodType'
                                    // defaultValue={formData.bloodType} // ตั้งค่า default value
                                    onChange={handleChange}
                                    onBlur={saveDraft}
                                    value={formData.bloodType}
                                >
                                    <option value="">{t('ไม่ระบุ')}</option>
                                    {blood_group.map((data, index) => (
                                        <option key={index} value={data}>{data}</option> // ใช้ value ที่เป็นค่า bloodType จริงๆ
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Form.Group>
                                <p>{t('โรคประจำตัว')}</p>
                                <Form.Control
                                    type='text'
                                    name='chronicDiseases'
                                    value={formData.chronicDiseases}
                                    onChange={handleChange}
                                    onBlur={saveDraft}
                                    placeholder={t('กรอกโรคประจำตัว')}
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
