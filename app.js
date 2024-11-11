const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config()
const {connectDB} = require('./utils/db');
const emailRoutes = require('./routes/emailRoutes');
const s3Routes = require('./routes/s3Routes');
connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use('/email',emailRoutes)
app.use('/s3',s3Routes);

module.exports.handler = serverless(app);