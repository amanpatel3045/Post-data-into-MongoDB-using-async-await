const express = require("express");

// backend ka router jo express provide kr rha hai

const router = express.Router();

require("../db/conn");
const User = require("../model/userSchema");

// router.get('/',(req,res)=>{
//     res.send(`You are on home page using router js in express`);
// });

//POST DATA USING async await
//Using async await is better than promises
//bcz it reduces lines of code and easy to understand

//register page pe jo bhi data enter kroge wo sb post ho jayega
router.post("/register", async (req, res) => {
    //getting all data using object destructuring
  const { name, email, phone, work, password, cpassword } = req.body;

  //FOR VALIDATION
  // agr koi bhi input filled empty rh gyi like name,email etc
  //to hm ek error show karenge user ko
  //error=> please fill all details.

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all details" });
  }
  try {
    //checking (stored email in db,user's filled email) user is registered or not
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    }
//else new user hai toh data ko get kro

    const user = new User({ name, email, phone, work, password, cpassword });

// then user data ko Mongodb ke collection me save kr do
    await user.save();
    //after saving in collection 
    //res.status 201 dekar message show kr do
    res.status(201).json({ message: "user registered successfully" });

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
