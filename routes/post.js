const express = require('express')
const router = express.Router();
const Post = require('../models/post')
const checkAuth = require('../check-auth')

router.get('', checkAuth, (req,res)=>{
    Post.find()
    .then(posts =>{
        console.log(posts);
        res.json({
            message:"Posts found",
            bulletinpost:posts
        });
    })
    .catch(err =>{
        console.log(err);
        return res.status(401).json({
            message: "Posts not found"
        });
    })
});

router.post('', checkAuth, (req,res) =>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description,
        departments:req.body.departments,
        author:req.user.userid,
        status:req.body.status,
    });

    post.save()
    .then((result) =>{
        res.status(201).json({
            message:"Post posted",
            bulletinpost:result
        });
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).json({
            message: "Error posting post"
        });
    })
})

router.delete('/:id', checkAuth, (req,res) =>{
    Post.deleteOne({_id:req.params.id})
    .then(() =>{
        res.status(200).json({ 
            message:"Post Deleted" 
        });
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).json({
            message:"Error deleting post"
        });
    })
})

module.exports = router