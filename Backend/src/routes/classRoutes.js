const express = require('express');
const cRouter = express.Router();
const verifyToken = require('./verify');
const mongoose = require('mongoose');

const classModel = require('../models/classModel');
const teacherModel = require('../models/teacherModel');
const studentModel = require('../models/studentModel');
const { Mongoose } = require('mongoose');
const { consoleTestResultHandler } = require('tslint/lib/test');

const toId = mongoose.Types.ObjectId;

//create class: teacher
cRouter.post('/create',verifyToken,async(req,res)=>{
    // console.log(req.body);
    const tId = req.body.class.tId;
    const classCode = req.body.class.classCode;
    const temp = await classModel.countDocuments({classCode:classCode});
    var teachertemp = await teacherModel.findById(tId);
    // console.log(temp);
    if(!temp){
        var classData = new classModel();
        classData.className = req.body.class.className;
        classData.classCode = req.body.class.classCode;
        classData.Teacher = teachertemp.username
        classData.description = req.body.class.description;
        // var teacherData = await teacherModel.updateOne({"_id":tId},
        //                                                     {$push:{classes:classCode}});                                                           
        classData.save(async(err,doc)=>{
         if(!err){
             const id = doc._id;
            var teacherData = await teacherModel.updateOne({"_id":tId},{$push:{classes:id}});
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
    const teacherData = await teacherModel.findById(id).populate('classes');
    // const teacherClasses = teacherData.classes;
    // // console.log(teacherClasses[0]);
    
    // var list = [];
    // for(i=0;i<teacherClasses.length;i++){
    //     var temp = await classModel.findOne({'classCode':teacherClasses[i]});
    //     list.push(temp);
    // }
    // res.status(200).send(list);
    res.status(200).send(teacherData.classes);



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
    var classid = req.body.classid;
    
    var classData = await classModel.findById(classid);
    var student = await studentModel.findById(id);
    // console.log(student.classes);
    if(student.classes.includes(classid)){
        res.status(401).send("Already Enrolled in Class");
    }
    else{
        var studentData = await studentModel.updateOne({"_id":id},
                                                            {$push:{classes:classid}});
        res.status(200).send();                                                            
    }
});

//list classses enrolled by a student
cRouter.post('/studentlist',verifyToken,async(req,res)=>{
    const id = req.body.id;
    const studentData = await studentModel.findById(id).populate('classes')
    res.status(200).send(studentData.classes);
})

//get single class
cRouter.get('/:id',async(req,res)=>{
    const id = req.params.id;
    await classModel.findOne({"_id":id})
    .then((cls)=>{
        res.send(cls);
    })
});

//update class by teacher
cRouter.put('/update',verifyToken,async(req,res)=>{
    const classid = req.body.classid;
    const classCode = req.body.classCode;
    const className = req.body.className;
    await classModel.findByIdAndUpdate({"_id":classid},{$set:{"classCode":classCode,"className":className}})
    .then(function(){
        res.status(200).send();
    })
})

//delete class by teacher
cRouter.delete('/delete/:id',verifyToken,async(req,res)=>{
    const id = req.params.id;
    await classModel.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('Class Deleted');
        res.status(200).send();
    })
})

module.exports = cRouter;