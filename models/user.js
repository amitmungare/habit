// import mongoose 
const mongoose = require('mongoose');

// this is the DataBase schema
const userSchema = new mongoose.Schema({
     // data in schema 
    userName:{
        // type of parameter
        type:String,
        // cannot be null 
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    habits:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Habit'
    }]
},{
    timestamps:true
})

const User = mongoose.model('User', userSchema);
// exporting the todo
module.exports = User;