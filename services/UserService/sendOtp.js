const nodemailer = require('nodemailer');
const Otp = require('../../models/otp.model');
const generateOtp = require('../../util/genToken');

const { MAIL_USER, MAIL_PORT, MAIL_PASSWORD, MAIL_HOST } = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

exports.sendEmailOtp = async (user_id, email) => {
  let isSent;
  try {
    const codeLength = 6;
    // check if an otp exists and update the code
    let otp = await Otp.findOne({
      user_id,
      otp_type: 'email',
    });

    if (otp) {
      otp.otp_code = generateOtp(codeLength, false);
    } else {
      otp = new Otp({
        otp_code: generateOtp(codeLength, false),
        otp_type: 'email',
        user_id,
      });
    }

    const mailOptions = {
      from: `StockTracker <${MAIL_USER}>`,
      to: email,
      subject: 'Your One Time Password',
      html: `
    <div>
      <img src="https://customerpay.me/frontend/assets/img/favicon.png" style="display: block;margin: 10px auto" />
      <strong>Hi</strong>
      <p>Welcome back to StockTracker. To log in please provide your OTP.</p><br>
      <p>Your One Time Password is <strong style="font-size:1.15em;">${otp.otp_code}</strong></p></br>
      <p>Valid for 2 minutes</p>
    </div>
    `,
    };

    isSent = await transporter.sendMail(mailOptions);
    await otp.save();
    return isSent;
  } catch (error) {
    isSent = false;
    return isSent;
  }
};
