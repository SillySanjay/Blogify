const user = require('../models/user');
const blog = require('../models/blog');

async function getsignin(req,resp){
    return resp.render('signin');
}
async function getsignup(req,resp){
    return resp.render('signup');
}
async function postsignin(req,resp){
    const {email,password} = req.body;
    try{
        const JWTtoken = await user.MatchPasswordAndGenerateToken(email,password)
        console.log('Token',JWTtoken);
        return resp.cookie("token",JWTtoken).redirect("/");

    }
    catch{
        resp.render('signin',{
            error : 'Incorrect email or Password'
        })
    }
}
async function postsignup(req,resp){
    const {fullname,email,password} = req.body;
    await user.create({
        fullname,
        email,
        password,
    });
    return resp.redirect('/')
}
async function gethome(req,resp){
    const allbolgpost = await blog.find();
    return resp.render("home",{
        blogs:allbolgpost,
        user:req.user
    })
}
async function getlogout(req,resp){
    resp.clearCookie('token').redirect('/')
}

module.exports = {
    getsignin,
    getlogout,
    gethome,
    postsignup,
    postsignin,
    getsignup,
}