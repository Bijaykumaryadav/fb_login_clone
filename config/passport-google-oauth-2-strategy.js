const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use new strategy for google login

passport.use(
  new googleStrategy(
    {
      clientID:
        "624818478031-af64bvlo2lp1bobicqtmghrgk1tfvpn8.apps.googleusercontent.com",
      callbackURL: "http://127.0.0.1:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({
          email: profile.emails[0].value,
        }).exec();
        if (user) {
          //if user is already there sign in the user
          return done(null, user);
        } else {
          const newUser = await User.create({
            name: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.log("Error in google authentication", err);
        return;
      }
    }
  )
);
