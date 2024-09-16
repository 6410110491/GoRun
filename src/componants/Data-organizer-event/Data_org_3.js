import React, { useState } from 'react'
import { Col, Row, Container, Form, InputGroup, Button, } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'
import { FaTrash } from 'react-icons/fa';


let selectedFile = null;
function Data_org_3({ formData, setFormData, whatToReceiveFile, routeFile }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReceiveChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length) {
            const fileContents = await Promise.all(
                files.map((file) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    })
                )
            );
            setFormData({ ...formData, whatToReceive: files });
            whatToReceiveFile = files;
        }
    };

    const handleRouteChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length) {
            const fileContents = await Promise.all(
                files.map((file) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    })
                )
            );
            setFormData({ ...formData, route: files });
            routeFile = files;
        }
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


    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        รายละเอียดงาน
                    </p>
                </div>
            </div>

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
                        <p style={{ margin: "0" }}>สิ่งที่จะได้รับ</p>
                        <Form.Group controlId='formReceivePicture'>
                            <Form.Control
                                accept=".png,.jpg,.jpeg,"
                                type='file'
                                multiple
                                name='image'
                                rows={3}
                                placeholder='รูปภาพสิ่งที่จะได้รับ'
                                onChange={handleReceiveChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ margin: "0" }}>เส้นทางการแข่งขัน</p>
                        <Form.Group controlId='formRoutePicture'>
                            <Form.Control
                                accept=".png,.jpg,.jpeg,"
                                type='file'
                                multiple
                                name='image'
                                rows={3}
                                placeholder='รูปภาพเส้นทางการแข่งขัน'
                                onChange={handleRouteChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>ที่พัก/โรงแรม</p>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            placeholder="กรอกที่พัก/โรงแรม"
                            name="accommodation"
                            value={formData.accommodation}
                            onChange={handleChange}
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>ร้านอาหาร</p>
                        <Form.Control as="textarea"
                            rows={3}
                            type="text"
                            placeholder="กรอกร้านอาหาร"
                            name="foodStalls"
                            value={formData.foodStalls}
                            onChange={handleChange}
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <p>ข้อมูลเพิ่มเติม</p>
                        <Form.Control as="textarea"
                            rows={3}
                            type="text"
                            placeholder="กรอกข้อมูลเพิ่มเติม"
                            name="etcInfo"
                            value={formData.etcInfo}
                            onChange={handleChange}
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                backgroundColor: "#fff", border: "none", height: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                </Row>


                <Row className='mt-3' style={{ marginBottom: "48px" }}>
                    <Col xl={6} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        <p >แผนที่ตำแหน่งการจัดงาน</p>
                        <Row>
                            <Col xl={6} md={6} sm={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p>ละติจูด</p>
                                <Form.Control type='text'
                                    name='latitude'
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    placeholder='กรอกละติจูด'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Col>
                            <Col xl={6} md={6} sm={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p>ลองจิจูด</p>
                                <Form.Control type='text'
                                    name='longtitude'
                                    value={formData.longtitude}
                                    onChange={handleChange}
                                    placeholder='กรอกลองจิจูด'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }} />
                            </Col>
                        </Row>

                    </Col>

                </Row>


                <div style={{ width: "15%", textAlign: 'center' }}>
                    <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
                        สินค้า
                    </p>
                </div>

                <Row className='mt-3'>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        {formData.product?.shirt && formData.product.shirt.map((product, index) => (
                            <Row key={index} className='mt-2'>
                                <p>ประเภทเสื้อ</p>
                                <Form.Control
                                    type='text'
                                    name='shirt'
                                    value={product}
                                    onChange={(e) => handleAddShirtChange(index, e)}
                                    placeholder='กรอกประเภทเสื้อ'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }}
                                />
                            </Row>
                        ))}
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button className="mt-3" onClick={handleAddShirtForm}
                                style={{
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    border: "none", borderRadius: "10px", width: "fit-content", padding: "10px"
                                }}>
                                เพิ่มประเภทเสื้อ
                            </Button>
                            {formData.product?.shirt?.length > 0 && (
                                <Button className="mt-3" onClick={handleRemoveShirtForm}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "red", marginLeft: "1rem" }}>
                                    <FaTrash />
                                </Button>
                            )}
                        </div>
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        {formData.product?.shirtsize && formData.product.shirtsize.map((product, index) => (
                            <Row key={index} className='mt-2'>
                                <p>ขนาดเสื้อ</p>
                                <Form.Control
                                    type='text'
                                    name='shirtsize'
                                    value={product}
                                    onChange={(e) => handleAddShirtSizeChange(index, e)}
                                    placeholder='กรอกขนาดเสื้อ'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                    }}
                                />
                            </Row>
                        ))}
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button className="mt-3" onClick={handleAddShirtSizeForm}
                                style={{
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    border: "none", borderRadius: "10px", width: "fit-content", padding: "10px"
                                }}>
                                เพิ่มขนาดเสื้อ
                            </Button>
                            {formData.product?.shirtsize?.length > 0 && (
                                <Button className="mt-3" onClick={handleRemoveShirtSizeForm}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "red", marginLeft: "1rem" }}>
                                    <FaTrash />
                                </Button>
                            )}
                        </div>
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        {formData.product?.etc && formData.product.etc.map((product, index) => (
                            <Row key={index} className='mt-2'>
                                <p>อื่นๆ</p>
                                <Form.Control
                                    type='text'
                                    name='etc'
                                    value={product}
                                    onChange={(e) => handleAddEtcChange(index, e)}
                                    placeholder='กรอกสินค้าอื่นๆ'
                                    style={{
                                        borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                        backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
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
                                เพิ่มสินค้าอื่นๆ
                            </Button>
                            {formData.product?.etc?.length > 0 && (
                                <Button className="mt-3" onClick={handleRemoveEtcForm}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "red", marginLeft: "1rem" }}>
                                    <FaTrash />
                                </Button>
                            )}
                        </div>
                    </Col>

                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        <Row className='mt-2'>
                            <p>ค่าจัดส่ง(THB)</p>
                            <Form.Control
                                type="number"
                                placeholder="กรอกค่าจัดส่ง"
                                name="shippingFee"
                                value={formData.shippingFee}
                                onChange={handleChange}
                                style={{
                                    borderRadius: "10px", marginTop: "-15px", maxWidth: "98%",
                                    backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                }} />
                        </Row>
                    </Col>
                </Row>



                <div style={{ width: "15%", textAlign: 'center', margin: "3rem 0" }}>
                    <p style={{ borderBottom: "5px solid #47474A", fontSize: "1.7rem" }}>
                        ช่องทางชำระเงิน
                    </p>
                </div>

                <Row className='mt-3'>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        <p>ชื่อธนาคาร</p>
                        <Form.Control type='text'
                            name='bankName'
                            value={formData.bankName} // ใช้ค่า bankName จาก paymentInfo
                            onChange={handleChange}
                            placeholder='กรอกชื่อธนาคาร'
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        <p>ชื่อบัญชี</p>
                        <Form.Control type='text'
                            name='accountName'
                            value={formData.accountName} // ใช้ค่า accountName จาก paymentInfo
                            onChange={handleChange}
                            placeholder='กรอกชื่อบัญชี'
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        <p>เลขบัญชี</p>
                        <Form.Control type='text'
                            name='accountNumber'
                            value={formData.accountNumber} // ใช้ค่า accountNumber จาก paymentInfo
                            onChange={handleChange}
                            placeholder='กรอกเลขบัญชี'
                            style={{
                                borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                            }} />
                    </Col>
                    <Col xl={3} md={6} sm={12} className='mt-2'
                        style={{ display: "flex", flexDirection: "column" }}>
                        <p>รูปภาพ QR Code พร้อมเพย์</p>
                        <Form.Group controlId='promptPayImage'>
                            <Form.Control
                                style={{
                                    borderRadius: "10px", marginTop: "-15px", maxWidth: "95%",
                                    backgroundColor: "#fff", border: "none", height: "40px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                                }}
                                accept=".png,.jpg,.jpeg"
                                type='file'
                                name='promptPayImage'
                                rows={3}
                                placeholder='รูปภาพพร้อมเพย์'
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

            </Container>
        </Container >
    )
}

export default Data_org_3