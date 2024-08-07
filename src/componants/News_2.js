import React from 'react'
import { Container, Col } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

function News_2() {
    return (
        <Container style={{ marginTop: '2rem', marginBottom: "2rem" }}>
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
                    <img src={require("../image/event-pic-1.jpg")} class="img-thumbnail" alt="Thai.png"
                        style={{ height: "360px", margin: "3rem" }} />
                    <p class="text-start"
                        style={{ margin: "2rem" , fontSize: "26px" }}
                    >ทัพนักวิ่ง “หมอชวนวิ่ง” ยกพลเข้าจังหวัดสุดท้าย สรุปยอดผู้เข้าร่วมโครงการกว่า 1 ล้านคน! </p>
                    <p class="text-start"
                        style={{ marginLeft: "2rem" }}
                    >หลังจากที่เริ่มออกสตาร์ทมาตั้งแต่วันที่ 4 พฤศจิกายน ที่ผ่านมากับโครงการ “หมอชวนวิ่ง” โดยแพทยสภา กิจกรรมดีๆ เนื่องในวาระครบรอบ 50 ปี
                        ของแพทย์สภา และเพื่อเป็นการเฉลิมพระเกียรติสมเด็จ พระมหิตลาธิเบศร อดุลยเดชวิกรม พระบรมราชชนก พระราชบิดาแห่งการแพทย์ไทย เป็นครั้งแรก
                        ของโลก ที่หมอจะเป็นผู้นำในการรวมตัวของความร่วมมือกันระหว่างภาครัฐ ภาคเอกชน และภาคประชาชน ที่หมอ และทุกภาคส่วนก้าวไปด้วยกัน
                        (NO ONE LEFT BEHIND) ทั้งนี้ เพื่อเป็นการจุดประกายให้ทุกคนหันมา ใส่ใจ สุขภาพโดยการออกกำลังกาย และเพื่อลดความเสี่ยงการเกิดโรคที่เกิดจาก
                        พฤติกรรม (NCDs) ที่ยังมีสถิติการเสียชีวิตเพิ่มขึ้นอย่างต่อเนื่อง เป็นการระดมทุนเพื่อจัดซื้อเครื่องมือและอุปกรณ์การแพทย์ ที่จำเป็น ให้กับโรงพยาบาลที่
                        ต้องการความช่วยเหลือจากจังหวัดต่างๆ ทั่วประเทศ ซึ่งได้รับความร่วมมือ อย่างดีเยี่ยมจากทั้งภาครัฐและภาคเอกชน รวมถึงเหล่าศิลปินดาราและประชาชน
                        รวมแล้วกว่า 1 ล้านคน! ที่ต่างพร้อมใจออกมาวิ่งเพื่อรวมพลังให้สังคมหันมาใส่ใจสุขภาพมากขึ้น โดยมีการส่งต่อคฑาหมอชวนวิ่ง ทั้งหมด 19 อัน จาก
                        เส้นทางวิ่ง 15 สาย ซึ่งคฑาแต่ละอันมีความพิเศษ โดยได้มีการบรรจุมวลสารที่เป็น ศิริมงคล จากทั่วประเทศไว้ในคฑาแต่ละอันด้วย

                        โดยในวันที่ 25 พฤศจิกายนที่จะถึงนี้ โครงการ “หมอชวนวิ่ง” จะเดินทางมาถึงจังหวัดสุดท้าย ได้แก่ จังหวัดนนทบุรี ซึ่งเป็นที่ตั้งของกระทรวงสาธารณสุข
                        โดยนักวิ่งทั้ง 15 สาย จะนำคฑาทั้ง 19 อันจากทั่วประเทศเคลื่อนตัวมารวมกันใน 2  จุด คือ บริเวณโรงเรียนชลประทาน และแม็คโคร นครอินทร์
                        ตั้งแต่เวลา 14.00 น. จากนั้นจะออกวิ่งมายังกระทรวงสาธารณสุขพร้อมๆกัน เพื่อทำพิธีปิดโครงการ อย่างเป็นทางการ ตั้งแต่เวลา 15.00 น. เป็นต้นไป
                    </p>
                </div>
            </Col>
        </Container>
    )
}

export default News_2