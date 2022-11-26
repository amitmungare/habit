// import mongoose 
const mongoose = require('mongoose');
// this is the DataBase schema
const habitSchema = new mongoose.Schema({
     // data in schema 
    habitName:{
        // type of parameter 
        type:String,
        // cannot be null 
        required:true
    },
    habitDis:{
        type:String,
        required:true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    streak:{
        type:Number
    },
    completed:{
        type:Number
    },
    dateCreation:{
        type:Number
    },
    days:[]
},{
    timestamps:true
})

const Habit = mongoose.model('Habit', habitSchema);
// exporting the todo
module.exports = Habit;