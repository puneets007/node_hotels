const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels' // Replace mydatabase with whatever you want

// Set up MongoDB Connection
mongoose.connect(mongoURL)

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