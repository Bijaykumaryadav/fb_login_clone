const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const db = require('./config/mongoose');


// const Mongostore = require('connect-mongo');

//to use static folder in our project
app.use(express.static("./assets"));

//to set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use

//to set routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error in the code", err);
    // console.log(`error in running server ${err}`);//by interpolation
  }
  console.log(`Server is running on the port: ${port}`);
});
