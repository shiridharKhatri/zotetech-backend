exports.clientMail = (name, service) => {
  return `  <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>We've Received Your Inquiry - ZoteTech Solutions</title>

    <style type="text/css">
      /* Base styles */
      body,
      html {
        margin: 0 !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background-color: #f6f6f6;
        font-family: "Poppins", Arial, sans-serif;
        color: #444444;
      }
      /* Reset table styles for better client support */
      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
        border-collapse: collapse;
      }

      /* General styles */
      .full-width-table {
        width: 100%;
        max-width: 600px;
      }
      .button {
        background-color: #008060;
        border-radius: 5px;
      }
      .button a {
        color: #ffffff;
        text-decoration: none;
        padding: 12px 20px;
        display: inline-block;
        border-radius: 5px;
        font-weight: 600;
        font-size: 16px;
      }

      /* Responsive Styles */
      @media screen and (max-width: 600px) {
        .full-width-table {
          width: 100% !important;
          max-width: none !important;
        }
        .content-padding {
          padding: 20px 20px !important;
        }
        .header-logo {
          padding: 20px 20px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0">
    <center style="width: 100%; background-color: #f6f6f6">
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        class="full-width-table"
        style="max-width: 600px; width: 100%; background-color: #ffffff"
      >
        <tr>
          <td
            style="padding: 40px 40px 20px 40px; text-align: left"
            class="content-padding"
          >
            <h1
              style="
                margin: 0 0 20px 0;
                font-family: 'Poppins', Arial, sans-serif;
                font-size: 24px;
                line-height: 32px;
                color: #333333;
                font-weight: 600;
              "
            >
              Thank You for Contacting ZoteTech Solutions!
            </h1>

            <p
              style="
                margin: 0 0 15px 0;
                font-family: 'Poppins', Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
              "
            >
              Dear ${name},
            </p>

            <p
              style="
                margin: 0 0 15px 0;
                font-family: 'Poppins', Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
              "
            >
              We confirm receipt of your message regarding ${service}. We appreciate you taking the time to share your
              project requirements with us.
            </p>

            <h2
              style="
                margin: 30px 0 15px 0;
                font-family: 'Poppins', Arial, sans-serif;
                font-size: 18px;
                line-height: 24px;
                color: #008060;
                font-weight: 600;
              "
            >
              What Happens Next?
            </h2>

            <p
              style="
                margin: 0 0 15px 0;
                font-family: 'Poppins', Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
              "
            >
              A member of our ${service} specialist team will
              review your inquiry and aim to contact you directly within 72 hours to discuss your needs and schedule an introductory
              call.
            </p>

            <p
              style="
                margin: 0 0 25px 0;
                font-family: 'Poppins', Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
              "
            >
              In the meantime, feel free to learn more about how we drive
              strategic digital transformation:
            </p>
          </td>
        </tr>

        <tr>
          <td
            align="center"
            style="padding: 0 40px 40px 40px"
            class="content-padding"
          >
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              align="center"
              style="margin: auto"
            >
              <tr>
                <td
                  align="center"
                  class="button"
                  style="background-color: #008060; border-radius: 5px"
                >
                  <a
                    href="[CTA Link]"
                    target="_blank"
                    style="
                      color: #ffffff;
                      text-decoration: none;
                      padding: 12px 20px;
                      display: inline-block;
                      border-radius: 5px;
                      font-weight: 600;
                      font-size: 16px;
                      font-family: 'Poppins', Arial, sans-serif;
                      border: 1px solid #008060;
                    "
                  >
                    Explore Our Solutions &nbsp;&rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td
            style="
              background-color: #1a2a38;
              padding: 30px 40px;
              color: #cccccc;
              font-size: 13px;
            "
            class="content-padding"
          >
            <p style="margin: 0 0 20px 0; color: #ffffff; font-weight: 600">
              The ZoteTech Solutions Team
            </p>

            <p style="margin: 0 0 10px 0">
              Email: ${process.env.EMAIL}
            </p>

            <p style="margin: 0">
              &copy; 2024 ZoteTech Solutions. All rights reserved. |
              <a
                href="[Unsubscribe Link]"
                target="_blank"
                style="color: #888888; text-decoration: underline"
                >Unsubscribe</a
              >
            </p>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
  `;
};



