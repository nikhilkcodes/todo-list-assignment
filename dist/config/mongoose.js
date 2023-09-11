"use strict";
const mongoose = require("mongoose");
const mongoDBUrl = process.env.MONGODB_URL;
// connect to the database
// mongoose.connect('mongodb://localhost:27017/27017');
mongoose.connect(mongoDBUrl);
// aquire the connection (to check if it is successful)
const db = mongoose.connection;
// error
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));
// up and running then print the message
db.once('open', function () {
    console.log('Connected to Database');
});
// exporting the database
module.exports = db;
