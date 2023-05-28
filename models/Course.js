const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,        
        required:true
    },

    hours:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        
    },
    createdAdd:{
        type:Date,
        default: Date.now()
    },
    slug:{
        type:String,
        unique:true,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
CourseSchema.pre('validate',function(next){
    this.slug = slugify(this.name,{
        lower:true,
        strict:true
    });
    next();
})
const Course = mongoose.model('Course',CourseSchema);


module.exports = Course;