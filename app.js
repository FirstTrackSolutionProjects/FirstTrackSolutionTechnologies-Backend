const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config()
const {connectDB} = require('./utils/db');
const emailRoutes = require('./routes/emailRoutes');
const s3Routes = require('./routes/s3Routes');
const joinUsRoutes = require('./routes/joinUsRoutes');
const hrmsS3Routes = require('./routes/hrmsS3Routes');
connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use('/email',emailRoutes)
app.use('/s3',s3Routes);
app.use('/join-us-requests', joinUsRoutes);
app.use('/hrms-s3', hrmsS3Routes);


module.exports.handler = serverless(app);

// app.listen(3100, ()=>{
//     console.log('Server is running on port 3100')
// })