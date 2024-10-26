const path = require('path');
const multer = require('multer');
const{Router} = require('express');


const blog = require('../models/blog');

const router = Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.resolve(`./public/uploads/`));
    },
    filename: function(req,file,cb){
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null,filename);
    }
});

const upload = multer({storage:storage})


router.get("/add-blog",(req,resp)=>{
    return resp.render("addblog",{
        user: req.user,
    })
})





router.get("/:id",async(req,resp)=>{
    // console.log("heloooo yarrr")
    const Blogpost = await blog.findById(req.params.id);
    return resp.render("blogs",{
        user: req.user,
        blog: Blogpost,
    })
})

router.post('/',upload.single('coverImage'),async(req,resp)=>{
    const {title,body} = req.body;
    const Blog = await blog.create({
        body,
        title,
        createdby: req.user._id,
        coverimageURL: `/uploads/${req.file.filename}`,
    })
    // console.log(req.file);
    return resp.redirect(`/blog/${Blog._id}`)
})


module.exports = router;