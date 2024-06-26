//config/nodemailer.js
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:({
        user:'ybijayyadav468@gmail.com',
        pass:'lfph ikmp brwh yiby'
    })
});

let renderTempelate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log(`Error in rendering template!! ${err}`);
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTempelate: renderTempelate
}