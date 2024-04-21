const User = require('../models/user');

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


//create session for the user
module.exports.createSession = async function(req, res) {
    try {
        // Find the user
        const user = await User.findOne({ email: req.body.email });

        // Handle user not found
        if (!user) {
            return res.redirect('back');
        }

        // Handle password mismatch
        if (user.password !== req.body.password) {
            return res.redirect('back');
        }

        // Handle session creation
        res.cookie('user_id', user.id);
        console.log(user.id);
        return res.redirect('/user/profile');
    } catch (error) {
        console.log('Error in finding user or signing in:', error);
        return res.redirect('back');
    }
}

//to show profile
module.exports.profile = function(req,user){
  if(req.cookies.user_id){
    User.findById(req.cookies.user_id,function(err,user){
      if(user){
        return res.render('user_profile',{
          title: "User Profile",
          user: user
        })
      }else{
        return res.redirect('/');
      }
    });
  }else{
    return res.redirect('/');
  }
}