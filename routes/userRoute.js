const express = require('express')
const router = express.Router()
const { 
    signupUser, 
    loginUser, 
    logoutUser, 
    forgotPasswordUser, 
    resetPasswordUser, 
    changePasswordUser, 
    editAccountUser
} = require('../controllers/userController')

const {auth, resetTokenAuth} = require('../src/middleware/auth')

router.route('/signup').post(signupUser)

router.route('/login').post(loginUser)

router.route('/logout').get(auth, logoutUser)

router.route('/forgotpassword').post(forgotPasswordUser)

router.route('/resetpassword/:token').post(resetPasswordUser)

router.route('/changepassword').post(auth, changePasswordUser)

router.route('/editaccount').post(auth, editAccountUser)

module.exports = router
