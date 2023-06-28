const Register = require('../src/models/registers')
const bcrypt = require('bcryptjs')

// mail module require
const { registerMail, resetPasswordMail } = require('../utils/mailer');

exports.signupUser = async (req, res) => {
    try {
      const { name, email, number, gender, password } = req.body

        const user = await Register.findOne({ email })
        if(user) {
          res.status(400).send('user already exist on this email')
          return
        }

        const userRegister = new Register({
          name, email, number, gender, password
        });
    
        const token = await userRegister.createAuthToken();
        const result = await userRegister.save();
    
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + 1500000),
          httpOnly: true
        });
    
        registerMail(result)
        console.log('user created successfully');
        res.status(201).redirect('/');
    } catch (error) {
        res.status(200).send(error);
        console.log('the error in the system ', error);
    }
}

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body
    
        const userDetail = await Register.findOne({ email })
        const isMatch = await bcrypt.compare(password, userDetail.password);
        
        if (isMatch) {

          const token = await userDetail.createAuthToken();
          res.cookie('jwt', token, {
            expires: new Date(Date.now() + 1500000),
            httpOnly: true,
          });

          res.status(201).redirect('/');
          
        } else {
          res.send('invalid Email or Password');
        }
    } catch (error) {
        console.log('error in sending page');
        res.status(200).send('invalid Email or Password');
    }
}

exports.logoutUser = async(req, res) => {
    try {
        console.log(req.user.name);
    
        // logout from one device
        req.user.tokens = req.user.tokens.filter((currToken) => currToken.token !== req.token);
    
        // logout from all devices
        // req.user.tokens = []
        res.clearCookie('jwt');
    
        console.log('logout successfully');
    
        await req.user.save();
        res.redirect('/')
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.forgotPasswordUser = async (req, res) => {
  try {
    const email = req.body.email
    const userDetail = await Register.findOne({ email })
    if(userDetail) {
      const resetToken = await userDetail.createResetPasswordToken()
      
      const mailerObj = {
        email: userDetail.email,
        url: `127.0.0.1/resetpassword/${resetToken}`
      }
      console.log(mailerObj);
      resetPasswordMail(mailerObj)
      res.redirect('/')
    } else {
      res.send('please enter email that you are Login')
    }
  } catch (error) {
    console.log('email : ', error);
  }
}

exports.resetPasswordUser = async (req, res) => {
  try {
    const resetPasswordToken = req.params.token

    const userNewPassword = req.body.password
    const hashPassword = await bcrypt.hash(userNewPassword, 10);

    const result = await Register.updateOne({ resetPasswordToken }, {
      $set: {
        password: hashPassword,
        resetPasswordToken: null
      },
    });
    console.log(result);
    res.redirect('/');
  } catch (error) {
    console.log('the reset password error : ', error);
  }
}

exports.changePasswordUser = async (req, res) => {
  try {
    const _id = req.user._id
    const userOldPassword = req.body.oldPassword;
    const userNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    const isMatch = await bcrypt.compare(userOldPassword, req.user.password);

    if (isMatch) {
      const result = await Register.updateOne({ _id }, {
        $set: {
          password: userNewPassword,
        },
      });
      console.log('result : ', result);

      res.redirect('/myaccount')
    } else {
      res.send('please enter correct old password');
    }
  } catch (error) {
    res.status(400).send('change password error : ', error);
  }
}

exports.editAccountUser = async (req, res) => {
  try {
    const { name, email, number, gender } = req.body

    const result = await Register.updateOne({ email }, {
      $set: { name, email, number, gender }
    });
    console.log(result);

    res.redirect('/myaccount')
  } catch (error) {
    res.status(400).send('edit account error : ', error);
  }
}
