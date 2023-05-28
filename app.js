
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride =require('method-override');

const pageRoute = require('./routes/pageRoute');



const app = express();

// Connect DB
mongoose.connect('mongodb+srv://alanyalialper:metallica1@misfitdb.pmc9hkq.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useFindAndModify:false,
    // useCreateIndex:true
}).then(()=>{
    console.log('Connected to DB');
})


// Template Engine
app.set('view engine',"ejs");


//Global Variables

global.userIN = null;
// Middleware

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  store: MongoStore.create({ mongoUrl:'mongodb+srv://alanyalialper:metallica1@misfitdb.pmc9hkq.mongodb.net/?retryWrites=true&w=majority' }),
  saveUninitialized: true
}));
app.use(flash());
app.use((req,res,next)=>{
  res.locals.flashMessages = req.flash();
  next();
})
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))

app.use('*',(req,res,next)=>{
  userIN = req.session.userID;
  next()
})
app.use('/',pageRoute);



    
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App started on port ${port}`);
})