const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem');

//POST Method 

router.post('/', async (req,res) => {
  try{
    const data = req.body;

  const Menu = new MenuItem(data);

  const response = await Menu.save();
  console.log("Menu Data Saved");
  res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Menu Server Error'});
  }
  
})



// GET method to get menuItem

router.get('/', async (req,res) => {
  try{
    const data = await MenuItem.find();
    console.log("Menu Data Fetched Successfully");
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Menu Server Error'});
  }
})

// GET Method to fetch the data of 'ONLY SOUR'

router.get( '/:tasteType' , async ( req , res ) => { 
  try {
  const tasteType = req.params.tasteType ;
  if ( tasteType == 'Sweet' || tasteType == 'Sour' || tasteType == 'Spicy' ) { 
  const response = await MenuItem.find ( { taste:tasteType } ) ;
  console . log ( 'Menu Data Fetched' ) ;
  res . status ( 200 ) . json ( response ) ; } else {
  res . status ( 404 ) . json ( { error : 'Invalid Taste Type' } ) ;
  }
  } catch ( error ) {
  console . log ( error ) ;
  res . status (500) . json ( { error : 'Internal Server Error' } ) ;
  }
  })

//PUT Method


router.put('/:id', async (req,res) => {
  try{
    const menuItemId = req.params.id; // Extract the id from the URL parameter
    const updateMenuItemData = req.body; // Updated data for the person
    
    const response = await MenuItem.findByIdAndUpdate(menuItemId, updateMenuItemData ,{
      new: true, // Return the Updated document
      runValidators: true //Run Mongoose validation
    })

    if(!response){
      return res.status(404).json({error:'Menu Item not found'});
    }

    console.log("Menu Data Updated");
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error : 'Internal Server Error'});
  }
})


//DELETE Method



router.delete('/:id', async (req,res) => {
  try{
    const menuItemId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log("Menu Data Deleted");
    res.status(200).json({message:'Menu Item Deleted'});
  }catch(err){
    console.log(err);
    res.status(500).json({error : 'Internal Server Error'});
  }
})


//Comment added for testing purpose
module.exports = router ;