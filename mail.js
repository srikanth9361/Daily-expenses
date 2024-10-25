var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srikanthmessii07@gmail.com',
    pass: 'rjts xzlv dkej ryga'
  }
});

var mailOptions = {
  from: 'srikanthmessii07@gmail.com',
  to: 'sreekanth7722@gmail.com',
  subject: 'Sending Email using Node.js',
  html: '<h1>Hi Anna</h1> <p>Good afternoon</p>',
  attachments: [
    {
        filename: 'read',
        path: './readme.md'
    }
  ]
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});