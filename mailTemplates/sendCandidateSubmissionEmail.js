const HRMS_BUCKET_URL = process.env.HRMS_BUCKET_URL;

const sendCandidateSubmissionEmail = ({
  firstName, lastName, fathersName, mothersName, email, phone, age, dob,
  bloodGroup, maritalStatus, gender, aadhaar, pan, qualification,
  landmark, streetAddress, city, state, country, postalCode,
  isPermanentAddressSame, permanentAddressLandmark, permanentStreetAddress,
  permanentAddressCity, permanentAddressState, permanentAddressCountry,
  permanentAddresstPostalCode,
  tenthDocument, twelfthDocument, graduationDocument, postGraduationDocument,
  panDoc, aadhaarDoc, passbook, letter, salary, photo
}) => {
  const permanentAddressHTML = isPermanentAddressSame
    ? `<p><strong>Permanent Address:</strong> Same as current address</p>`
    : `
      <p><strong>Permanent Address:</strong></p>
      <ul>
        <li><strong>Landmark:</strong> ${permanentAddressLandmark}</li>
        <li><strong>Street Address:</strong> ${permanentStreetAddress}</li>
        <li><strong>City:</strong> ${permanentAddressCity}</li>
        <li><strong>State:</strong> ${permanentAddressState}</li>
        <li><strong>Country:</strong> ${permanentAddressCountry}</li>
        <li><strong>Postal Code:</strong> ${permanentAddresstPostalCode}</li>
      </ul>
    `;

  return {
    from: process.env.HR_EMAIL,
    to: email,
    subject: 'Join Us Form Submission Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #007bff;">Thank You, ${firstName}!</h2>
        <p>We have received your Join Us form submission successfully. Below is a copy of the details you provided:</p>
        <hr>
        <h3>Personal Details</h3>
        <ul>
          <li><strong>First Name:</strong> ${firstName}</li>
          <li><strong>Last Name:</strong> ${lastName}</li>
          <li><strong>Father's Name:</strong> ${fathersName}</li>
          <li><strong>Mother's Name:</strong> ${mothersName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Age:</strong> ${age}</li>
          <li><strong>Date of Birth:</strong> ${dob}</li>
          <li><strong>Blood Group:</strong> ${bloodGroup}</li>
          <li><strong>Marital Status:</strong> ${maritalStatus}</li>
          <li><strong>Gender:</strong> ${gender}</li>
          <li><strong>Aadhaar:</strong> ${aadhaar}</li>
          <li><strong>PAN:</strong> ${pan}</li>
          <li><strong>Qualification:</strong> ${qualification}</li>
        </ul>
        <h3>Current Address</h3>
        <ul>
          <li><strong>Landmark:</strong> ${landmark}</li>
          <li><strong>Street Address:</strong> ${streetAddress}</li>
          <li><strong>City:</strong> ${city}</li>
          <li><strong>State:</strong> ${state}</li>
          <li><strong>Country:</strong> ${country}</li>
          <li><strong>Postal Code:</strong> ${postalCode}</li>
        </ul>
        ${permanentAddressHTML}
        <h3>Documents</h3>
        <ul>
          <li><strong>10th Document:</strong> <a href="${HRMS_BUCKET_URL}${tenthDocument}">View</a></li>
          <li><strong>12th Document:</strong> <a href="${HRMS_BUCKET_URL}${twelfthDocument}">View</a></li>
          ${graduationDocument ? `<li><strong>Graduation Document:</strong> <a href="${HRMS_BUCKET_URL}${graduationDocument}">View</a></li>` : ''}
          ${postGraduationDocument ? `<li><strong>Post Graduation Document:</strong> <a href="${HRMS_BUCKET_URL}${postGraduationDocument}">View</a></li>` : ''}
          <li><strong>PAN:</strong> <a href="${HRMS_BUCKET_URL}${panDoc}">View</a></li>
          <li><strong>Aadhaar:</strong> <a href="${HRMS_BUCKET_URL}${aadhaarDoc}">View</a></li>
          <li><strong>Passbook:</strong> <a href="${HRMS_BUCKET_URL}${passbook}">View</a></li>
          <li><strong>Letter:</strong> <a href="${HRMS_BUCKET_URL}${letter}">View</a></li>
          ${salary ? `<li><strong>Salary Slip:</strong> <a href="${HRMS_BUCKET_URL}${salary}">View</a></li>` : ''}
          <li><strong>Photo:</strong> <a href="${HRMS_BUCKET_URL}${photo}">View</a></li>
        </ul>
        <hr>
        <p>If any of the information is incorrect, please contact us as soon as possible.</p>
        <p>Best regards,<br><strong>First Track Solution Technologies Team</strong></p>
        <small style="color: #888;">This is an automated message. Please do not reply to this email.</small>
      </div>
    `
  };
};

module.exports = sendCandidateSubmissionEmail;
