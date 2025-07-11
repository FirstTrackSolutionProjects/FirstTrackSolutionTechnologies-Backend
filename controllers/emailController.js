const { transporter } = require('../utils/email');
const hr_email = require('../utils/hr_email');
const hrms_db = require('../utils/hrms_db')
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const careerMail = async (req, res) => {
  const {formData, cvKey} = req.body;
    const {firstName,lastName,email,phone,description,streetAddress,city, state, postalCode,country, qualification, course, gender, dob} = formData;

    const transaction = await hrms_db.beginTransaction();
    await transaction.query(`
      INSERT INTO Career_Submissions (first_name, last_name, email, mobile, description, address, city, state, pincode, country, qualification, applied_for, gender, dob, cv_doc)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,[
        firstName,lastName,email,phone,description,streetAddress,city, state, postalCode,country, qualification, course, gender, dob, cvKey
      ])
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: `${process.env.CAREER_EMAIL},${process.env.ADMIN_EMAIL}`,
        subject: 'Career Form Submission',
        html: `
          <h2>New Career Application</h2>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Gender:</strong> ${gender}</p>
          <p><strong>Date of Birth:</strong> ${dob}</p>
          <p><strong>Street Address:</strong> ${streetAddress}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>Postal Code:</strong> ${postalCode}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Qualification:</strong> ${qualification}</p>
          <p><strong>Position Applied For:</strong> ${course}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Resume:</strong> <a href="https://firsttracksolution-docs.s3.ap-south-1.amazonaws.com/${cvKey}">View Resume</a></p>
        `
    };
  try {
    await transporter.sendMail(mailOptions)
    await transaction.commit();
    return res.status(200).json({ status: 200, message: 'Form submitted successfully', success: true });
  } catch (e) {
    await transaction.rollback();
    return res.status(500).json({ status: 500, message: 'Failed to send email. Please try again.' });
  }
}

const contactEmail = async (req, res) => {
  const { firstName, lastName, email, phone, description } = req.body;
  if (!firstName || !lastName || !email || !phone || !description) {
    return res.status(400).json({ status: 400, message: 'Please fill in all fields.' });
  }

  const transaction = await hrms_db.beginTransaction();
  await transaction.query(`INSERT INTO Contact_Submissions (first_name, last_name, email, mobile, message)
    VALUES (?,?,?,?,?)`, [firstName, lastName, email, phone, description]);

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.CONTACT_EMAIL}`,
    subject: 'Contact Submission',
    text: `This is a contact submission mail \n${firstName} \n${lastName} \n${email} \n${phone} \n${description}`
  };
  try {
    await transporter.sendMail(mailOptions)
    await transaction.commit();
    return res.status(200).json({ status: 200, message: 'Email sent successfully!' });
  } catch (e) {
    console.error(e)
    await transaction.rollback();
    return res.status(500).json({ status: 500, message: 'Failed to send email. Please try again.' });
  }
}

