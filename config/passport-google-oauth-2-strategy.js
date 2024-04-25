const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use new strategy for google login

passport.use(
  new googleStrategy(
    {
      web: {
        client_id:
          "499369908385-d16fqo965eur07pm8k3cdqleac3unms1.apps.googleusercontent.com",
        project_id: "fb-login-clone-421401",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "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",
        redirect_uris: ["http://localhost:8000"],
        javascript_origins: ["http://localhost:8000"],
      },
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
