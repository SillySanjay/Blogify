const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');

const userroutes = require('./routes/user');
const blogroutes = require('./routes/blog');
const blog = require('./models/blog');

const {CheckForAuthenticationCookie} = require('./middlewares/auth')
// const {} = require('./services/auth')

const app = express();
const PORT = 8000;

//view engine
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/Blogify')
.then(()=> console.log('MongoDB Connection Established'))
.catch((err)=>console.log(err));

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(cookieparser());
app.use(CheckForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

app.get("/",async(req,resp)=>{
    const allblogs = await blog.find({})
    resp.render("home", {
        user: req.user,
        blogs: allblogs
    });
})

app.use('/user',userroutes);
app.use('/blog',blogroutes);


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})