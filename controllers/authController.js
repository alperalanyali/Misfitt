const User = require('../models/User');
const Course = require('../models/Course');
const { body, validationResult } = require('express-validator');


exports.register = async (req,res)=>{
    try {
        console.log(req.body);
        const user =await User.create(req.body);
        res.status(201).redirect('/login');
        
    } catch (error) {
        const errors = validationResult(req);
        console.log(errors);
        for (let i = 0; i <errors.array().length; i++) {
            req.flash("error", `${errors.array()[i].msg}`);
            console.log(errorss.array()[i].msg);
        }
        res.status(400).redirect('/register');
    }
};

exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email:email});        
        console.log(user);
        if(user){
           /* bcrypt.compare(password,user.password,(err,same)=>{
                if(same){
                    //User session    
                    req.session.userID = user._id;            
                    // res.status(200).send('YOU ARE LOGGED IN');
                    res.status(200).redirect('/auth/dashboard')
                }
            });*/
           // res.status(200).send("YOUR ARE LOGGED IN")
           if(user.password == password){
            req.session.userID = user._id;   
            res.status(200).redirect('/auth/dashboard');
           }
            
        }

        
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
          });  
    }
}
exports.logoutUser = async (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}
exports.getDashboardPage = async (req,res)=>{
    const user = await User.findOne({_id:req.session.userID}).populate('courses')    
     const courses = await Course.find({user:req.session.userID});
    const users = await User.find();
    res.status(200).render('dashboard',
    {page_name:'dashboard',
        user:user,
         courses:courses,
        users:users
    });
};

