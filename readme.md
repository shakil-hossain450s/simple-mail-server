# Simple Mail Server

A tiny helper around [Nodemailer](https://nodemailer.com/) for sending template-based emails with minimal configuration. Designed to simplify sending emails in Node.js projects.

---

## Features

* Simple configuration via environment variables
* Supports SMTP or service-based email (e.g., Gmail)
* Built-in email templates (welcome email example)
* Custom HTML email support
* Easy to integrate into any Node.js project
* Optional transporter verification at startup

---

## Installation

```bash
npm install simple-mail-server
```

---

## Environment Configuration

Create a `.env` file in the root of your project:

```ini
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_password_or_app_password
# Optional settings:
MAIL_SERVICE=gmail
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_VERIFY=true
MAIL_FROM="My App <no-reply@myapp.com>"
```

**Notes:**

* `MAIL_USER` and `MAIL_PASS` are required for authentication.
* `MAIL_SERVICE` can be `gmail`, `yahoo`, etc., for common email providers.
* `MAIL_HOST` is required if you are using a custom SMTP server.
* `MAIL_VERIFY=true` will check the transporter connection at startup (recommended for debugging).

---

## Usage

### 1. Sending an email with a template

```javascript
const sendMail = require('simple-mail-server/sendMail');

(async () => {
  const result = await sendMail({
    to: "recipient@example.com",
    subject: "Welcome!",
    templateName: "welcome", // use built-in template
    variables: { username: "John Doe" }, // template variables
  });

  console.log(result);
})();
```

### 2. Sending an email with custom HTML

```javascript
const sendMail = require('simple-mail-server/sendMail');

(async () => {
  const result = await sendMail({
    to: "recipient@example.com",
    subject: "Custom Email",
    customHtml: "<h1>Hello!</h1><p>This is a custom email.</p>"
  });

  console.log(result);
})();
```

### 3. Overriding the sender email

```javascript
const sendMail = require('simple-mail-server/sendMail');

(async () => {
  const result = await sendMail({
    to: "recipient@example.com",
    subject: "Custom Sender",
    customHtml: "<p>Check out this email.</p>",
    from: "Support <support@example.com>"
  });

  console.log(result);
})();
```

---

## Built-in Templates

Currently includes:

* `welcome`: a simple welcome email template

---

## transporter.js

Handles creating the Nodemailer transporter based on environment variables and optionally verifies the connection at startup.

```javascript
const transporter = require("./transporter");
```

---

## sendMail.js

Handles sending email with:

* Template rendering
* Custom HTML
* Debug logging
* Error handling

---

## Dependencies

* [nodemailer](https://www.npmjs.com/package/nodemailer)
* [dotenv](https://www.npmjs.com/package/dotenv)

---

## License

MIT License © Md Shakil Hossain

---

## Notes

* Make sure to use an [App Password](https://support.google.com/accounts/answer/185833) for Gmail if using `MAIL_SERVICE=gmail`.
* Always keep your `.env` file secure and do not commit credentials to GitHub.
