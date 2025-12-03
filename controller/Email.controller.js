import nodemailer from "nodemailer";
import { contactEmailTemplate } from "../templates/emailTemplate.js";

const sendEmailPFmsg = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: { 
                user: process.env.MAIL, 
                pass: process.env.PASS 
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const emailTemplate = contactEmailTemplate(name, email, message);

        await transporter.sendMail({
            from: process.env.MAIL,
            to: "ushanrashmika23@gmail.com",
            replyTo: email,
            subject: `New Message from ${name}`,
            html: emailTemplate
        });
        
        res.status(201).json({ code: 201, status: 'success', data: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            code: 500, 
            status: 'error', 
            data: 'Failed to send email: ' + error.message 
        });
    }
};

export const EmailController = {
    sendEmailPFmsg
};