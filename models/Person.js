const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//Define Person Schema or model

const personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  age:{
    type: Number
  },
  work:{
    type:String,
    enum:['Chef','Waiter','Manager'],
    required:true
  },
  mobile:{
    type:String,
    required:true
  },
  email:{
    type: String,
    required:true,
    unique:true
  },
  address:{
    type:String
  },
  salary:{
    type:Number,
    required:true
  },
  username: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

// personSchema.pre('save', async function (next) {
//   const person = this;

//   //Hash the password only if it has been modified (or is new)
//   if (!this.isModified('password')) return next();

//   try{
//     // Hash Password Generate
//     const salt = await bcrypt.genSalt(10);

//     //Hash Password
//     // const hashedPassword = await bcrypt.hash(person.password, salt);
//     this.password = await bcrypt.hash(this.password, salt);
    
//     //Override the plain password with the hashed one
//     // person.password = hashedPassword;

//     next();
//   }catch(err){
//     return next(err);
//   }
// })

personSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

personSchema.methods.comparePassword = async function (candidatePassword){
  try{
    // Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  }catch(err){
    throw err;
  }
}
// Create Person Model

const Person = mongoose.model('Person', personSchema);
module.exports = Person;