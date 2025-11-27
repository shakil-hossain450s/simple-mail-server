const transporter = require("./transporter");
const templates = {
  welcome: require("./templates/welcome"),
};

/**
 * sendMail(options)
 *
 * options: {
 *   -------- required --------
 *   to: string (required),
 *   subject: string (required),
 * 
 *   -------- optional --------
 *   template: string (optional) - one of keys in templates,
 *   variables: object (optional) - variables passed to template function,
 *   customHtml: string (optional) - use this instead of template if provided,
 *   from: string (optional) - override default sender (defaults to MAIL_USER or 'no-reply@example.com')
 * }
 */

async function sendMail(options = {}) {
  const { to, subject, templateName, variables, customHtml, from } = options;

  // simple validation
  if (!to) {
    return { success: false, error: "Missing required filled: to" };
  }
  if (!subject) {
    return { success: false, error: "Missing required filled: subject" };
  }

  // HTML body: customHtml preferred, otherwise template
  let html = "";
  if (customHtml) {
    html = customHtml;
  } else if (templateName && templates[templateName]) {
    try {
      html = templates[templateName](variables = {});
    } catch (err) {
      return { success: false, message: "Template error renderring: " + err.message }
    }
  } else {
    // fallback plain text if neither provided
    html = `<p>No template selected and no customHtml provided.</p>`
  }

  // Mail options:
  const mailOptions = {
    from: from || process.env.MAIL_FROM || process.env.MAIL_USER || "no-replay@example.com",
    to,
    subject,
    html
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (err) {
    return { success: false, error: err.message || String(err) }
  }
}

module.exports = sendMail;