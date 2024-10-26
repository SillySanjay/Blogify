const {createHmac, randomBytes} = require('node:crypto')
const {Schema,model} = require('mongoose');
const { createtokenforuser } = require('../services/auth');
const userschema = new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String
    },
    password:{
        required:true,
        type:String,
    },
    profileimageURL:{
        type:String,
        default:'images/default.png'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:"USER"
    }
},{timestamps:true})


userschema.pre('save',function(next){
    const user = this;
    
    if(!user.isModified('password')) return;
    
    const salt = randomBytes(16).toString();
    // const salt = "RandomSalt";
    const hashedpassword = createHmac("sha256",salt)
        .update(user.password)
        .digest('hex');
    
    this.salt = salt;
    this.password = hashedpassword;
    next()
})
userschema.static("MatchPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email});

    if(!user) throw new Error("User not found")

    const salt = user.salt;
    const hashedpassword = user.password;

    const userprovidedhash = createHmac("sha256",salt)
        .update(password)
        .digest('hex');

    if(hashedpassword !== userprovidedhash){
        throw new Error("Incorrect Password");
    }
    const token = createtokenforuser(user);
    return token;
})
const user = model('user',userschema);

module.exports = user;
