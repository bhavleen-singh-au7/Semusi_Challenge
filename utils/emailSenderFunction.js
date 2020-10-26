const nodeMailer = require("nodemailer");

const emailSenderFunction = async (
  email,
  emailSubject,
  emailFormat
) => {
  try {
    const { MY_EMAIL, MY_PASSWORD } = process.env;

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: MY_EMAIL,
        pass: MY_PASSWORD,
      },
    });

    transporter.sendMail({
      from: MY_EMAIL,
      to: email,
      subject: emailSubject,
      html: emailFormat,
    });
  } catch (err) {
    res.status(403).json({
      error: `ERROR : ${err}`,
    });
  }
};

module.exports = emailSenderFunction;
