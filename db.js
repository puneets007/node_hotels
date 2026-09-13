const mongoose = require('mongoose');
require('dotenv').config();

//const mongoURL = process.env.MONGODB_URL_LOCAL // Replace mydatabase with whatever you want

const mongoURL = process.env.MONGODB_URL;
// Set up MongoDB Connection


mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log("Connected to MongoDB Server");
});
db.on('error', (err) =>{
  console.log("MongoDB Connection Error : ",err);
});
db.on('disconnected', () =>{
  console.log("MongoDB Disconnected");
});

module.exports = db;