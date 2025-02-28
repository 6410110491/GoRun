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

function Form_step_1({ formData, setFormData, loading, setLoading, error, setError, eventData, setEventData, userInfo, formRef, validated,
    datePickerValidateStyles, birthDatePickerRef
}) {
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
        if (userInfo) {
            setFormData((prevData) => ({
                ...prevData,
                profilePicture: userInfo.personalInfo?.profilePicture || formData.profilePicture,
                username: userInfo.username || formData.username,
                gender: userInfo.personalInfo?.gender || formData.gender,
                birthDate: userInfo.personalInfo?.birthDate || formData.birthDate,
                idCardNumber: userInfo.personalInfo?.idCardNumber || formData.idCardNumber,
                email: userInfo.email || formData.email,
                phoneNumber: userInfo.personalInfo?.phoneNumber || formData.phoneNumber,
                nationality: userInfo.personalInfo?.nationality || formData.nationality,
                bloodType: userInfo.personalInfo?.bloodType || formData.bloodType,
                chronicDiseases: userInfo.personalInfo?.chronicDiseases?.join(', ') || formData.chronicDiseases,

                address: userInfo.address?.address || formData.address,
                subDistrict: userInfo.address?.subDistrict || formData.subDistrict,
                district: userInfo.address?.district || formData.district,
                province: userInfo.address?.province || formData.province,
                zipCode: userInfo.address?.postalCode || formData.zipCode,
            }));
        }
    }, [userInfo]);


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

            // registrationDate: new Date(),
            paymentSlipDate: formData.datePay,
            paymentSlipTime: formData.timePay,

            shippingChoice: formData.shippingChoice
        };

        try {
            const eventResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/register/${id}`, eventRegisData);
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
                    <Form ref={formRef} noValidate validated={validated}>
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
                                <p>{t('ชื่อ-สกุล')} <span className='requiredstar'>*</span></p>
                                <Form.Group as={Row} controlId="formUsername" style={{ paddingInline: "12px" }}>
                                    <Form.Control type='text'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                        onBlur={saveDraft}
                                        placeholder={t('กรอกชื่อ')}
                                        required
                                        style={{
                                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                            backgroundColor: "#fff", height: "40px"
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col xl={3} md={6} sm={12} className='mt-2'
                                style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <p>{t('เพศ')} <span className='requiredstar'>*</span></p>
                                <Form.Group as={Row} controlId="formGender" style={{ paddingInline: "12px" }}>
                                    <Form.Select aria-label="Default select example"
                                        type='text'
                                        name='gender'
                                        value={formData.gender}
                                        onChange={handleChange}
                                        onBlur={saveDraft}
                                        placeholder={t('กรอกเพศ')}
                                        required
                                        style={{
                                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                            backgroundColor: "#fff", height: "40px",
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
                                <p>{t('วันเดือนปีเกิด')} <span className='requiredstar'>*</span></p>
                                <Form.Group as={Row} controlId="formBirthDate">
                                    <div style={{ marginTop: "-12px" }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']} sx={{ padding: "0", marginTop: "-2px", overflow: "unset" }}>
                                                <DatePicker
                                                    slotProps={{ textField: { size: 'small' } }}
                                                    required={true}
                                                    sx={datePickerValidateStyles("birthDate")}
                                                    value={formData.birthDate ? dayjs(formData.birthDate) : null}
                                                    onChange={(dueDate) => setFormData({ ...formData, birthDate: dueDate })}
                                                    format="DD/MM/YYYY"
                                                    ref={birthDatePickerRef}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col xl={4} md={6} sm={12} className='mt-2'
                                style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <p>{t('เลขบัตรประชาชน')} <span className='requiredstar'>*</span></p>
                                <Form.Group as={Row} controlId="formIdCardNumber" style={{ paddingInline: "12px" }}>
                                    <Form.Control
                                        name='idCardNumber'
                                        value={formData.idCardNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            if (value.length <= 13) {
                                                handleChange({ target: { name: 'idCardNumber', value } });
                                            }
                                        }}
                                        onBlur={saveDraft}
                                        placeholder={t('กรอกเลขบัตรประชาชน')}
                                        type='text'
                                        required
                                        style={{
                                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                            backgroundColor: "#fff", height: "40px"
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col xl={4} md={6} sm={12} className='mt-2'
                                style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <p>{t('อีเมล')} <span className='requiredstar'>*</span></p>
                                <Form.Group as={Row} controlId="formEmail" style={{ paddingInline: "12px" }}>
                                    <Form.Control type='email'
                                        name='email'
                                        value={formData.email}
                                        readOnly
                                        disabled
                                        required
                                        style={{
                                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                            backgroundColor: "#fff", height: "40px"
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='mt-3 mb-5'>
                            <Col xl={3} md={6} sm={12} className='mt-2'
                                style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <p>{t('เบอร์โทรศัพท์')} <span className='requiredstar'>*</span></p>
                                <Form.Group as={Row} controlId="formPhoneNumber" style={{ paddingInline: "12px" }}>
                                    <Form.Control
                                        name='phoneNumber'
                                        value={formData.phoneNumber}
                                        type='text'
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ''); 
                                            if (value.length <= 10) {
                                                handleChange({ target: { name: 'phoneNumber', value } });
                                            }
                                        }}
                                        onBlur={saveDraft}
                                        placeholder={t('กรอกเบอร์โทรศัพท์')}
                                        required
                                        style={{
                                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                            backgroundColor: "#fff", height: "40px"
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
                                            backgroundColor: "#fff", height: "40px"
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col xl={3} md={6} sm={12} className='mt-2'
                                style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <Form.Group>
                                    <p>{t('หมู่โลหิต')}</p>
                                    <Form.Select aria-label="Default select example" style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", height: "40px",
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
                                            backgroundColor: "#fff", height: "40px"
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            ) : (
                <p>No user information available</p>
            )}
        </div>
    )
}

export default Form_step_1;
