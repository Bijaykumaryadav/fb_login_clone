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
      return res.redirect(back);
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // user doesnot exist
      const newUser = await User.create(req.body);
      userSignUpMailer.signUp(newUser);
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
module.exports.createSession = function(req,res){
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing in');
            return;
        }
        //handle user found 
        if(user){

            //handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/user/profile');
        }else{
            //handle User not found
            return res.redirect('back');
        }
    })
}