const express = require("express");
// const mongoose = require("mongoose");
const db = require("./config/mongoose");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");

//set up the express session and passport
const session = require("express-session");
const MongoStore = require("connect-mongo");

//to set cookie-parser
app.use(express.urlencoded());
app.use(cookieParser());

//to ser static folder in our project
app.use(express.static("./assets"));

//to set view engine 
app.set("view engine", "ejs");
app.set("views", "./views");

// Setup session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1/facebook_db",
      mongooseConnection: db,
      autoRemove: "disabled",
    }),
  })
);

// Set up routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in the code", err);
  }
  console.log(`Server is running on the port: ${port}`);
});
