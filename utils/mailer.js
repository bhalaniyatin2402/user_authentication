const nodeMailer = require('nodemailer')

const registerMail = (obj) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_NAME,
            pass: process.env.MAIL_PASSWORD
        }
    })
    
    const mailOptions = {
        from: process.env.MAIL_NAME,
        to: obj.email,
        subject: 'login into xyz',
        text:  `congratulation ${obj.name}. you are successfully login into xyz`
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email Sent : ' + info.response);
        }
    })
}

const resetPasswordMail = (obj) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_NAME,
            pass: process.env.MAIL_PASSWORD
        }
    })
    
    const mailOptions = {
        from: process.env.MAIL_NAME,
        to: obj.email,
        subject: 'reset password',
        html: `<h3>click on button for reset password</h3>
        // <button><a href="${obj.url}" target="_blank">Reset password</a></button>`

    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email Sent : ' + info.response);
        }
    })
}

module.exports = {registerMail, resetPasswordMail}