exports.adminMail = (data) => {
  return ` <!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>NEW LEAD: ${data.name} - ZoteTech</title>

    <style type="text/css">
      /* Base styles */
      body
      html {
        margin: 0 !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        color: #333333;
      }
      /* Reset table styles for better client support */
      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
        border-collapse: collapse;
      }

      /* Admin-specific styles */
      .full-width-table {
        width: 100%;
        max-width: 600px;
      }
      .data-label {
        font-weight: bold;
        padding: 10px 15px;
        background-color: #f0f0f0;
        border-bottom: 1px solid #e0e0e0;
        width: 30%;
      }
      .data-value {
        padding: 10px 15px;
        border-bottom: 1px solid #e0e0e0;
        width: 70%;
      }
      .cta-button {
        background-color: #008060;
        color: #ffffff;
        padding: 10px 20px;
        display: inline-block;
        text-decoration: none;
        font-weight: bold;
        border-radius: 5px;
      }

      /* Responsive Styles */
      @media screen and (max-width: 600px) {
        .full-width-table {
          width: 100% !important;
          max-width: none !important;
        }
        .content-padding {
          padding: 20px 20px !important;
        }
        .data-label,
        .data-value {
          width: 100% !important;
          display: block !important;
          box-sizing: border-box !important;
        }
        .data-label {
          background-color: #e9e9e9;
          border-top: 1px solid #e0e0e0;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0">
    <center style="width: 100%; background-color: #ffffff">
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        class="full-width-table"
        style="
          max-width: 600px;
          width: 100%;
          background-color: #ffffff;
          border: 1px solid #dddddd;
        "
      >
        <tr>
          <td
            style="
              background-color: #1a2a38;
              padding: 20px 30px;
              color: #ffffff;
              text-align: center;
            "
          >
            <h1 style="margin: 0; font-size: 22px; font-weight: 600">
              NEW CONTACT FORM LEAD 
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding: 30px 0 0 0" class="content-padding">
            <p
              style="
                margin: 0 30px 20px 30px;
                font-size: 16px;
                line-height: 24px;
              "
            >
              A new contact form has been submitted. Please review the details
              below for lead assignment and follow-up.
            </p>

            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              width="100%"
            >
              <tr>
                <td
                  colspan="2"
                  style="
                    background-color: #008060;
                    color: #ffffff;
                    padding: 10px 15px;
                    font-weight: bold;
                    font-size: 16px;
                  "
                >
                  CONTACT DETAILS
                </td>
              </tr>
              <tr>
                <td class="data-label">Name</td>
                <td class="data-value">${data.name}</td>
              </tr>
              <tr>
                <td class="data-label">Company</td>
                <td class="data-value">${data.companyName}</td>
              </tr>
              <tr>
                <td class="data-label">Email Address</td>
                <td class="data-value">
                  <a
                    href="mailto:${data.email}"
                    style="color: #008060; text-decoration: none"
                    >${data.email}</a
                  >
                </td>
              </tr>
              <tr>
                <td class="data-label">Phone Number</td>
                <td class="data-value">${data.number}</td>
              </tr>

              <tr>
                <td
                  colspan="2"
                  style="
                    background-color: #008060;
                    color: #ffffff;
                    padding: 10px 15px;
                    font-weight: bold;
                    font-size: 16px;
                  "
                >
                  PROJECT DETAILS
                </td>
              </tr>
              <tr>
                <td class="data-label">Service Interest</td>
                <td class="data-value">${data.serviceInterest}</td>
              </tr>
              <tr>
                <td class="data-label">Project Budget</td>
                <td class="data-value">${data.projectBudget}</td>
              </tr>

              <tr>
                <td
                  colspan="2"
                  style="
                    background-color: #008060;
                    color: #ffffff;
                    padding: 10px 15px;
                    font-weight: bold;
                    font-size: 16px;
                  "
                >
                  CLIENT MESSAGE
                </td>
              </tr>
              <tr>
                <td
                  colspan="2"
                  style="
                    padding: 15px;
                    border-bottom: 1px solid #e0e0e0;
                    font-style: italic;
                    line-height: 22px;
                  "
                >
                  ${data.message}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding: 30px 30px 40px 30px">
            <a
              href="[CRM/Internal System Link]"
              target="_blank"
              class="cta-button"
            >
              Open Lead in CRM
            </a>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;
};
