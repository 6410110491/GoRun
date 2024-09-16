import React, { useEffect, useState } from 'react'
import { Container, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top'

function News_2() {
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState();

    const changepage = (path) => {
        window.location.href = "/" + path
    }

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/news/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 401) {
                    changepage('login');
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setNewsDetail(data);
                } else {
                    throw new Error('Failed to fetch event data');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchEventDetail();
    }, [id]);


    return (
        <Container style={{ marginTop: '2rem', marginBottom: "5rem" }}>
            {/* Head */}
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "90%", borderBottom: "5px solid #47474A", }}>
                    <p style={{ paddingLeft: "1.5rem", fontSize: "2rem", margin: "0" }}>
                        ประชาสัมพันธ์
                    </p>
                </div>
            </div>

            {/* ScroolToTop */}
            <ScrollToTop smooth color='white' style={{ borderRadius: "20px", backgroundColor: "#F3C710" }} />

            <Col>
                <div style={{
                    display: "flex", alignItems: "center", flexDirection: 'column', marginTop: "1rem",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", padding: "1rem", borderRadius: "15px"
                }}>
                    <img src={newsDetail ? newsDetail.image : ""} className="img-thumbnail" alt="Thai.png"
                        style={{ height: "360px", margin: "3rem" }} />
                    <p className="text-start"
                        style={{ margin: "2rem", fontSize: "26px", fontWeight: "bold" }}
                    >
                        {newsDetail ? newsDetail.title : ""}
                    </p>
                    <p className="text-start" >
                        {newsDetail ? newsDetail.description : ""}
                    </p>
                </div>
            </Col>
        </Container>
    )
}

export default News_2