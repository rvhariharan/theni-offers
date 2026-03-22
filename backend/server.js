import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;
// const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve the uploads folder so employers can download the files via a link
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup Multer for file uploads (saves to /uploads directory)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Configure Nodemailer 
// (For real use, update the auth credentials with an App Password from Gmail/Yahoo)
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g. using gmail
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// POST route to handle Job Application Form Data (Simplified: No Resume)
app.post('/api/apply', async (req, res) => {
    try {
        const { name, phone, email, jobId, jobTitle, companyName, shopEmail } = req.body;

        console.log(`Received application for ${jobTitle} from ${name}.`);

        // --- STEP 1: SAVE TO POSTGRESQL DATABASE ---
        // (Uncomment this block once you have configured DATABASE_URL in .env and run npx prisma generate)
        /*
        try {
            await prisma.jobApplication.create({ 
                data: { 
                    name, phone, email: email || null, jobId, jobTitle, companyName 
                }
            });
            console.log("Successfully saved application to PostgreSQL Database.");
        } catch (dbError) {
            console.error("Database Error:", dbError.message);
        }
        */

        // --- STEP 2: SEND EMAIL BACKEND TO THE SHOP/HR ---
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: shopEmail, // Sending to the HR/Shop dummy email from frontend
            subject: `New Job Application: ${jobTitle} - ${name}`,
            text: `You have received a new application.\n\nJob: ${jobTitle}\nCompany: ${companyName}\n\nApplicant Details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`
        };

        // Attempt to send email. (Will error if you haven't put real credentials in .env)
        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully!");
        } catch (emailError) {
            console.error("Email configuration missing or incorrect:", emailError.message);
            // We don't fail the whole request because the user needs to set up credentials first.
        }

        res.status(200).json({ 
            success: true, 
            message: 'Application submitted successfully! Your link has been processed.'
        });

    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ success: false, message: 'Server error processing application' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
});
