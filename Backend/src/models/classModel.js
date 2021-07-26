const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    className:{
        type:String,
        required:true
    },
    classCode:{
        type:String,
        requied:true,
    },
    Teacher:{
        type:String,
    },
    Notes:[{topic:String,content:String}],
    Assignments:[{title:String,content:String}]
});

module.exports = mongoose.model('classes',classSchema);