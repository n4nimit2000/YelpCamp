var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Creating Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    url: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

//Creating model
var Campground = mongoose.model("Campground",campgroundSchema);

//Exporting the model
module.exports = Campground;