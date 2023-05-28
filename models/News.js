const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NewsSchema = new Schema({
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


const News = mongoose.model('News',NewsSchema);


module.exports = News;