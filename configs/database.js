
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/habit');

let database = mongoose.connection;
database.on('error', console.error.bind(console, 'Error in connecting to database'));

database.once('open', function(){
    console.log('Connected to database');
})

module.exports = database;