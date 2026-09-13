// // JSON to Object
// const jsonString = '{"name" : "Puneet" , "age" : 23}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);

// // object to JSON
// const objectToConvert = {name : "Puneet" , age : 23};
// const jsonStringified = JSON.stringify(objectToConvert);
// console.log(jsonStringified);

const express = require('express');
const app = express()
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Sir, Welcom to our Restaurant, How i can help ypu ?')
})



// IMPORT the router file

const personRoutes = require('./routes/personRoutes');

const menuRoutes = require('./routes/menuItemRoutes');

// Use the Routes
app.use('/person',personRoutes);
app.use('/menu' , menuRoutes);



app.listen(PORT, () => {
  console.log('listening on port 3000')
})
