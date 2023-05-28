const Course = require("../models/Course");

const User = require('../models/User');
exports.createCourse = async (req, res) => {
    console.log(req.body);
  try {
    const course = await Course.create({
      name:req.body.name,
      description:req.body.description,      
      hours:req.body.hours,
      price:req.body.price,
      user:req.session.userID
    });
    
    res.status(201).redirect('/auth/dashboard')
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.getAllCourses = async (req, res) => {
  try {

    const query = req.query.search;
    console.log(query);
    

    let filter = {};

    res.status(200).render('service', {
      courses,    
      page_name: 'service',
  
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {

    const user = await User.findById(req.session.userID);
    
    const course = await Course.findOne({slug:req.params.slug}).populate('user');

    res.status(200).render('course', {
      course,
      user,
      page_name: 'course-single',
  
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.enrollCourse = async (req,res)=>{
  try{
    let userId = req.session.userID;
    console.log(userId)
      let user = await User.findById(userId);
      console.log(user)
      await user.courses.push({_id:req.body.course_id});
    await user.save();
    res.status(200).redirect('/auth/dashboard');
  }catch (error) {
    res.status(400).json({status: 'fail', error});
  }
}

exports.releaseCourse = async (req,res)=>{
  try{
    let userId = req.session.userID;
    console.log(userId)
      let user = await User.findById(userId);
      console.log(user)
      await user.courses.pull({_id:req.body.course_id});
    await user.save();
    res.status(200).redirect('/auth/dashboard');
  }catch (error) {
    res.status(400).json({status: 'fail', error});
  }
}
exports.deleteCourse = async (req,res)=>{
  try{
      await Course.findOneAndRemove({slug:req.params.slug});
      res.status(200).redirect('/auth/dashboard');
  }catch (error) {
    res.status(400).json({status: 'fail', error});
  }
}

exports.updateCourse = async (req, res) => {
  try {    

    const course = await Course.findOne({slug:req.params.slug});
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;

    course.save();

    res.status(200).redirect('/auth/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};