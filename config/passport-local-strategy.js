//config/passport-local-strategy.js
//Passport.js is a popular authentication middleware for Node.js. It's often used with frameworks like Express to manage user authentication. The passport-local module you're requiring is a specific strategy within Passport.js for authenticating users using a username and password stored locally (usually in a database).
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

const bcrypt = require("bcrypt");

//serializing user to decide which key is to kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing user form the key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log("error in finding user --> passport", err);
  }
});

//authenticate using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      //find a user and establish it identity
      try {
        const user = await User.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, user.password); //matches the encrypted password with user password form
        console.log(isMatch);
        if (!user) {
          console.log("Invalid User");
          return done(null, false, { message: "Invalid user" });
        } else if (!isMatch) {
          console.log("Invalid Password");
          return done(null, false, { message: "Invalid Password" });
        }
        console.log("authenticatd user!!");
        return done(null, user);
      } catch (err) {
        console.log(`Error in creating a session using passport ${err}`);
      }
    }
  )
);

//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    //if the user is signed in pass to next function in user controller
    return next();
  }
  //if user is not signed in
  return res.redirect("/");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the currently signed user and we are just sending it to the locals for views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
