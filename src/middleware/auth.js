const jwt = require('jsonwebtoken')

// require for database connection
const Register = require('../models/registers')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const verifyUser = await jwt.verify(token, process.env.SECRET_KEY)

        const user = await Register.findOne({ _id: verifyUser._id })
        console.log('auth : ', user.name);

        req.token = token
        req.user = user
        next()

    } catch (error) {
        res.status(401).send('login must be required for visit this page')
    }
}

const resetTokenAuth = async (req, res, next) => {
    try {
        const resetPasswordToken = req.params.token
        const user = await Register.findOne({resetPasswordToken})

        if (user) {
            next()
        } else {
            res.render('error', {
                errorMsg: 'This Link is Expired'
            });
        }
        
    } catch (error) {
        res.status(401).send('error : ', error)
    }
}

module.exports = { auth, resetTokenAuth }
