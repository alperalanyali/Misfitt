const User = require('../models/User');
const { body, validationResult } = require('express-validator');


exports.register = async (req,res)=>{
    try {
        console.log(req.body);
        const user =await User.create(req.body);
        res.status(201).redirect('/login');
        
    } catch (error) {
       // const errors = validationResult(req);
        console.log(error);
        // for (let i = 0; i <errors.array().length; i++) {
        //     req.flash("error", `${errors.array()[i].msg}`);
        // }
        res.status(400).redirect('/register');
    }
};

exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email:email});        
        if(user){
            bcrypt.compare(password,user.password,(err,same)=>{
                if(same){
                    //User session    
                    req.session.userID = user._id;            
                    // res.status(200).send('YOU ARE LOGGED IN');
                    res.status(200).redirect('/auth/dashboard')
                }
            });
        }

        
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
          });  
    }
}