const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
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
module.exports = User;