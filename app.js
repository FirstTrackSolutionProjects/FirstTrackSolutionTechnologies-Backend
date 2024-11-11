const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config()
const {connectDB} = require('./utils/db');

connectDB();

const app = express();
app.use(express.json());
app.use(cors())


module.exports.handler = serverless(app);