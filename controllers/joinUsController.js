const hrms_db = require('../utils/hrms_db')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const JWT_SECRET = process.env.JWT_SECRET;

const validateJoinUsAuth = async (req, res) => {
    try{
        const { email, password } = req.body
        if (!email || !password){
            return res.status(400).json({ message: "Email and password are required" })
        }
        const [requests] = await hrms_db.query(`SELECT * FROM Join_Us_Requests WHERE email = ? AND status = "PENDING"`, [email]);
        if (!requests.length){
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const request = requests[0];

        const hashedPassword = request.password;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);
        if (!isValidPassword){
            return res.status(400).json({ message: "Invalid email or password" })
        }
        const requestId = request.id;

        const token = jwt.sign({ requestId }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Validation Successful!",
            data: token,
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getJoinUsRequest = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const requestId = decoded.requestId;
        const [requests] = await hrms_db.query(`SELECT * FROM Join_Us_Requests WHERE id = ? AND status = "PENDING"`, [requestId]);
        if (!requests.length) {
            return res.status(404).json({ message: "Request not found" });
        }
        const request = requests[0];
        const formattedRequestDetails = {
            first_name: request.first_name,
            last_name: request.last_name,
            email: request.email,
            mobile: request.mobile,
        }
        return res.status(200).json({
            success: true,
            data: formattedRequestDetails,
            message: "Request details retrieved successfully"
        })
    } catch (error){
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    validateJoinUsAuth,
    getJoinUsRequest,
}