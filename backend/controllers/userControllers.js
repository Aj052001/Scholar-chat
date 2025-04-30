const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/generateToken");
const registerUser = asyncHandler(async (req, res) => {

  console.log(req.body)
  const { name,scholar, email, password, pic } = req.body;
  
  

  if (!name || !email || !password || !scholar) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    scholar,
    email,
    password,
    pic,
  });

  console.log(user)
  if (user) {
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      scholar:user.scholar,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

//login function for user

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      scholar:user.scholar,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// /api/user?search=piyush
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        //after scholar number found
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { scholar: { $regex: req.query.search, $options: "i" } }
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
