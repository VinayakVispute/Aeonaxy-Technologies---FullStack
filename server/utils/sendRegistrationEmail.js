const nodemailer = require("nodemailer");

const sendEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SEND_HOST,
      port: process.env.SEND_PORT,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.SEND_USER,
        pass: process.env.SEND_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SEND_FROM,
      to: email,
      subject: "Welcome to Aeonaxy FullStack",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" lang="en">
        <head>
          <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        </head>
        <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">The sales intelligence platform that helps you uncover qualified leads.<div> </div>
        </div>
        <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
            <tbody>
              <tr style="width:100%">
                <td><img alt="Aeonaxy" height="50" src="https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/xmc1ei0kr1yrnmkhncof" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" width="170" />
                  <p style="font-size:16px;line-height:26px;margin:16px 0">Hi ${name},</p>
                  <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to Aeonaxy, this is just a welcome email for the project from Aeonaxy.</p>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
                    <tbody>
                      <tr>
                        <td><a href="https://github.com/VinayakVispute" style="background-color:#5F51E8;border-radius:3px;color:#fff;font-size:16px;text-decoration:none;text-align:center;display:inline-block;padding:12px 12px 12px 12px;line-height:100%;max-width:100%" target="_blank"><span></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Get started</span><span></span></a></td>
                      </tr>
                    </tbody>
                  </table>
                  <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />The Aeonaxy team</p>
                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                  <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">470 Noor Ave STE B #1148, South San Francisco, CA 94080</p>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return { success: true, message: "Email sent successfully", data: info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error: error };
  }
};

module.exports = { sendEmail };
