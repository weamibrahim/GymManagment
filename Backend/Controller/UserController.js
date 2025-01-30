const User = require('../Models/User');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userController = {};


// userController.register = async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
  
//       // Check if user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//       }
  
//       // Hash password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
  
//       // Create new user
//       const user = new User({ name, email, password: hashedPassword });
//       await user.save();
  
//       return res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error(error);     
//       return res.status(500).json({ message: 'Server error' });
//     }
//   };    




userController.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'user not found' });
      }
  
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
  
 
      return  res.cookie('token', token, {
        httpOnly: true, 
        
        maxAge: 3600000,
        secure: true, 
        sameSite: 'None', 
      }).status(200).json({ message: 'Login successful' ,user});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  
  
  
module.exports = userController;