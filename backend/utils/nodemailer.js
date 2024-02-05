const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gauravrathore2u@gmail.com', 
    pass: process.env.NODEMAILER_PASS,    
  },
});

const sendMail = (toSend, mailSub, mailTxt)=>{
    const mailOptions = {
        from: 'gauravrathore2u@gmail.com',  
        to: toSend,  
        subject: mailSub,
        text: mailTxt,
      };
      
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = sendMail;
