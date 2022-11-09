const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
const mails = require('./routes/api/email')

app.use(express.json());
// DB Config 
const db = config.get('mongoURI');
// Connect to mongodb 
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// API Routes
app.use('/api/mails', mails);
app.use('/api/mails/email', mails);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

