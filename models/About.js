const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AboutSchema = new Schema({
    title:{
        type:String,
   
        required:true,
    }, 
    content:{
        type:String,
        required:true,
        unique:true,
    },
    creatAt:{
        type:Date
    }
  
})


const About = mongoose.model('About',NewsSchema);


module.exports = About;