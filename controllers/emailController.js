const {transporter} = require('../utils/email');

const careerMail = async (req,res) => {
    const {formData, cvKey} = req.body;
    const {firstName,lastName,email,phone,description,streetAddress,city,postalCode,country, qualification, course} = formData;
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: `${process.env.HR_EMAIL},${process.env.ADMIN_EMAIL}`, 
        subject: 'Career Form Submission', 
        text: `This is a career form submission mail \n${firstName} \n${lastName} \n${email} \n${phone} \n${description}\n${streetAddress}\n${city}\n${postalCode}\n${country}\n${qualification}\n${course}\nhttps://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${cvKey}`
      };
      try{
        await transporter.sendMail(mailOptions)
        return res.status(200).json({status: 200, message : 'Form submitted successfully', success: true});
      } catch(e){ 
        return res.status(500).json({status: 500, message : 'Failed to send email. Please try again.'});
      }
}

module.exports = {careerMail}