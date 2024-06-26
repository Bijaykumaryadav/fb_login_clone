//config/mongoose.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/facebook_db');
const db = mongoose.connection;

db.on('error',function(err){
    console.log(`Error in connecting to database ${err}`);
});

db.once('open',function(){
    console.log(`Successfully connected to database`);
});