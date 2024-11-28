import formidable from 'formidable';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, // Disabling body parser for file uploads
  },
};

const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      keepExtensions: true, 
      multiples: true, 
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);

      const attachments = [];
      if (files.attachments) {
        const uploadedFiles = Array.isArray(files.attachments)
          ? files.attachments
          : [files.attachments];

        uploadedFiles.forEach((file) => {
          attachments.push({
            filename: file.originalFilename, 
            path: file.filepath,
          });
        });
      }

      // Nodemailer configuration for Outlook
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Outlook SMTP server
        port: 587, // SMTP port for STARTTLS
        secure: false, // Use TLS (not SSL)
        auth: {
          user: process.env.OUTLOOK_EMAIL, // Outlook email address
          pass: process.env.OUTLOOK_PASSWORD, // Outlook password (not app password)
        },
      });

      const mailOptions = {
        from: process.env.OUTLOOK_EMAIL,
        to: 'konkurs@ckziu.elodz.edu.pl', // Recipient's email address
        subject: `Praca od ${fields.name} ${fields.surname}`,
        text: `Imię: ${fields.name}\nNazwisko: ${fields.surname}\nSzkoła: ${fields.schoolName}\nImię opiekuna szkolnego: ${fields.parentName}`,
        attachments, // Attachments array
      };

      await transporter.sendMail(mailOptions);

      console.log('Email sent successfully');
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error in handler:', error);
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
