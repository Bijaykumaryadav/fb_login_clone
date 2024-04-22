// controllers/user_comtroller.js
const User = require('../models/user');
const bcrypt = require("bcrypt");

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Facebook SignUp"
    })
}

//to get the sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      console.log("Password and Confirm password are different!");
      return res.redirect('back');
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // user doesnot exist
      const newUser = await User.create(req.body);
      // userSignUpMailer.signUp(newUser); //todo later
      req.flash("success", "Created Account Successfully!");
      return res.redirect("/");
    } else {
      req.flash("error", "User Already Exists!");
      return res.redirect("/");
    }
  } catch (err) {
    console.log(`errror in creating session for user ${err}`);
  }
};


module.exports.createSession = async function (req, res) {
  try {
    // Find the user
    const user = await User.findOne({ email: req.body.email });

    // Handle user not found
    if (!user) {
      req.flash("error", "Invalid username or password");
      return res.redirect("back");
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Handle password mismatch
    if (!isPasswordMatch) {
      req.flash("error", "Invalid username or password");
      return res.redirect("back");
    }

    //set user to locals
    // res.locals.user = user;

    // Handle session creation
    res.cookie("user_id", user.id);
    console.log("User ID:", user.id);
    return res.redirect("/users/profile");
  } catch (error) {
    console.log("Error in finding user or signing in:", error);
    req.flash("error", "Something went wrong");
    return res.redirect("back");
  }
};

module.exports.profile = async function(req, res) {
  try {
    // Check if user_id exists in cookies
    if (req.cookies.user_id) {
      // Find user by ID
      let user = await User.findById(req.cookies.user_id);
      console.log("User profile:", user); // Log user profile for debugging
      // If user exists, render user profile
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      } else {
        // If user not found, redirect to homepage
        return res.redirect("/");
      }
    } else {
      // If user_id is not found in cookies, redirect to homepage
      return res.redirect("/");
    }
  } catch (err) {
    // Handle any errors
    console.log("Error in profile function:", err);
    return res.redirect("/");
  }
}
