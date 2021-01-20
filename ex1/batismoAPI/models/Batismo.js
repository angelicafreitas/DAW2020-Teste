var mongoose = require('mongoose')

var batismoSchema = new mongoose.Schema({
    "date": String,
    "title": String,
    "pai": String,
    "mae": String,
    "ref": String,
    "_id": String,
    "href": String 
});

module.exports = mongoose.model('batismos', batismoSchema)

