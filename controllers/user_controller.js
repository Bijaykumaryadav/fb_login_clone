// controllers/user_comtroller.js
const User = require("../models/user");
const crypto = require("crypto");

//render the sign up page
module.exports.signUp = function (req, res) {
  //if users is already signed in don't show the signin page rather than show profile page
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Facebook SignUp",
  });
};

//to fetch up the data from the signup form
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      console.log("Password and Confirm password are different!");
      return res.redirect("back");
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // user doesnot exist
      const newUser = await User.create(req.body);
      // userSignUpMailer.signUp(newUser); //todo later
      // req.flash("success", "Created Account Successfully!");
      return res.redirect("/");
    } else {
      // req.flash("error", "User Already Exists!");
      return res.redirect("/");
    }
  } catch (err) {
    console.log(`errror in creating session for user ${err}`);
    return res.redirect("/");
  }
};

//to create session
module.exports.createSession = async function (req, res) {
  return res.redirect("/users/profile");
};

module.exports.profile = async function (req, res) {
  return res.render("user_profile", {
    title: "User",
  });
};

//to show forget password email form
module.exports.forgottenPasswordForm = function (req, res) {
  return res.render("forgotten_password_email_form", {
    title: "Reset Password!",
  });
};

//to fetch data from forgot email form //todo later
// module.exports.forgottenPassword = async function(req,res){
//   const user = await User.findOne({email: req.body.email});
//   console.log(user);
//   if(user){//if user with that email exists send reset password link via email
//     user.token = crypto.randomBytes(20).toString('hex');
//     user.save();
//     console.log(user.email);
//     forgottenPasswordMailer.forgottenPassword(user.token,user);
//     return res.redirect('/');
//   }else{
//     console.log('User not Registered!!');
//     return res.redirect('/');
//   }
// }


