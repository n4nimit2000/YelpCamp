var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comments');

var data=[];
function seedDB()
{
    Campground.deleteMany({},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log('Removed all the camps');
        }
    })
}

module.exports = seedDB;