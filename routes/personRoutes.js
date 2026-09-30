const express = require('express');
const router = express.Router();
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const Person = require('./../models/Person');

router.post('/signup', async (req,res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
  
    const response = await newPerson.save();
    console.log('Data saved');

    const payload = {
      id: response.id,
      username: response.username
    }

    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is : ",token);

    res.status(200).json({response: response, token: token});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

////Login Route
router.post('/login', async (req,res) => {
  try{

    //Extract the username and password from the request body
    const {username, password} = req.body;

    //Find the user by the username in database 
    const user = await Person.findOne({username: username});

    //If user does not exist or password does not match, return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    //If user and password match, generate Token
    const payload = {
      id: user.id,
      username: user.username
    }

    const token = generateToken(payload);

    //return token as response

    res.json({token})

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})


//Profile Route
router.get('/profile',jwtAuthMiddleware , async (req,res) =>{
  try{
    const userData = req.user;
    console.log("User Data: ",userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({user});



  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

//GET method to get the person

router.get('/',jwtAuthMiddleware , async (req,res) => {
  try{
    const data = await Person.find();
    console.log('Person Data Fetched Successfully');
    res.status(200).json(data);
  }catch(err){
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// GET method to fetch the data of "ONLY WAITERS"

router.get('/:workType', async (req,res) => {
  try{
    const workType = req.params.workType;
  if(workType == 'Chef' || workType == 'Waiter' || workType == 'Manager'){
    const response = await Person.find({work:workType});
    console.log('response fetched');
    res.status(200).json(response);
  }else{
    res.status(404).json({error : "Invalid Work Type"});
  }
  }catch(err){
    console.log(err);
    res.status(500).json({error : 'Internal Server Error'});
  } 
})

//PUT Method

router.put('/:id', async (req,res) => {
  try{
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatePersonData = req.body; // Updated data for the person
    
    const response = await Person.findByIdAndUpdate(personId, updatePersonData ,{
      new: true, // Return the Updated document
      runValidators: true //Run Mongoose validation
    })

    if(!response){
      return res.status(404).json({error:'Person not found'});
    }

    console.log("Data Updated");
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error : 'Internal Server Error'});
  }
})

//DELETE Method

router.delete('/:id', async (req,res) => {
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log("Data Deleted");
    res.status(200).json({message:'Person Deleted'});
  }catch(err){
    console.log(err);
    res.status(500).json({error : 'Internal Server Error'});
  }
})

module.exports = router;