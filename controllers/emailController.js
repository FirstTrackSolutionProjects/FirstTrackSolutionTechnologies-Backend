const { transporter } = require('../utils/email');

const careerMail = async (req, res) => {
  const { formData, cvKey } = req.body;
  const { firstName, lastName, email, phone, description, streetAddress, city, postalCode, country, qualification, course } = formData;
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.HR_EMAIL},${process.env.ADMIN_EMAIL}`,
    subject: 'Career Form Submission',
    text: `This is a career form submission mail \n${firstName} \n${lastName} \n${email} \n${phone} \n${description}\n${streetAddress}\n${city}\n${postalCode}\n${country}\n${qualification}\n${course}\nhttps://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${cvKey}`
  };
  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ status: 200, message: 'Form submitted successfully', success: true });
  } catch (e) {
    return res.status(500).json({ status: 500, message: 'Failed to send email. Please try again.' });
  }
}

const contactEmail = async (req, res) => {
  const { firstName, lastName, email, phone, description } = req.body;
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.EMAIL_USER}`,
    subject: 'Contact Submission',
    text: `This is a contact submission mail \n${firstName} \n${lastName} \n${email} \n${phone} \n${description}`
  };
  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ status: 200, message: 'Email sent successfully!' });
  } catch (e) {
    return res.status(500).json({ status: 500, message: 'Failed to send email. Please try again.' });
  }
}

const joiningMail = async (req, res) => {
  const { formData, docs } = req.body;
  const { tenthDocument,
    twelfthDocument,
    graduationDocument,
    postGraduationDocument,
    pan,
    aadhar,
    passbook,
    letter,
    salary,
    photo,
    resume } = docs;
  const { firstName, lastName, email, phone, description, streetAddress, city, state, postalCode, qualification } = formData;
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.HR_EMAIL}`,
    subject: 'Joining Form Submission',
    text: `This is a joining submission mail \n
                ${firstName} \n
                ${lastName} \n
                ${email} \n
                ${phone} \n
                ${description}\n
                ${streetAddress}\n
                ${city}\n
                ${state}\n
                ${postalCode}\n
                ${qualification}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${tenthDocument}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${twelfthDocument}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${graduationDocument}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${postGraduationDocument}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${pan}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${aadhar}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${passbook}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${letter}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${salary}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${photo}\n
                https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${resume}\n
                `

  };
  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ status: 200, message: "Application form submitted successfully", success: true });
  } catch (e) {
    return res.status(500).json({ status: 500, message: 'Failed to send email. Please try again.' });
  }
}

module.exports = { careerMail, contactEmail, joiningMail }