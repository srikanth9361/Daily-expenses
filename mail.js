var nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')

 var otpCode = otpGenerator.generate(6, {digits: true, upperCaseAlphabets: true, lowerCaseAlphabets: false, specialChars: false  });

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srikanthmessii07@gmail.com',
    pass: 'qbse hqaj fnok bowi'
  }
});

var mailOptions = {
  from: 'srikanthmessii07@gmail.com',
  to: 'srikanthmessii07@gmail.com',
  subject: 'Sending Email using Node.js',
  html: `${otpCode}`
  // attachments: [
  //   {
  //       filename: 'read',
  //       path: './readme.md'
  //   }
  // ]
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});