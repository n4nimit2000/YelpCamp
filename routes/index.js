var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user');

router.get('/',function(req,res){
    res.render('landing');
});

//Authentication section
router.get('/register',function(req,res){
    res.render('register');
});

router.post('/register',function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            req.flash('error',"A user with the given username is already registered");
            return res.redirect('/register');
        }
        passport.authenticate('local')(req,res,function(){
            req.flash('success','Welcome to YelpCamp '+req.body.username);
            res.redirect('/campgrounds');
        })
    })
})

router.get('/login',function(req,res){
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}) , function(req,res){});

router.get('/logout',function(req,res){
    req.logout();
    req.flash('success', 'Successfully Logged out!');
    res.redirect('/');
});

module.exports = router;