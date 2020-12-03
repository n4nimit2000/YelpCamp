var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comments');
var User = require('./models/user');
var passport = require('passport');
var localStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var methodOverride =  require('method-override');
var flash = require('connect-flash');
var seedDB = require('./seed');

var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index'); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(flash());
//seedDB();

//Passport Configuration
app.use(require('express-session')({
    secret: "aabsdfDASkd6nfl1aD2FAA",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Sending current user to all the templates
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

//Overriding the methods
app.use(methodOverride('_method'));

//Using all the routes
app.use(indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);


// Assigning Port to the server
app.listen(8080,function(){
    console.log("YelpCamp Server has started");
});


/*
Set the path to D: drive and write the following command:
mongodb/bin/mongod --dbpath mongodb-data
*/