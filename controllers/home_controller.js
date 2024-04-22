// controllers/home_controller.js
module.exports.home = function (req, res) {
  return res.render("home", { title: "Facebook Login or Sign up" });
};
