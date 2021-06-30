const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    classes:[],
    submissions:[{classCode:String,work:String}]
});

module.exports = mongoose.model('students',studentSchema);