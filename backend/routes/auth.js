const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.post('/register' , async(req , res , next) => {
    try{
        const {username , password} = req.body;

        const createdUser = new User({username});
        const newUser = await User.register(createdUser , password);

        req.login(newUser , (err) => {
            if (err) return next(err);

            res.status(201).json({
                message: "Your Account has been created",
                user: newUser
            })
        })
    }
    catch(error) {
        return res.status(401).json({err: error.message})
    }
})

router.post('/login' , passport.authenticate('local') , (req , res) => {
    res.status(200).json({
        message: "You are successfully logged in",
        user: req.user._id
    })
})

router.post('/logout' , (req , res , next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({message: "You are successfully logged out"});
    })
})

module.exports = router;