import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Modal, Form, Spinner } from 'react-bootstrap';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import ScrollToTop from 'react-scroll-to-top';
import { useTranslation } from 'react-i18next';

let selectedFile = null;
function Personal_information() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        profilePicture: '',
        username: '',
        gender: '',
        birthDate: '',
        idCardNumber: '',
        email: '',
        phoneNumber: '',
        nationality: '',
        bloodType: '',
        chronicDiseases: '',


        address: '',
        subDistrict: '',
        district: '',
        province: '',
        zipCode: '',

    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changepage = (path) => {
        window.location.href = '/' + path;
    };

    const { t, i18n } = useTranslation()

    const formatDate = (date) => {
        if (!date) return '';

        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
        const day = String(d.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
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
    }, []);

    useEffect(() => {
        if (userInfo) {
            setFormData({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setFormData({ ...formData, profilePicture: file });
            selectedFile = file;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = formData.profilePicture;
            if (selectedFile) {
                const formDataForImage = new FormData();
                formDataForImage.append('image', selectedFile);

                // Upload image
                const uploadImage = await fetch('http://localhost:4000/api/images_upload', {
                    method: 'POST',
                    credentials: 'include', // Include cookies for session-based auth
                    body: formDataForImage,
                });

                if (!uploadImage.ok) {
                    throw new Error('Failed to upload image');
                }

                const uploadResponse = await uploadImage.json();
                imageUrl = uploadResponse.url
            }

            const response = await fetch('http://localhost:4000/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for session-based auth
                body: JSON.stringify({
                    username: formData.username,
                    personalInfo: {
                        gender: formData.gender,
                        profilePicture: imageUrl,
                        birthDate: formData.birthDate,
                        idCardNumber: formData.idCardNumber,
                        phoneNumber: formData.phoneNumber,
                        nationality: formData.nationality,
                        bloodType: formData.bloodType,
                        chronicDiseases: formData.chronicDiseases.split(',').map(disease => disease.trim()),
                    },
                    address: {
                        address: formData.address,
                        subDistrict: formData.subDistrict,
                        district: formData.district,
                        province: formData.province,
                        postalCode: formData.zipCode,
                    },
                }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserInfo(updatedUser);
                handleClose(); // Close the modal after successful update
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to update user information');
            }
        } catch (err) {
            setError(err.message);
        }
        // console.log('Form data:', formData);
    };

    return (
        <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        {t('ข้อมูลส่วนตัว')}
                    </p>
                </div>
            </div>

            {/* ScrollToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: '20px', backgroundColor: '#F3C710' }} />

            <div style={{
                marginTop: '48px',
                minHeight: '100vh',
                backgroundColor: '#E3E3E3',
                padding: '1rem 2rem',
                borderRadius: '10px',
                fontSize: '1rem',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                marginBottom: '2rem',
            }}>
                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : userInfo ? (
                    <div style={{
                        minHeight: '90vh', display: "flex", flexDirection: "column",
                        justifyContent: "space-evenly",
                    }}>
                        <Row style={{ width: "100%" }}>
                            <Col style={{ textAlign: "center", width: "100%" }}>
                                <img
                                    src={userInfo.personalInfo && userInfo.personalInfo.profilePicture
                                        ? userInfo.personalInfo.profilePicture
                                        : require('../image/blank_profile_image.png')}
                                    alt='profile-img'
                                    style={{
                                        width: "150px", height: "150px", borderRadius: "100%",
                                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginBottom: "1rem"
                                    }}
                                />
                                <p><strong>{t('ชื่อ')}:</strong> {userInfo.username}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col><p><strong>{t('เพศ')}:</strong> {userInfo.personalInfo?.gender || ""}</p></Col>
                            <Col><p><strong>{t('วันเดือนปีเกิด')}:</strong> {formatDate(userInfo.personalInfo?.birthDate) || ""}</p></Col>
                            <Col><p><strong>{t('เลขบัตรประชาชน')}:</strong> {userInfo.personalInfo?.idCardNumber || ""}</p></Col>
                        </Row>

                        <Row>
                            <Col xl={4} md={4} sm={6} xs={12}>
                                <p><strong>{t('อีเมล')}:</strong> {userInfo.email}
                                </p></Col>
                            <Col xl={4} md={4} sm={6} xs={12}>
                                <p><strong>{t('เบอร์โทรศัพท์')}:</strong> {userInfo.personalInfo?.phoneNumber || ""}
                                </p></Col>
                        </Row>

                        <Row>
                            <Col><p><strong>{t('สัญชาติ')}:</strong> {userInfo.personalInfo?.nationality || ""}</p></Col>
                            <Col><p><strong>{t('หมู่โลหิต')}:</strong> {userInfo.personalInfo?.bloodType || ""}</p></Col>
                            <Col><p><strong>{t('โรคประจำตัว')}:</strong> {userInfo.personalInfo?.chronicDiseases?.join(', ') || ""}</p></Col>
                        </Row>

                        <div style={{ maxWidth: "fit-content", textAlign: 'center', marginTop: "0.75rem" }}>
                            <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
                                {t('ที่อยู่ปัจจุบัน')}
                            </p>
                        </div>
                        <Row>
                            <Col><p><strong>{t('ที่อยู่')}:</strong> {userInfo.address?.address || ""}</p></Col>
                            <Col><p><strong>{t('ตำบล/แขวง')}:</strong> {userInfo.address?.subDistrict || ""}</p></Col>
                            <Col><p><strong>{t('อำเภอ/เขต')}:</strong> {userInfo.address?.district || ""}</p></Col>
                        </Row>

                        <Row>
                            <Col xl={4} md={4} sm={6} xs={12}>
                                <p><strong>{t('จังหวัด')}:</strong> {userInfo.address?.province}
                                </p></Col>
                            <Col xl={4} md={4} sm={6} xs={12}>
                                <p><strong>{t('รหัสไปรษณีย์')}:</strong> {userInfo.address?.postalCode || ""}
                                </p></Col>
                        </Row>

                    </div>
                ) : (
                    <p>No user information available.</p>
                )}
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Button variant="danger" style={{ border: "none", width: "150px" }}
                    onClick={handleShow}>
                    {t('แก้ไข')}
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header style={{ backgroundColor: "#F3C710", color: "#FFF" }} closeButton>
                    <Modal.Title>{t('แก้ไขข้อมูลส่วนตัว')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {userInfo ? (
                        <div style={{
                            minHeight: '60vh',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}>
                            <Form onSubmit={handleSubmit}>
                                <Row className='mb-3'>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formUsername'>
                                            <Form.Label>{t('ชื่อ')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='username'
                                                value={formData.username}
                                                onChange={handleChange}
                                                placeholder={t('กรอกชื่อ')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formProfilePicture'>
                                            <Form.Label>{t('รูปโปรไฟล์')}</Form.Label>
                                            <Form.Control
                                                accept=".png,.jpg,.jpeg,"
                                                type='file'
                                                name='image'
                                                placeholder={t('URL ของรูปโปรไฟล์')}
                                                onChange={handleFileChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formGender'>
                                            <Form.Label>{t('เพศ')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='gender'
                                                value={formData.gender}
                                                onChange={handleChange}
                                                placeholder={t('กรอกเพศ')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formBirthDate'>
                                            <Form.Label>{t('วันเดือนปีเกิด')}</Form.Label>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} >
                                                    <DatePicker
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        value={formData.birthDate ? dayjs(formData.birthDate) : null}
                                                        onChange={(dueDate) => setFormData({ ...formData, birthDate: dueDate })}
                                                        format="DD/MM/YYYY"
                                                        sx={{
                                                            width: '100%',
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '0.25rem', // Border radius ที่คล้ายกับ Form.Control
                                                                '& fieldset': {
                                                                    borderColor: '#ced4da', // สีของขอบ
                                                                    borderWidth: '1px', // ความหนาของขอบ
                                                                },
                                                                '&:hover fieldset': {
                                                                    borderColor: '#80bdff', // สีของขอบเมื่อโฮเวอร์
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#80bdff', // สีของขอบเมื่อโฟกัส
                                                                    boxShadow: '0 0 0 0 rgba(0, 123, 255, 0.25)', // การตั้งค่า box-shadow เมื่อโฟกัส
                                                                },
                                                            },
                                                            '& .MuiInputBase-input': {
                                                                padding: '.375rem .75rem', // การตั้งค่า padding
                                                                fontSize: '1rem', // ขนาดตัวอักษร
                                                                lineHeight: '1.5', // ความสูงบรรทัด
                                                                backgroundColor: '#fff', // สีพื้นหลังที่คล้ายกับ Form.Control
                                                                border: '1px solid #ced4da', // สีขอบที่คล้ายกับ Form.Control
                                                            },
                                                            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out', // การตั้งค่า transition
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formIdCardNumber'>
                                            <Form.Label>{t('เลขบัตรประชาชน')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='idCardNumber'
                                                value={formData.idCardNumber}
                                                onChange={handleChange}
                                                placeholder={t('กรอกเลขบัตรประชาชน')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formEmail'>
                                            <Form.Label>{t('อีเมล')}</Form.Label>
                                            <Form.Control
                                                type='email'
                                                name='email'
                                                value={formData.email}
                                                readOnly
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formPhoneNumber'>
                                            <Form.Label>{t('เบอร์โทรศัพท์')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='phoneNumber'
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                placeholder={t('กรอกเบอร์โทรศัพท์')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formNationality'>
                                            <Form.Label>{t('สัญชาติ')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='nationality'
                                                value={formData.nationality}
                                                onChange={handleChange}
                                                placeholder={t('กรอกสัญชาติ')}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formBloodType'>
                                            <Form.Label>{t('หมู่โลหิต')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='bloodType'
                                                value={formData.bloodType}
                                                onChange={handleChange}
                                                placeholder={t('กรอกหมู่โลหิต')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formChronicDiseases'>
                                            <Form.Label>{t('โรคประจำตัว')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='chronicDiseases'
                                                value={formData.chronicDiseases}
                                                onChange={handleChange}
                                                placeholder={t('กรอกโรคประจำตัว')}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formBloodType'>
                                            <Form.Label>{t('ที่อยู่')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='address'
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder={t('กรอกที่อยู่')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formChronicDiseases'>
                                            <Form.Label>{t('ตำบล/แขวง')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='subDistrict'
                                                value={formData.subDistrict}
                                                onChange={handleChange}
                                                placeholder={t('กรอกตำบล/แขวง')}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formBloodType'>
                                            <Form.Label>{t('อำเภอ/เขต')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='district'
                                                value={formData.district}
                                                onChange={handleChange}
                                                placeholder={t('กรอกอำเภอ/เขต')}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formChronicDiseases'>
                                            <Form.Label>{t('จังหวัด')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='province'
                                                value={formData.province}
                                                onChange={handleChange}
                                                placeholder={t('กรอกจังหวัด')}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col xl={6} md={6} sm={12}>
                                        <Form.Group controlId='formBloodType'>
                                            <Form.Label>{t('รหัสไปรษณีย์')}</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='zipCode'
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                placeholder={t('กรอกรหัสไปรษณีย์')}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Form>
                        </div>
                    ) : (
                        <p>No user information available.</p>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('ปิด')}
                    </Button>
                    <Button variant="success" color="success" onClick={handleSubmit}
                        style={{ border: 'none', borderRadius: '10px' }}>
                        {t('บันทึก')}
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default Personal_information;
