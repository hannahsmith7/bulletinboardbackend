const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressBrute = require('express-brute')

router.post('/signup', (req, res)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash => {
        const user = new User({
            username: req.body.username,
            role: req.body.role,
            password: hash
        });
    
    user.save()
    .then(result => {
        res.status(201).json({
            message: "User created",
            result:result
        });
    })
  .catch(err => {
    res.status(500).json({
        error:err
        });
    });
 });
})

const store = new expressBrute.MemoryStore();
const bruteforce = new expressBrute(store);

router.post('/login', bruteforce.prevent, (req, res)=>{
    User.findOne({username:req.body.username})
    .then(fetchedUser=>{
        if(!fetchedUser)
        {
            return res.status(401).json(
                {
                    message: "Autentication Failure"
                });
        }

        console.log(req.body.username);
        console.log(fetchedUser);

        const token = jwt.sign({username:fetchedUser.username,userid:fetchedUser._id,userRole:fetchedUser.role},
            'secret_this_should_be_longer_than_it_is',
            {expiresIn:'12h'});

        res.status(200).json({token:token});
    })
    .catch(err =>{
        console.log(err);
        return res.status(401).json({
            message: "Authentication Failure"
        });
    })
})


module.exports = router