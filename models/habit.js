const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    habitName:{
        type:String,
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
module.exports = Habit;