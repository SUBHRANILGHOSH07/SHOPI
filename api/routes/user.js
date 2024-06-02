const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

//UPDATE
router.put('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,//this will encrypt the password
            process.env.PASS_SEC//this will use the password secret to encrypt the password
        ).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err.message);
    }
})

//DELETE

router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{//this will delete the user by the id
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    }catch(err){
        res.status(500).json(err.message);
    }
})

//GET USER

router.get('/find/:id',verifyTokenAndAdmin,async(req,res)=>{//this will get the user by the id
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err.message);
    }
})

//GET ALL USER

router.get('/',verifyTokenAndAdmin,async(req,res)=>{//this will get all the users
    const query = req.query.new;
    try{
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();//this will get all the users 
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err.message);
    }
})

//GET USER STATS

router.get('/stats',verifyTokenAndAdmin,async(req,res)=>{//this will get the user stats
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));//this will give us the date of last year

    try{
        const data = await User.aggregate([
            {$match:{createdAt:{$gte:lastYear}}},//this will match the user by the created date
            {
                $project:{
                    month:{$month:"$createdAt"}//this will get the month of the created date
                }
            },
            {
                $group:{
                    _id:"$month",//this will group the user by the month
                    total:{$sum:1}//this will get the total users
                }
            }
        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err.message);
    }
})



module.exports = router;