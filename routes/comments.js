var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');
var middleware = require('../middleware');

//COMMENTS SECTION
router.get('/new', middleware.isLoggedIn ,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else{
            res.render('comments/new',{campground});
        }
    })
});

router.post('/', middleware.isLoggedIn ,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else{
            var author={
                id: req.user._id,
                username: req.user.username
            };
            var newComment={
                text: req.body.text,
                author: author
            };
            Comment.create(newComment,function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+req.params.id);
                }
            })
        }
    })
});


module.exports = router;