const {validatetoken} = require('../services/auth');
const jwt = require('jsonwebtoken');
function CheckForAuthenticationCookie(cookieName){
    return (req,resp,next) =>{
        const TokenCookieValue = req.cookies[cookieName];
        if(!TokenCookieValue){
            return next();
        } 

        try{
            const userPayload = validatetoken(TokenCookieValue);
            req.user = userPayload;
        }
        catch(error){};

        return next();
    }
}

module.exports = {
    CheckForAuthenticationCookie,
}