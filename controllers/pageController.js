const User = require('../models/User');
const Course = require('../models/Course');

exports.getIndexPage = (req,res)=>{
    
    res.status(200).render('index',{page_name:'index'}); 
};

exports.getAboutPage = (req,res)=>{
    res.status(200).render('about',{page_name:'about'});
};

exports.getContactPage = (req,res)=>{
    res.status(200).render('contact',{page_name:'contact'});
};

exports.getServicePage = async (req,res)=>{
 try{
    const courses = await Course.find();
    console.log(courses);
    res.status(200).render('service',{page_name:'service',services: courses});
 }catch(err){
        console.log(err);
 }
 finally{
    console.log("asdsdf")
 }
};
exports.getNewsPage = (req,res)=>{
    res.status(200).render('news',{page_name:'news'});
};
exports.getTrainerPage = async (req,res)=>{
    const users = await User.find();
    const trainers = users.filter(user => user.role === 'trainer');
    
    res.status(200).render('trainer',{page_name:'trainer',trainers:trainers});
};
exports.getGalleryPage = (req,res)=>{
    res.status(200).render('gallery',{page_name:'gallery'});
};
exports.getLoginPage = (req,res)=>{
    res.status(200).render('login',{page_name:'login'},);
};

exports.getRegisterPage = (req,res)=>{
    res.status(200).render('register',{page_name:'register'});
};

