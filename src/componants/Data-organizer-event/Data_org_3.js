import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Form, InputGroup, Button, } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

let selectedFile = null;
function Data_org_3({ formData, setFormData, isEditMode, formRef, validated, setValidated }) {
    const { t, i18n } = useTranslation()

    const [previewReceiveImages, setPreviewReceiveImages] = useState([]);
    const [previewRouteImages, setPreviewRouteImages] = useState([]);
    const [previewPromptPayImages, setPreviewPromptPayImages] = useState(null);

    useEffect(() => {
        // สำหรับภาพสิ่งที่จะได้รับ
        if (formData.whatToReceive && Array.isArray(formData.whatToReceive)) {
            setPreviewReceiveImages(
                formData.whatToReceive.map((file) =>
                    typeof file === "string" ? file : URL.createObjectURL(file)
                )
            );
        }

        // สำหรับภาพเส้นทางการแข่งขัน
        if (formData.route && Array.isArray(formData.route)) {
            setPreviewRouteImages(
                formData.route.map((file) =>
                    typeof file === "string" ? file : URL.createObjectURL(file)
                )
            );
        }

        //สำหรับภาพ QR Code 
        if (formData.promptPayImage) {
            setPreviewPromptPayImages(
                typeof formData.promptPayImage === "string"
                    ? formData.promptPayImage
                    : URL.createObjectURL(formData.promptPayImage)
            );
        }

    }, [formData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleReceiveChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
            // สร้าง URL สำหรับแสดงภาพตัวอย่าง
            const previewUrls = files.map((file) => URL.createObjectURL(file));

            // อัปเดตรูปภาพตัวอย่าง (เพิ่มใหม่ต่อจากเดิม)
            setPreviewReceiveImages((prev) => [...prev, ...previewUrls]);

            // อัปเดตฟิลด์ `whatToReceive` ใน `formData` (เพิ่มใหม่ต่อจากเดิม)
            setFormData((prevFormData) => ({
                ...prevFormData,
                whatToReceive: [...(prevFormData.whatToReceive || []), ...files],
            }));
        }
    };

    const handleRouteChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
            // สร้าง URL สำหรับแสดงภาพตัวอย่าง
            const previewUrls = files.map((file) => URL.createObjectURL(file));

            // อัปเดตรูปภาพตัวอย่าง (เพิ่มใหม่ต่อจากเดิม)
            setPreviewRouteImages((prev) => [...prev, ...previewUrls]);

            // อัปเดตฟิลด์ `route` ใน `formData` (เพิ่มใหม่ต่อจากเดิม)
            setFormData((prevFormData) => ({
                ...prevFormData,
                route: [...(prevFormData.route || []), ...files],
            }));
        }
    };

    const handlePromptPayChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewPromptPayImages(reader.result);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    promptPayImage: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveReceiveImage = (index) => {
        setPreviewReceiveImages((prev) => prev.filter((_, i) => i !== index));
        setFormData((prevFormData) => ({
            ...prevFormData,
            whatToReceive: prevFormData.whatToReceive.filter((_, i) => i !== index),
        }));
    };

    const handleRemoveRouteImage = (index) => {
        setPreviewRouteImages((prev) => prev.filter((_, i) => i !== index));
        setFormData((prevFormData) => ({
            ...prevFormData,
            route: prevFormData.route.filter((_, i) => i !== index),
        }));
    };

    const handleRemovePromptPayImage = () => {
        setPreviewPromptPayImages(null);
        setFormData(prevFormData => ({
            ...prevFormData,
            promptPayImage: ""
        }));
    };


    const handleAddShirtForm = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            product: {
                ...prevFormData.product,
                shirt: [...(prevFormData.product?.shirt || []), ""]
            }
        }));
    };

    const handleAddShirtChange = (index, e) => {
        const { value } = e.target;
        const newShirt = [...(formData.product?.shirt || [])];
        newShirt[index] = value;
        setFormData(prevFormData => ({
            ...prevFormData,
            product: {
                ...prevFormData.product,
                shirt: newShirt
            }
        }));
    };

    const handleRemoveShirtForm = () => {
        setFormData(prevFormData => {
            const newShirtArray = [...prevFormData.product.shirt];
            newShirtArray.pop(); // ลบฟอร์มตัวสุดท้ายออก
            return {
                ...prevFormData,
                product: {
                    ...prevFormData.product,
                    shirt: newShirtArray
                }
            };
        });
    };


    const handleAddShirtSizeForm = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            product: {
                ...prevFormData.product,
                shirtsize: [...(prevFormData.product?.shirtsize || []), ""]
            }
        }));
    };

    const handleAddShirtSizeChange = (index, e) => {
        const { value } = e.target;
        const newShirtSize = [...(formData.product?.shirtsize || [])];
        newShirtSize[index] = value;
        setFormData(prevFormData => ({
            ...prevFormData,
            product: {
                ...prevFormData.product,
                shirtsize: newShirtSize
            }
        }));
    };

    const handleRemoveShirtSizeForm = () => {
        setFormData(prevFormData => {
            const newShirtSizeArray = [...prevFormData.product.shirtsize];
            newShirtSizeArray.pop(); // ลบฟอร์มตัวสุดท้ายออก
            return {
                ...prevFormData,
                product: {
                    ...prevFormData.product,
                    shirtsize: newShirtSizeArray
                }
            };
        });
    };


    const handleAddEtcForm = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            product: {
                ...prevFormData.product,
                etc: [...(prevFormData.product?.etc || []), ""]
            }
        }));
    };

    const handleAddEtcChange = (index, e) => {
        const { value } = e.target;
        const newEtc = [...(formData.product?.etc || [])];
        newEtc[index] = value;
        setFormData(prevFormData => ({
            ...prevFormData,
            product: {
                ...prevFormData.product,
                etc: newEtc
            }
        }));
    };

    const handleRemoveEtcForm = () => {
        setFormData(prevFormData => {
            const newEtcArray = [...prevFormData.product.etc];
            newEtcArray.pop(); // ลบฟอร์มตัวสุดท้ายออก
            return {
                ...prevFormData,
                product: {
                    ...prevFormData.product,
                    etc: newEtcArray
                }
            };
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setFormData({ ...formData, promptPayImage: file });
            selectedFile = file;
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, value, type, checked } = e.target;

        const updatedValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));
    };

    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        {isEditMode ? t('แก้ไขรายละเอียดงาน') : t('รายละเอียดงาน')}
                    </p>
                </div>
            </div>

            <Form ref={formRef} noValidate validated={validated}>

                {/* ScroolToTop */}
                <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />


                <Container className='mt-5' fluid style={{
                    minHeight: "100vh",
                    backgroundColor: "#E3E3E3", minHeightheight: "260px", padding: "1rem 2rem 1rem 2rem",
                    borderRadius: "10px", fontSize: "1rem", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }}>
                    <Row>
                        <Col xl={6} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            <p style={{ margin: "0" }}>{t('สิ่งที่จะได้รับ')} <span className='requiredstar'>*</span></p>
                            <Form.Group controlId='formReceivePicture'>
                                <Form.Control
                                    accept=".png,.jpg,.jpeg"
                                    type="file"
                                    multiple
                                    name="receiveImages"
                                    onChange={handleReceiveChange}
                                    required={formData.whatToReceive.length === 0}
                                />
                            </Form.Group>

                            {/* แสดงตัวอย่างรูปภาพ */}
                            <Row className="mt-3">
                                {previewReceiveImages &&
                                    previewReceiveImages
                                        .filter((image) => typeof image === "string" ? image.trim() !== "" : true) // กรอง string ที่ไม่ใช่ค่าว่าง
                                        .map((image, index) => (
                                            <Col xs={6} md={4} lg={3} className="mb-3" key={index}>
                                                <div style={{ position: "relative", textAlign: "center" }}>
                                                    <img
                                                        src={typeof image === "string" ?
                                                            image :
                                                            URL.createObjectURL(image)} // ตรวจสอบชนิดข้อมูลก่อน
                                                        alt={`Uploaded preview ${index}`}
                                                        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                                                    />
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        style={{
                                                            position: "absolute",
                                                            top: "5px",
                                                            right: "5px",
                                                            borderRadius: "50%",
                                                            border: "none"
                                                        }}
                                                        onClick={() => handleRemoveReceiveImage(index)}
                                                    >
                                                        &times;
                                                    </Button>
                                                </div>
                                            </Col>
                                        ))}
                            </Row>
                        </Col>
                        <Col xl={6} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            <p style={{ margin: "0" }}>{t('เส้นทางการแข่งขัน')} <span className='requiredstar'>*</span></p>
                            <Form.Group controlId='formRoutePicture'>
                                <Form.Control
                                    accept=".png,.jpg,.jpeg"
                                    type="file"
                                    multiple
                                    name="routeImages"
                                    onChange={handleRouteChange}
                                    required={formData.route.length === 0}
                                />
                            </Form.Group>

                            {/* แสดงตัวอย่างรูปภาพ */}
                            <Row className="mt-3">
                                {previewRouteImages &&
                                    previewRouteImages
                                        .filter((image) => typeof image === "string" ? image.trim() !== "" : true) // กรอง string ที่ไม่ใช่ค่าว่าง
                                        .map((image, index) => (
                                            <Col xs={6} md={4} lg={3} className="mb-3" key={index}>
                                                <div style={{ position: "relative", textAlign: "center" }}>
                                                    <img
                                                        src={typeof image === "string" ?
                                                            image :
                                                            URL.createObjectURL(image)} // ตรวจสอบชนิดข้อมูลก่อน
                                                        alt={`Uploaded preview ${index}`}
                                                        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                                                    />
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        style={{
                                                            position: "absolute",
                                                            top: "5px",
                                                            right: "5px",
                                                            borderRadius: "50%",
                                                            border: "none"
                                                        }}
                                                        onClick={() => handleRemoveRouteImage(index)}
                                                    >
                                                        &times;
                                                    </Button>
                                                </div>
                                            </Col>
                                        ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col xl={6} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p>{t('ที่พัก')}</p>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                type="text"
                                placeholder={t("กรอกที่พัก")}
                                name="accommodation"
                                value={formData.accommodation}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                    backgroundColor: "#fff", height: "100%"
                                }} />
                        </Col>
                        <Col xl={6} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p>{t('ร้านอาหาร')}</p>
                            <Form.Control as="textarea"
                                rows={3}
                                type="text"
                                placeholder={t("กรอกร้านอาหาร")}
                                name="foodStalls"
                                value={formData.foodStalls}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                    backgroundColor: "#fff", height: "100%"
                                }} />
                        </Col>
                    </Row>

                    <Row className='mt-3'>
                        <Col xl={6} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p>{t('ข้อมูลเพิ่มเติม')}</p>
                            <Form.Control as="textarea"
                                rows={3}
                                type="text"
                                placeholder={t("กรอกข้อมูลเพิ่มเติม")}
                                name="etcInfo"
                                value={formData.etcInfo}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                    backgroundColor: "#fff", height: "100%"
                                }} />
                        </Col>
                    </Row>


                    <Row className='mt-3' style={{ marginBottom: "48px" }}>
                        <Col xl={6} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            <p >{t('แผนที่ตำแหน่งการจัดงาน')}</p>
                            <Row>
                                <Col xl={6} md={6} sm={6} >
                                    <p>{t('ละติจูด')} <span className='requiredstar'>*</span></p>
                                    <Form.Control type='text'
                                        name='latitude'
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        placeholder={t('กรอกละติจูด')}
                                        required
                                        style={{
                                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                            backgroundColor: "#fff", height: "40px"
                                        }} />
                                </Col>
                                <Col xl={6} md={6} sm={6} >
                                    <p>{t('ลองจิจูด')} <span className='requiredstar'>*</span></p>
                                    <Form.Control type='text'
                                        name='longitude'
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        placeholder={t('กรอกลองจิจูด')}
                                        required
                                        style={{
                                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                            backgroundColor: "#fff", height: "40px"
                                        }} />
                                </Col>
                            </Row>

                        </Col>

                    </Row>


                    <div style={{ width: "15%", textAlign: 'center' }}>
                        <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
                            {t('สินค้า')}
                        </p>
                    </div>

                    <Row>
                        <p>{t('ช่องทางการรับสินค้า (เลือกอย่างน้อย 1 ช่องทาง)')} <span className='requiredstar'>*</span></p>
                        <Form.Check
                            type="checkbox"
                            id="onsiteStatus"
                            label={t("รับสินค้าหน้างาน")}
                            name="onsiteStatus"
                            onChange={handleCheckboxChange}
                            checked={formData.onsiteStatus}
                            style={{ paddingInline: "36px" }}
                            required={!formData.shippingStatus}
                        />
                        <Form.Check
                            type="checkbox"
                            id="shippingStatus"
                            label={t("จัดส่งสินค้า")}
                            name="shippingStatus"
                            onChange={handleCheckboxChange}
                            checked={formData.shippingStatus}
                            style={{ paddingInline: "36px" }}
                            required={!formData.onsiteStatus}
                        />
                    </Row>


                    <Row className='mt-3'>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            {formData.product?.shirt && formData.product.shirt.map((product, index) => (
                                <Row key={index} className='mt-2'>
                                    <p>{t('ประเภทเสื้อ')} <span className='requiredstar'>*</span></p>
                                    <Form.Group as={Row} controlId="formShirt" style={{ paddingInline: "12px" }}>
                                        <Form.Control
                                            type='text'
                                            name='shirt'
                                            value={product}
                                            onChange={(e) => handleAddShirtChange(index, e)}
                                            placeholder={t('กรอกประเภทเสื้อ')}
                                            required
                                            style={{
                                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                                backgroundColor: "#fff", height: "40px"
                                            }}
                                        />
                                    </Form.Group>
                                </Row>
                            ))}
                            <div style={{ display: "flex", justifyContent: "end" }}>
                                <Button className="mt-3" onClick={handleAddShirtForm}
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        border: "none", borderRadius: "10px", width: "fit-content", padding: "10px"
                                    }}>
                                    {t('เพิ่มประเภทเสื้อ')}
                                </Button>
                                {formData.product?.shirt?.length > 0 && (
                                    <Button className="mt-3" onClick={handleRemoveShirtForm}
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            backgroundColor: "red", marginLeft: "1rem", border: "none"
                                        }}>
                                        <FaTrash />
                                    </Button>
                                )}
                            </div>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            {formData.product?.shirtsize && formData.product.shirtsize.map((product, index) => (
                                <Row key={index} className='mt-2'>
                                    <p>{t('ขนาดเสื้อ')} <span className='requiredstar'>*</span></p>
                                    <Form.Group as={Row} controlId="formShirtSize" style={{ paddingInline: "12px" }}>
                                        <Form.Control
                                            type='text'
                                            name='shirtsize'
                                            value={product}
                                            onChange={(e) => handleAddShirtSizeChange(index, e)}
                                            placeholder={t('กรอกขนาดเสื้อ')}
                                            required
                                            style={{
                                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                                backgroundColor: "#fff", height: "40px"
                                            }}
                                        />
                                    </Form.Group>
                                </Row>
                            ))}
                            <div style={{ display: "flex", justifyContent: "end" }}>
                                <Button className="mt-3" onClick={handleAddShirtSizeForm}
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        border: "none", borderRadius: "10px", width: "fit-content", padding: "10px"
                                    }}>
                                    {t('เพิ่มขนาดเสื้อ')}
                                </Button>
                                {formData.product?.shirtsize?.length > 0 && (
                                    <Button className="mt-3" onClick={handleRemoveShirtSizeForm}
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            backgroundColor: "red", marginLeft: "1rem", border: "none"
                                        }}>
                                        <FaTrash />
                                    </Button>
                                )}
                            </div>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            {formData.product?.etc && formData.product.etc.map((product, index) => (
                                <Row key={index} className='mt-2'>
                                    <p>{t('อื่นๆ')}</p>
                                    <Form.Control
                                        type='text'
                                        name='etc'
                                        value={product}
                                        onChange={(e) => handleAddEtcChange(index, e)}
                                        placeholder={t('กรอกสินค้าอื่นๆ')}
                                        style={{
                                            borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                            backgroundColor: "#fff", border: "none", height: "40px"
                                        }}
                                    />
                                </Row>
                            ))}
                            <div style={{ display: "flex", justifyContent: "end" }}>
                                <Button className="mt-3" onClick={handleAddEtcForm}
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        border: "none", borderRadius: "10px", width: "fit-content", padding: "10px"
                                    }}>
                                    {t('เพิ่มสินค้าอื่นๆ')}
                                </Button>
                                {formData.product?.etc?.length > 0 && (
                                    <Button className="mt-3" onClick={handleRemoveEtcForm}
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            backgroundColor: "red", marginLeft: "1rem", border: "none"
                                        }}>
                                        <FaTrash />
                                    </Button>
                                )}
                            </div>
                        </Col>

                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            <Row className='mt-2'>
                                <p>{t('ค่าจัดส่ง')}(THB)</p>
                                <Form.Control
                                    type="number"
                                    placeholder={t("กรอกค่าจัดส่ง")}
                                    name="shippingFee"
                                    value={formData.shippingFee}
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                        backgroundColor: "#fff", height: "40px"
                                    }} />
                                <Form.Text id="raceTypeHelpBlock" muted style={{ textAlign: "right" }}>
                                    กรณีจัดส่ง
                                </Form.Text>
                            </Row>
                        </Col>
                    </Row>



                    <div style={{ width: "15%", textAlign: 'center', margin: "3rem 0" }}>
                        <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
                            {t('ช่องทางชำระเงิน')}
                        </p>
                    </div>

                    <Row className='mt-3'>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            <p>{t('ชื่อธนาคาร')} <span className='requiredstar'>*</span></p>
                            <Form.Group as={Row} controlId="formBankName" style={{ paddingInline: "12px" }}>
                                <Form.Control type='text'
                                    name='bankName'
                                    value={formData.bankName} // ใช้ค่า bankName จาก paymentInfo
                                    onChange={handleChange}
                                    placeholder={t('กรอกชื่อธนาคาร')}
                                    required
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", height: "40px"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            <p>{t('ชื่อบัญชี')} <span className='requiredstar'>*</span></p>
                            <Form.Group as={Row} controlId="formAccountName" style={{ paddingInline: "12px" }}>
                                <Form.Control type='text'
                                    name='accountName'
                                    value={formData.accountName} // ใช้ค่า accountName จาก paymentInfo
                                    onChange={handleChange}
                                    placeholder={t('กรอกชื่อบัญชี')}
                                    required
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", height: "40px"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            <p>{t('เลขที่บัญชี')} <span className='requiredstar'>*</span></p>
                            <Form.Group as={Row} controlId="formAccountNumber" style={{ paddingInline: "12px" }}>
                                <Form.Control type='text'
                                    name='accountNumber'
                                    value={formData.accountNumber} // ใช้ค่า accountNumber จาก paymentInfo
                                    onChange={handleChange}
                                    placeholder={t('กรอกเลขที่บัญชี')}
                                    required
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", height: "40px"
                                    }} />
                            </Form.Group>
                        </Col>
                        <Col xl={3} md={6} sm={12} className='mt-2'
                            style={{ display: "flex", flexDirection: "column" }}>
                            <p>{t('รูปภาพ QR Code พร้อมเพย์')} <span className='requiredstar'>*</span></p>
                            <Form.Group as={Row} controlId="promptPayImage" style={{ paddingInline: "12px" }}>
                                <Form.Control
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", height: "40px"
                                    }}
                                    accept=".png,.jpg,.jpeg"
                                    type='file'
                                    name='promptPayImage'
                                    rows={3}
                                    placeholder={t('รูปภาพพร้อมเพย์')}
                                    onChange={handlePromptPayChange}
                                    required={formData.promptPayImage === ""}
                                />
                            </Form.Group>

                            {/* แสดงตัวอย่างรูปภาพ */}
                            <Row className="mt-3">
                                {previewPromptPayImages && (
                                    <Col xs={6} md={4} lg={3} className="mb-3">
                                        <div style={{ position: 'relative', textAlign: 'center' }}>
                                            <img
                                                src={typeof previewPromptPayImages === "string" ? previewPromptPayImages : URL.createObjectURL(previewPromptPayImages)} // แสดง URL หรือไฟล์
                                                alt="Uploaded preview"
                                                style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                                            />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                style={{
                                                    position: 'absolute',
                                                    top: '5px',
                                                    right: '5px',
                                                    borderRadius: '50%',
                                                    border: "none"
                                                }}
                                                onClick={handleRemovePromptPayImage}
                                            >
                                                &times;
                                            </Button>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>

                </Container>
            </Form>
        </Container >
    )
}

export default Data_org_3