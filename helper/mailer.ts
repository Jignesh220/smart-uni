import nodemailer from "nodemailer";

interface sendEmail {
  email: string[];
  htmltable: string;
}
export const sendEmail = async ({ email,htmltable }: sendEmail) => {
  try {
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "strapmart8@gmail.com",
        pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "Alpita Patel <starpmart8@gmail.com>",
      to: [],
      bcc: email,
      subject: "Test Message 4",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      
        <head data-id="__react-email-head">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        </head>
        <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">New Notes Uploaded - Stay Informed!<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
        </div>
      
        <body data-id="__react-email-body" style="background-color:transparent;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
          <style>
            @font-face {
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 400;
              mso-font-alt: 'Verdana';
              src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2) format('woff2');
            }
      
            * {
              font-family: 'Roboto', Verdana;
            }
          </style>
          <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;width:800px;margin:30px auto;background-color:#FCF7FF;border-radius:1.5rem;margin-top:2rem;margin-bottom:2rem;box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px">
            <tbody>
              <tr style="width:100%">
                <td>
                  <center>
                    <table align="center" width="100%" data-id="react-email-section" style="padding:20px;text-align:center;align:center" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td><img data-id="react-email-img" src="https://firebasestorage.googleapis.com/v0/b/smart-uni-8.appspot.com/o/Logo%2Ficon-512.png?alt=media&amp;token=5a060cf9-fdab-4db0-8ed0-3458b59cead4" width="50" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </center>
                  <table align="center" width="100%" data-id="react-email-section" style="width:100%;display:flex" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" width="100%" data-id="react-email-row" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                                <td data-id="__react-email-column" style="border-bottom:1px solid rgb(7, 14, 56);width:102px"></td>
                                <td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                                <td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table align="center" width="100%" data-id="react-email-section" style="padding:5px 20px 10px 20px" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td>
                          <p data-id="react-email-text" style="font-size:1.875rem;line-height:24px;margin:16px 0;display:flex;justify-content:center;font-weight:700;margin-top:1rem;margin-bottom:2rem;text-align:center">UniSmart Files update</p>
                          <p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">We hope this email finds you in good spirits and excited about your educational journey with UniSmart!</p>
                          <p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Here&#x27;s a quick overview of the latest notes that have been added:</p>
                          <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                            <tbody>
                              <tr>
                                <td>
                                  <table style="border-collapse:collapse;width:100%">
                                    <tr>
                                      <th style="border:0.5px solid #FFE0FC;font-size:14px;text-align:center;padding:8px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">Degree</th>
                                      <th style="border:0.5px solid #FFE0FC;font-size:14px;text-align:center;padding:8px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">Subject</th>
                                      <th style="border:0.5px solid #FFE0FC;font-size:14px;text-align:center;padding:8px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">Sub Subjects</th>
                                    </tr>
                                    ${htmltable}
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0"><a href="https://unismart.vercel.app/" data-id="react-email-link" target="_blank" style="color:#067df7;text-decoration:underline">Visit a website</a> and Feel free to explore these materials at your convenience, and don&#x27;t forget to share them with your fellow learners too!</p>
                          <p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Thank you for being a part of our growing community of learners. Together, we are on a quest to make education accessible and rewarding for everyone! </p>
                          <p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Still have questions? Please <a href="https://unismart.vercel.app/contact-us" data-id="react-email-link" target="_blank" style="color:#067df7;text-decoration:underline">Contact Us</a></p>
                          <p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Happy learning!</p>
                          <p data-id="react-email-text" style="font-size:14px;line-height:1.5;margin:16px 0">Best regards,<br />The unismart Team</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      
      </html>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
