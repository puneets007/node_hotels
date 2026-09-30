const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req,res,next) =>{


  //Extract jwt token from the request headers
  const token = req.headers.authorization.split(' ')[1];
  if(!token) return res.status(401).json({error: 'Unauthorized' });

  try{
    //Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user information to the request object
    req.user = decoded;
    next();
  }catch(err){
    console.log(err);
    res.status(401).json({error: 'Invalid Token'});
  }
}


//Function To generate Token
const generateToken = (userData) =>{
  //Generate a new JWT Token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
}

module.exports = {jwtAuthMiddleware, generateToken}