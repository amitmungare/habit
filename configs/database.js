// require the mongoose library
const mongoose = require('mongoose');
// connect to the database
mongoose.connect('mongodb://localhost:27017/habit');
// mongoose.connect('mongodb+srv://amitmungare:amitmungare@habit.0tzz6vg.mongodb.net/?retryWrites=true&w=majority');
// aquire the connection
let database = mongoose.connection;
// error
database.on('error', console.error.bind(console, 'Error in connecting to database'));

// up and running then print the successfully message
database.once('open', function(){
    console.log('Connected to database');
})

// exporting the database
module.exports = database;