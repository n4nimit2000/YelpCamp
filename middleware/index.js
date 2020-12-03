var Campground = require('../models/campgrounds');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash('error','You need to be logged in to do that');
    res.redirect('/login');
}

middlewareObj.validUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,function(err, foundCampground){
            if(err){
                console.log(err);
            } else{
                if(foundCampground.author.id.equals(req.user._id)){
                    return next();
                } else{
                    req.flash('error',"You don't have permission to do that");
                    return res.redirect('/campgrounds');
                }
            }
        })
    } else{
        req.flash('error','You need to be logged in to do that');
        res.redirect('/campgrounds');
    }
}

module.exports = middlewareObj;