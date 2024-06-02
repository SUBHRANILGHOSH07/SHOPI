const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");//this is used to encrypt the password
const jwt = require("jsonwebtoken");//this is used to create a token for the user

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,//this will create a new user with the username, email and password
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,//this will encrypt the password
      process.env.PASS_SEC//this will use the password secret to encrypt the password
    ).toString(),//this will convert the encrypted password to a string
  });

  try {
    const savedUser = await newUser.save();//this will save the new user to the database
    res.status(201).json(savedUser);//this will return the saved user
  } catch (err) {
    res.status(500).json(err.message);//this will return an error message if the user is not saved
  }
});

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(//this will find the user by the username
            {
                username: req.body.username//this will find the user by the username
            }
        );

        !user && res.status(401).json("Wrong User Name");//this will return an error message if the user is not found

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,//this will decrypt the password
            process.env.PASS_SEC//this will use the password secret to decrypt the password
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);//this will convert the decrypted password to a string

        const inputPassword = req.body.password;//this will get the password from the user
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");//this will return an error message if the password is wrong

            const accessToken = jwt.sign(
                {
                    id: user._id,//this will create a token for the user
                    isAdmin: user.isAdmin//this will check if the user is an admin
                },
                process.env.JWT_SEC,//this will use the jwt secret to create the token
                {expiresIn: "3d"}//this will set the token to expire in 3 days
            );

            const {password, ...others} = user._doc;//this will return the user without the password


        res.status(200).json({...others, accessToken});//this will return the user and the token
    }catch(err){
        res.status(500).json(err.message);//this will return an error message if the user is not found
    }

});

module.exports = router;//this will export the router
