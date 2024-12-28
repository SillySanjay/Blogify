const path = require('path');
const multer = require('multer');
const { Router } = require('express');
const blog = require('../models/blog');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Save files to the /tmp directory on Vercel
        cb(null, '/public/tmp');
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

router.get('/add-blog', (req, resp) => {
    return resp.render('addblog', {
        user: req.user,
    });
});

router.get('/:id', async (req, resp) => {
    const Blogpost = await blog.findById(req.params.id);
    return resp.render('blogs', {
        user: req.user,
        blog: Blogpost,
    });
});

router.post('/', upload.single('coverImage'), async (req, resp) => {
    const { title, body } = req.body;

    // Temporary file path in `/tmp`
    const filePath = `/tmp/${req.file.filename}`;

    const Blog = await blog.create({
        body,
        title,
        createdby: req.user._id,
        coverimageURL: filePath, // Save the file path (temporary)
    });

    return resp.redirect(`/blog/${Blog._id}`);
});

module.exports = router;
