// Batismo controller

var Batismo = require('../models/Batismo')

// Returns Batismo lists _id, date, title e ref
module.exports.listsFields = () => {
    return Batismo
        .find({},{pai:0, mae:0, href:0})
        .exec()
}

module.exports.lookUp = (id) => {
    return Batismo
        .findOne({_id:id})
        .exec()
}

module.exports.lookUpProgenitores = () => {
    return Batismo
        .find({},{href:0, date:0, ref:0, title: 0})
        .exec()
}

module.exports.lookUpByYear = (ano) => {
    return Batismo
        .find({date: {$regex: ano + '-'}},{})
        .exec()
}


module.exports.getBaptizedSorted = () => {
    return Batismo
    .aggregate([
        { $project : { baptized : {$arrayElemAt:[{ $split: [{$arrayElemAt:[{ $split: ["$title", "."] },1]}, " "] },2]}}},
        { $sort : { baptized : -1 } }
       ])
    .exec()
}

module.exports.getStats = () => {
    return Batismo
    .aggregate([
        { $project : { ano : {$arrayElemAt:[{ $split: ["$date", "-"] },0]}}},
        { $group: {_id: "$ano",count:{$sum:1}}},
      ])
    .exec()
}

