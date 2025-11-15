const nodemailer = require("nodemailer");
const { clientMail, adminMail } = require("./template");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.clientMail = (data) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: data.email,
    subject: data.subject,
    html: clientMail(data.name, data.service),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error:", error);
    }
    console.log("Email sent:", info.response);
  });
};


exports.adminMail = (data) => {
    let mailOptions = {
    from: data.email,
    to: process.env.EMAIL,
    subject: data.subject,
    html: adminMail(data),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error:", error);
    }
    console.log("Email sent:", info.response);
  });
}