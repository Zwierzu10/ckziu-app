import formidable from 'formidable';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, 
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

      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', 
        port: 587,
        secure: false,
        auth: {
          user: process.env.OUTLOOK_EMAIL,
          pass: process.env.OUTLOOK_PASSWORD, 
        },
      });

      const mailOptions = {
        from: process.env.OUTLOOK_EMAIL,
        to: 'konkurs@ckziu.elodz.edu.pl', 
        subject: `Praca od ${fields.name} ${fields.surname}`,
        text: `Imię: ${fields.name}\nNazwisko: ${fields.surname}\nSzkoła: ${fields.schoolName}\nImię opiekuna szkolnego: ${fields.parentName}`,
        attachments, 
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
