const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config()
const {connectDB} = require('./utils/db');
const emailRoutes = require('./routes/emailRoutes');
connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use('/email',emailRoutes)


module.exports.handler = serverless(app);