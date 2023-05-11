import { NextApiRequest, NextApiResponse } from "next";
import { mailOptions, transporter } from "../../mailer/nodemailer";

type schema = {
  data: Object;
};

const generateEmailContent = (data) => {
  const textData = Object.entries(data).reduce(
    (str, [key, val]) => (str = str + `${messageFields[key]}:\n${val}\n\n`),
    ""
  );

  const htmlData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str =
        str +
        `<div style="font-weight:bold">${messageFields[key]}:</div> <p style="margin-bottom:10px">${val}</p>`),
    ""
  );
  return {
    text: textData,
    html: `
        <!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset={$charset}" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <style type="text/css">
            .ExternalClass,
            .ExternalClass div,
            .ExternalClass font,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass td,
            h1,
            img {
                line-height: 100%;
            }
    
            h1,
            h2 {
                display: block;
                font-family: Helvetica;
                font-style: normal;
                font-weight: 700;
            }
    
            #outlook a {
                padding: 0;
            }
    
            .ExternalClass,
            .ReadMsgBody {
                width: 100%;
            }
    
            a,
            blockquote,
            body,
            li,
            p,
            table,
            td {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                mso-table-lspace: 0;
                mso-table-rspace: 0;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                outline: 0;
                text-decoration: none;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            #bodyCell,
            #bodyTable,
            body {
                height: 100% !important;
                margin: 0;
                padding: 0;
                width: 100% !important;
            }
    
            #bodyCell {
                padding: 20px;
            }
    
            #templateContainer {
                width: 600px;
                border: 1px solid #ddd;
                background-color: #fff;
            }
    
            #bodyTable,
            body {
                background-color: #fafafa;
            }
    
            h1 {
                color: #202020 !important;
                font-size: 26px;
                letter-spacing: normal;
                text-align: left;
                margin: 0 0 10px;
            }
    
            h2 {
                color: #404040 !important;
                font-size: 20px;
                line-height: 100%;
                letter-spacing: normal;
                text-align: left;
                margin: 0 0 10px;
            }
    
            h3,
            h4 {
                display: block;
                font-style: italic;
                font-weight: 400;
                letter-spacing: normal;
                text-align: left;
                margin: 0 0 10px;
                font-family: Helvetica;
                line-height: 100%;
            }
    
            h3 {
                color: #606060 !important;
                font-size: 16px;
            }
    
            h4 {
                color: grey !important;
                font-size: 14px;
            }
    
            .headerContent {
                background-color: #0948b3;
                border-bottom: 1px solid #ddd;
                color: #505050;
                font-family: Helvetica;
                font-size: 20px;
                font-weight: 700;
                text-align: left;
                vertical-align: middle;
                font-size: 20px !important;
                padding: 20px;
            }
    
            .bodyContent,
            .footerContent {
                font-family: Helvetica;
    
            }
    
            .footerContent {
                text-align: center;
                background-color: #0948b3;
                color: #FFFFFF;
            }
    
            .bodyContent pre {
                padding: 15px;
                background-color: #444;
                color: #f8f8f8;
                border: 0;
            }
    
            .bodyContent pre code {
                white-space: pre;
                word-break: normal;
                word-wrap: normal;
            }
    
            .bodyContent table {
                margin: 10px 0;
                background-color: #fff;
                border: 1px solid #ddd;
            }
    
            .bodyContent table th {
                padding: 4px 10px;
                background-color: #f8f8f8;
                border: 1px solid #ddd;
                font-weight: 700;
                text-align: center;
            }
    
            .bodyContent table td {
                padding: 3px 8px;
                border: 1px solid #ddd;
            }
    
            .table-responsive {
                border: 0;
            }
    
            .bodyContent a {
                word-break: break-all;
            }
    
            .headerContent a .yshortcuts,
            .headerContent a:link,
            .headerContent a:visited {
                color: #1f5d8c;
                font-weight: 400;
                text-decoration: underline;
            }
    
            #headerImage {
                height: auto;
                max-width: 600px;
                padding: 10px;
            }
    
            #templateBody {
                background-color: #fff;
            }
    
            .bodyContent {
                color: #505050;
                font-size: 14px;
                padding: 20px;
            }
    
            .bodyContent a .yshortcuts,
            .bodyContent a:link,
            .bodyContent a:visited {
                color: #1f5d8c;
                font-weight: 400;
                text-decoration: underline;
            }
    
            .bodyContent a:hover {
                text-decoration: none;
            }
    
            .bodyContent img {
                display: inline;
                height: auto;
                max-width: 560px;
            }
    
            .footerContent {
                color: #FFFFFF;
                font-size: 12px;
                padding: 20px;
            }
    
            .footerContent a .yshortcuts,
            .footerContent a span,
            .footerContent a:link,
            .footerContent a:visited {
                color: #FFFFFF;
                font-weight: 400;
                text-decoration: underline;
            }
    
            @media only screen and (max-width: 640px) {
    
                h1,
                h2,
                h3,
                h4 {
                    line-height: 100% !important;
                }
    
                #templateContainer {
                    max-width: 600px !important;
                    width: 100% !important;
                }
    
                #templateContainer,
                body {
                    width: 100% !important;
                }
    
                a,
                blockquote,
                body,
                li,
                p,
                table,
                td {
                    -webkit-text-size-adjust: none !important;
                }
    
                body {
                    min-width: 100% !important;
                }
    
                #bodyCell {
                    padding: 10px !important;
                }
    
                h1 {
                    font-size: 24px !important;
                }
    
                h2 {
                    font-size: 20px !important;
                }
    
                h3 {
                    font-size: 18px !important;
                }
    
                h4 {
                    font-size: 16px !important;
                }
    
                #templatePreheader {
                    display: none !important;
                }
    
                .footerContent {
                    font-size: 14px !important;
                }
    
                .footerContent a {
                    display: block !important;
                    color: #FFFFFF !important;
                }
    
                .hide-mobile {
                    display: none;
                }
            }
        </style>
    </head>
    
    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
        <center>
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                <tr>
                    <td align="center" valign="top" id="bodyCell">
                        <table border="0" cellpadding="0" cellspacing="0" id="templateContainer">
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader">
                                        <tr>
                                            <td valign="top" class="headerContent">
                                                <center>
                                                    <a passHref href="https://astranix.com">
                                                        <img src="dev.astranix.com.np/_next/image?url=%2Fassets%2Fimages%2Fastranix-white-logo.png&w=3840&q=75"
                                                            id="headerImage" alt="KaamChahiyo Logo" />
                                                </center>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
                                        <tr>
                                            <td valign="top" class="bodyContent">
    
    <h2>New Contact Message</h2>
    ${textData}
    ${htmlData}
    
    
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter">
                                        <tr>
                                            <td valign="top" class="footerContent">
                                                Copyright &copy; <a style="color:white" passHref href="#">KaamChahiyo</a>, All rights reserved.
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>
    </body>
    
    </html>
`,
  };
};

const messageFields = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  message: "Message",
};

const handler = async (req: NextApiRequest, res: NextApiResponse<schema>) => {
  if (req.method === "POST") {
    const data = req.body;
    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: data.subject,
      });
      return res.status(200).json({
        data: {
          success: { message: "Message Sent Sucessfully" },
          error: null,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  return res
    .status(400)
    .json({ data: { error: { message: "Bad Request" }, success: null } });
};

export default handler;
