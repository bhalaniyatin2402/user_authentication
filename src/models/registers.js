const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// define register schema
const registerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    number: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    resetPasswordToken: String
})

// create token and store into database
registerSchema.methods.createAuthToken = async function() {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()

        return token
    } catch (error) {
        console.log('the error part', error);
        res.send('the error part', error)
    }
}

// generate reset password token
registerSchema.methods.createResetPasswordToken = async function() {
    try {
        const resetToken = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.resetPasswordToken = resetToken
        await this.save()

        return resetToken
    } catch (error) {
        console.log('the create reset password token error : ', error)
    }
}

// change password to hasing password before save
registerSchema.pre('save', async function(next) {

    // when password is modified then only this function is calleda
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const Register = new mongoose.model('Register', registerSchema)

module.exports = Register
