require('dotenv').config();
const nodemailer = require("nodemailer");

const service = process.env.MAIL_SERVICE || null; // e.g. 'gmail'
const host = process.env.MAIL_HOST || null; // fallback if not using `service`
const port = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587;
const secure = process.env.MAIL_SECURE === "true" ? true : false; // use TLS when true

// Building auth only if credentials are present
const auth =
  process.env.MAIL_USER && process.env.MAIL_PASS
    ? { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
    : null

const transporterOptions = {
  ...(service ? { service } : {}),
  ...(host ? { host } : {}),
  port,
  secure,
  ...(auth ? { auth } : {}),
}

// create transport
const transporter = nodemailer.createTransport(transporterOptions);

// verify the connections
if (process.env.MAIL_VERIFY === "true") {
  transport.verify((error, success) => {
    if (error) {
      console.error("simple-mail-sevrer: transport verify failed:", error.message);
    } else {
      console.log("simple-mail-sevre: transporter verified - ready to send message");
    }
  })
}

// export the transport
module.exports = transporter;

