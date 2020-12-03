var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var Campground = require('../models/campgrounds');
var middleware = require('../middleware');

//Displaying all the campgrounds
router.get('/',function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('campgrounds/index',{camps:allCampgrounds});
        }
    })
});


//Creating a new campground
router.post('/', middleware.isLoggedIn, function(req,res){
    var name=req.body.name;
    var url=req.body.url;
    var desc=req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp={name: name, url: url, description: desc, author: author };
    Campground.create(newCamp,function(err,camp){
        if(err)
        {
            req.flash('error','Something went wrong');
            console.log(err);
        }
        else
        {
            req.flash("success","Successfully created a new campground");
            res.redirect('/campgrounds');
        }
    });
    
});

router.get('/new', middleware.isLoggedIn, function(req,res){
    res.render('campgrounds/new');
});


// Displaying a particular campground
router.get('/:id', function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            res.render('campgrounds/show',{camp});
        }
    })
});


//Editing a campground
router.get('/:id/edit', middleware.validUser, function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else{
            res.render('campgrounds/edit',{campground});
        }
    }) 
});
router.put('/:id', middleware.validUser, function(req,res){
    var updatedCampground = {
        name: req.body.name,
        url: req.body.url,
        description: req.body.description
    };
    Campground.findByIdAndUpdate(req.params.id,updatedCampground,function(err,updatedCamp){
        if(err){
            console.log(err);
        } else{
            req.flash('success','Successfully updated the campground');
            res.redirect('/campgrounds/'+req.params.id);
        }
    })
});


//Deleting a Campground
router.delete('/:id', middleware.validUser,function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err);
        } else{
            req.flash('success','Successfully deleted the campground');
            res.redirect('/campgrounds');
        }
    })
});


module.exports = router;