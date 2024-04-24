// index.js
const express = require("express"); //most popular Node.js web application frameworks

// const mongoose = require("mongoose");
const db = require("./config/mongoose"); //object data modeling library for mongodb and node.js

const app = express(); //The express function is the main function exported by the Express.js module. When called, it returns a new Express application object that can be used to define routes, middleware, and configuration settings for your web application.

const port = 8000; //on which your Express.js server will listen for incoming HTTP requests.

const cookieParser = require("cookie-parser"); //middleware used in Express.js applications to parse cookies from the incoming HTTP request headers

//set up the express session and passport
const session = require("express-session"); //middleware for Express.js that provides session management functionality for web applications

const MongoStore = require("connect-mongo"); //is a session store for Express and Connect, which allows you to store session data in MongoDB

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//to set layout
const expressLayouts = require("express-ejs-layouts");

//to set cookie-parser
app.use(express.urlencoded({ extended: true }));
 //When a form is submitted from a client (e.g., a web browser), the form data is encoded and sent in the body of the HTTP request. The express.urlencoded() middleware parses this form data and makes it available in req.body object of the incoming request. This allows you to access the form data submitted by the client in your route handlers.

//to set layout note: if you want to add favicon and other like title then you have to use express-ejs-layouts
app.use(expressLayouts);

//to set static folder in our project
app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//to set view engine
app.set("view engine", "ejs");
//to set directory look for ejs templete in views folder
app.set("views", "./views");

app.use(cookieParser()); //The cookieParser() middleware in Express.js is used to parse cookies from the HTTP request headers

// Setup session middleware
app.use(
  session({
    name: 'facebook_clone',
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 80 * 60,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1/facebook_db",
      mongooseConnection: db,
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Set up routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in the code", err);
  }
  console.log(`Server is running on the port: ${port}`);
});
