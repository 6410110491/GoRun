import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Row, Col, Form, Spinner, } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import Card_News from './Card_News';
import axios from 'axios';
import Aos from 'aos';
import { useTranslation } from 'react-i18next';

function News() {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: ''
  })
  const [userInfor, setUserInfor] = useState({});
  const [newsData, setNewsData] = useState([]); // เพิ่ม setNewsData
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // เพิ่ม setError

  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/userinfo`, {
          method: 'GET',
          credentials: 'include', // Include cookies for session-based auth
        });

        if (response.status === 401) {
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setUserInfor(data);
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
    const fetchNewsData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/news`, {
          method: 'GET',
          credentials: 'include', // Include cookies for session-based auth
        });

        if (response.ok) {
          const data = await response.json();
          setNewsData(data); // ตั้งค่าข้อมูลข่าวสาร
        } else {
          throw new Error('Failed to fetch news data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 1000, // กำหนดเวลาของแอนิเมชัน (มิลลิวินาที)
      easing: 'ease-in-out', // ปรับค่า easing ของแอนิเมชัน
      once: true, // ให้แอนิเมชันทำงานครั้งเดียวเมื่อเห็น element
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: file });
    }
  };

  // ส่งข้อมูลและอัปโหลดรูปภาพ
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (formData.image) {
        const formDataForImage = new FormData();
        formDataForImage.append('image', formData.image);

        // อัปโหลดรูปภาพ
        const uploadImage = await fetch(`${process.env.REACT_APP_API_URL}/api/images_upload`, {
          method: 'POST',
          credentials: 'include', // Include cookies for session-based auth
          body: formDataForImage,
        });

        if (!uploadImage.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadResponse = await uploadImage.json();
        imageUrl = uploadResponse.url;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/news`, {
        owner_id: userInfor._id,
        title: formData.title,
        description: formData.description,
        image: imageUrl
      }
      )

      if (response.status === 201) {
        handleClose(); // ปิด Modal เมื่ออัปเดตสำเร็จ
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update news');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className='mt-5' style={{ minHeight: "100vh" }}>
      {/* Head */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
          <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
            {t('ประชาสัมพันธ์')}
          </p>
        </div>
      </div>

      {/* ScroolToTop */}
      <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />
      {userInfor.role === 'organize' || userInfor.role === 'admin' ? (
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", margin: "16px 40px 16px 0px" }}>
          <Button variant="success" style={{ border: "none" }}
            onClick={handleShow}>
            {t('เพิ่มข่าวสาร')}
          </Button>
        </div>
      ) : null}

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
      ) : newsData && newsData.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center", minHeight: "100vh", marginTop: "3rem" }}>
          <p>{t('ไม่มีข้อมูล')}</p>
        </div>
      ) : (
        <div style={{ marginBottom: "5rem", marginTop: "3rem" }}>
          {newsData.map((data, index) => {
            return (
              <Card_News key={index} data={data} data-aos="fade-up" />
            )
          })}
        </div>)}



      <Modal show={show} onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header style={{ backgroundColor: "#F3C710", color: "#FFF" }} closeButton>
          <Modal.Title>{t('เพิ่มข่าวประชาสัมพันธ์')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xl={6} md={6} sm={12} className='mt-2'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
              <p>{t('หัวข้อข่าวสาร')}</p>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={t("กรอกหัวข้อ")}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={6} md={6} sm={12} className='mt-4'
              style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
              <p>{t('ข้อมูลข่าวสาร')}</p>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("กรอกข้อมูลข่าวสาร")}
                name="description"
              />
            </Col>
          </Row>
          <Row>
            <Col xl={6} md={6} sm={12} className='mt-4'>
              <Form.Group controlId='formProfilePicture'>
                <Form.Label>{t('รูปภาพ')}</Form.Label>
                <Form.Control
                  accept=".png,.jpg,.jpeg,"
                  type='file'
                  name='image'
                  placeholder='URL ของรูปภาพ'
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}
            style={{ border: 'none', borderRadius: '10px', width: "70px" }}>
            {t('ปิด')}
          </Button>
          <Button variant="success" color="success" onClick={handleSubmit}
            style={{ border: 'none', borderRadius: '10px', width: "70px" }}>
            {t('ยืนยัน')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}


export default News