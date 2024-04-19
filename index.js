const express = require('express');
const app = express();
const port = 8000;

//to set view engine
app.set('view engine','ejs');
app.set('views','./views');

//to set routes
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("error in the code",err);
        // console.log(`error in running server ${err}`);//by interpolation
    }
    console.log(`Server is running on the port: ${port}`);

})