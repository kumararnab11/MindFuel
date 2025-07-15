const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // SMTP host (e.g., smtp.gmail.com)
            auth: {
                user: process.env.MAIL_USER, // Your email address
                pass: process.env.MAIL_PASS, // Your email password or app-specific password
            },
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion || CodeHelp - by Babbar', // Sender address
            to: `${email}`,                               // List of receivers
            subject: `${title}`,                          // Subject line
            html: `${body}`,                              // HTML body content
        });

        console.log(info); 
        return info;      
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

module.exports = mailSender;