const joiningMail = async (req, res) => {
  let transaction;
  try {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decoded = await jwt.verify(token, JWT_SECRET);
  const requestId = decoded.requestId;
  const { formData, docs } = req.body;

  const {
    tenthDocument,
    twelfthDocument,
    graduationDocument,
    postGraduationDocument,
    panDoc,
    aadhaarDoc,
    passbook,
    letter,
    salary,
    photo
  } = docs;

  const {
    firstName,
    lastName,
    email,
    phone,
    streetAddress,
    city,
    state,
    postalCode,
    qualification,
    age,
    dob,
    bloodGroup,
    maritalStatus,
    gender,
    country,
    fathersName,
    mothersName,
    guardianName,
    guardianRelation,
    parentsGuardianMobile,
    landmark,
    isPermanentAddressSame,
    permanentAddressLandmark,
    permanentStreetAddress,
    permanentAddressCity,
    permanentAddressState,
    permanentAddresstPostalCode,
    permanentAddressCountry,
    pan,
    aadhaar
  } = formData;

  transaction = await hrms_db.beginTransaction();
  
    const [joinUsRequests] = await transaction.execute(
      `SELECT id FROM Join_Us_Requests WHERE id = ? AND status = "PENDING"`,
      [requestId]
    );

    if (!joinUsRequests.length) {
      return res.status(400).json({ message: "Join Us application request not found" });
    }

    const joinUsRequestId = joinUsRequests[0]?.id;

    await transaction.execute(`
      UPDATE Join_Us_Request_Submissions
      SET is_active = false
      WHERE join_us_request_id = ?
      `,[joinUsRequestId]);

    const [submission] = await transaction.execute(
      `INSERT INTO Join_Us_Request_Submissions (
        join_us_request_id, address, landmark, city, state, pincode, country,
        mothers_name, fathers_name,
        guardian_name, guardian_relation, parents_guardian_mobile,
        permanent_address_landmark, permanent_street_address,
        permanent_address_city, permanent_address_state,
        permanent_address_postal_code, permanent_address_country,
        is_permanent_address_same, aadhaar, pan, qualification,
        secondary_education_doc, intermediate_education_doc,
        graduation_doc, post_graduation_doc,
        pan_doc, aadhaar_doc, passbook_doc, experience_doc,
        last_three_month_salary_doc, photo_doc,
        age, gender, dob, blood_group, marital_status, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        joinUsRequestId,
        streetAddress,
        landmark,
        city,
        state,
        postalCode,
        country,
        mothersName,
        fathersName,
        guardianName || null,
        guardianRelation || null,
        parentsGuardianMobile,
        permanentAddressLandmark,
        permanentStreetAddress,
        permanentAddressCity,
        permanentAddressState,
        permanentAddresstPostalCode,
        permanentAddressCountry,
        isPermanentAddressSame,
        aadhaar,
        pan,
        qualification,
        tenthDocument,
        twelfthDocument,
        graduationDocument || null,
        postGraduationDocument || null,
        panDoc,
        aadhaarDoc,
        passbook,
        letter || null,
        salary || null,
        photo,
        age,
        gender,
        dob,
        bloodGroup,
        maritalStatus,
        true
      ]
    );

    const submissionId = submission.insertId;

    await transaction.execute(`
      UPDATE Join_Us_Requests
      SET status = "RECEIVED", 
          action_at = ?, 
          action_by = NULL, 
          description = "Submission Received"
      WHERE id = ?`,
      [new Date(), joinUsRequestId]
    );

    await transaction.execute(`
      INSERT INTO Join_Us_Request_Events
      (join_us_request_id, name, description, submission_id)
      VALUES (?, ?, ?, ?)
      `, [joinUsRequestId, 'RECEIVED', 'Submission Received', submissionId]);

    const mailOptionsToHr = require("../mailTemplates/sendHRSubmissionEmail")({
      firstName,
      lastName,
      fathersName,
      mothersName,
      guardianName,
      guardianRelation,
      parentsGuardianMobile,
      email,
      phone,
      age,
      dob,
      bloodGroup,
      maritalStatus,
      gender,
      aadhaar,
      pan,
      qualification,
      landmark,
      streetAddress,
      city,
      state,
      country,
      postalCode,
      isPermanentAddressSame,
      permanentAddressLandmark,
      permanentStreetAddress,
      permanentAddressCity,
      permanentAddressState,
      permanentAddressCountry,
      permanentAddresstPostalCode,
      tenthDocument,
      twelfthDocument,
      graduationDocument,
      postGraduationDocument,
      panDoc,
      aadhaarDoc,
      passbook,
      letter,
      salary,
      photo
    });

    const mailOptionsToCandidate = require("../mailTemplates/sendCandidateSubmissionEmail")({
      firstName,
      lastName,
      fathersName,
      mothersName,
      email,
      phone,
      age,
      dob,
      bloodGroup,
      maritalStatus,
      gender,
      aadhaar,
      pan,
      qualification,
      landmark,
      streetAddress,
      city,
      state,
      country,
      postalCode,
      isPermanentAddressSame,
      permanentAddressLandmark,
      permanentStreetAddress,
      permanentAddressCity,
      permanentAddressState,
      permanentAddressCountry,
      permanentAddresstPostalCode,
      tenthDocument,
      twelfthDocument,
      graduationDocument,
      postGraduationDocument,
      panDoc,
      aadhaarDoc,
      passbook,
      letter,
      salary,
      photo
    });

    await Promise.all([
      hr_email.sendMail(mailOptionsToHr),
      hr_email.sendMail(mailOptionsToCandidate)
    ]);

    await transaction.commit();
    return res.status(200).json({ status: 200, message: "Application form submitted successfully", success: true });
  } catch (e) {
    if (transaction) await transaction.rollback();
    console.error("Error sending join mail:", e);
    return res.status(500).json({ status: 500, message: 'Failed to send email. Please try again later.' });
  }
};

module.exports = { careerMail, contactEmail, joiningMail }