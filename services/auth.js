const jwt = require('jsonwebtoken');
const user = require('../models/user');

const secretkey = "29032003";

function createtokenforuser(user){
    const payload = {
        _id : user._id,
        fullname:user.fullname,
        email : user.email,
        profileimageURL : user.profileimageURL,
        role : user.role
    }
    const token = jwt.sign(payload,secretkey);
    return token;
}

function validatetoken(token){
    const payload = jwt.verify(token , secretkey);
    return payload;
}

module.exports = {
    createtokenforuser,
    validatetoken,
};