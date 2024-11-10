import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    th: {
        translation: {
            'หน้าหลัก': 'หน้าหลัก',
            'ชื่องาน': 'ชื่องาน',
            'งานทั้งหมด': 'งานทั้งหมด',
            'ประชาสัมพันธ์': 'ประชาสัมพันธ์',
            'ปฏิทิน': 'ปฏิทิน',
            'ข้อมูลส่วนตัว': 'ข้อมูลส่วนตัว',
            'ประวัติการสมัคร': 'ประวัติการสมัคร',
            'ประวัติการจัดงาน': 'ประวัติการจัดงาน',
            'แอดมิน': 'แอดมิน',
            'ออกจากระบบ': 'ออกจากระบบ',
            'ผู้จัดงาน': 'ผู้จัดงาน',
            'เข้าสู่ระบบ/สมัครสมาชิก': 'เข้าสู่ระบบ/สมัครสมาชิก',
        }
    },
    en: {
        translation: {
            'หน้าหลัก': 'Home',
            'ชื่องาน': 'Event Name',
            'งานทั้งหมด': 'Event',
            'ประชาสัมพันธ์': 'News',
            'ปฏิทิน': 'Calendar',
            'ข้อมูลส่วนตัว': 'Personal Infomation',
            'ประวัติการสมัคร': 'Event Register History',
            'ประวัติการจัดงาน': 'Event Organized History',
            'แอดมิน': 'Admin',
            'ออกจากระบบ': 'Log out',
            'ผู้จัดงาน': 'Organizer',
            'เข้าสู่ระบบ/สมัครสมาชิก': 'Signin/Signup',
        }
    },
};


i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
