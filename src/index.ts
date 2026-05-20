import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import cron from 'node-cron';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(): Promise<void> {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'Hozimph.tlv@taxes.gov.il',
            subject: 'בקשה לאישור קבלת מייל - החזר שכירות',
            text: `היי,

שלחתי ב19/5 מייל בנוגע להחזר על שכירות עבור דירה ברחוב לונץ 17 בתל אביב שנפגעה בשאגת הארי וטרם קיבלתי אישור שזה בטיפול.

תודה רבה
נדב הולצמן ת.ז 207022401
0528752144`,
        });

        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

// Send immediately when app starts
sendEmail();

// Run every 12 hours
cron.schedule('0 */6 * * *', () => {
    console.log('Running scheduled email job...');
    sendEmail();
});

console.log('Automation is running...');