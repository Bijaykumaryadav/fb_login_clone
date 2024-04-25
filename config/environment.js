const development = {
  name: "clone_development",
  asset_path: "./assets",
  session_cookie_key: "krishnachapri",
  db: "facebook_login_clone",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ybijayyadav468@gmail.com",
      pass: "lfph ikmp brwh yiby",
    },
  },
  google_clientID:
    "499369908385-d16fqo965eur07pm8k3cdqleac3unms1.apps.googleusercontent.com",
  google_callbackURL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret_or_key: "fb_login_clone",
};
