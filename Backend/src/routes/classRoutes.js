const express = require('express');
const cRouter = express.Router();
const verifyToken = require('./verify');

const classModel = require('../models/classModel');
const teacherModel = require('../models/teacherModel');
const studentModel = require('../models/studentModel');

//create class: teacher
cRouter.post('/create',verifyToken,async(req,res)=>{
    // console.log(req.body);
    const tId = req.body.class.tId;
    const classCode = req.body.class.classCode;
    const temp = await classModel.countDocuments({classCode:classCode});
    console.log(tId);
    var teachertemp = await teacherModel.findById(tId);
    // console.log(temp);
    if(!temp){
        var classData = new classModel();
        classData.className = req.body.class.className;
        classData.classCode = req.body.class.classCode;
        classData.Teacher = teachertemp.username
        console.log(teachertemp.username);
        var teacherData = await teacherModel.updateOne({"_id":tId},
                                                            {$push:{classes:classCode}});                                                           
        classData.save((err,doc)=>{
         if(!err){
             res.send(doc);
           }
         else{
             console.log(err);
         }
    });
    }
    else{
            res.status(406).send('Class Code already Exists');
    }

    
});

//get classes by a teacher
cRouter.post('/teacherList',verifyToken,async(req,res)=>{
    const id = req.body.id;
    const teacherData = await teacherModel.findById(id);
    const teacherClasses = teacherData.classes;
    // console.log(teacherClasses[0]);
    
    var list = [];
    for(i=0;i<teacherClasses.length;i++){
        var temp = await classModel.findOne({'classCode':teacherClasses[i]});
        list.push(temp);
    }
    res.status(200).send(list);


});

//list all classes
cRouter.get('/classList',async(req,res)=>{
    classModel.find()
        .then(function(classes){
            res.send(classes);
        })
});

//enroll in a class student
cRouter.post('/enrollClass',verifyToken,async(req,res)=>{
    var id = req.body.id;
    var classCode = req.body.classCode;
    
    var student = await studentModel.findById(id);
    if(student.classes.includes(classCode)){
        res.status(401).send("Already Enrolled in Class");
    }
    else{
        var studentData = await studentModel.updateOne({"_id":id},
                                                            {$push:{classes:classCode}});
        res.status(200).send();                                                            
    }
});

//list classses enrolled by a student
cRouter.post('/studentlist',verifyToken,async(req,res)=>{
    const id = req.body.id;
    const studentData = await studentModel.findById(id);
    const studentClasses = studentData.classes;
    // console.log(studentClasses);
    var list = [];
    for(i=0;i<studentClasses.length;i++){
        var temp = await classModel.findOne({'classCode':studentClasses[i]});
        list.push(temp);
    }
    res.status(200).send(list);
})

//get single class
cRouter.get('/:id',async(req,res)=>{
    const id = req.params.id;
    await classModel.findOne({"_id":id})
    .then((cls)=>{
        res.send(cls);
    })
})

module.exports = cRouter;