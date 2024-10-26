const{Router} = require('express');
const user = require('../models/user');
const router = Router();
const blog = require('../models/blog');
const { getsignin,getsignup,postsignin, postsignup, gethome, getlogout } = require('../controllers/controllers');

router.get('/signin',getsignin);

router.get("/signup",getsignup);

router.post('/signin',postsignin)

router.post('/signup',postsignup)

router.get("/home",gethome)

router.get('/logout',getlogout)

module.exports = router;

