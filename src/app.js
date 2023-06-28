// requiring all modules
require('dotenv').config()
const express = require('express');

const app = express();
const hbs = require('hbs');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const port = process.env.PORT

// require database for connectio and get valuejas
require('./db/conn');

// require auth for authentication
const {auth, resetTokenAuth} = require('./middleware/auth');

// set path for hbs
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partials');

// use template engines - hbs and partials
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);

// use the public file to render
app.use(express.static(staticPath));
// fething data from from
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use  cookie parser
app.use(cookieParser());
app.use(cors())

// route  imports
const userRoutes = require('../routes/userRoute');

app.use('/', userRoutes)

// get request of home page
app.get('/', (req, res) => {
  res.render('index', { isLoggedIn: req.cookies.jwt});
});

// get request for about page
app.get('/about', auth, (req, res) => {
  res.render('about', { isLoggedIn: req.cookies.jwt});
});

// get request for register page
app.get('/signup', (req, res) => {
  res.render('signup', { isLoggedIn: req.cookies.jwt});
});

// login page
app.get('/login', (req, res) => {
  res.render('login', { isLoggedIn: req.cookies.jwt});
});

// forgot password page
app.get('/forgotpassword', (req, res) => {
  res.render('forgotpassword', { isLoggedIn: req.cookies.jwt});
});

// reset passwoerd
app.get('/resetpassword/:token', resetTokenAuth, async (req, res) => {
  res.render('resetpassword', { isLoggedIn: req.cookies.jwt})
});

// change password
app.get('/changepassword', (req, res) => {
  res.render('changepassword', { isLoggedIn: req.cookies.jwt});
});

// my account page
app.get('/myaccount', auth, (req, res) => {
  const {name, email, number, gender } = req.user
  res.render('myaccount', { name, email, number, gender, isLoggedIn: req.cookies.jwt });
});

// edit account
app.get('/editaccount', auth, (req, res) => {
  const { name, email, number } = req.user
  res.render('editaccount', { name, email, number, isLoggedIn: req.cookies.jwt });
});

// error page
app.get('*', (req, res) => {
  res.render('error', {
    errorMsg: '404 erroe, this page is not found',
    isLoggedIn: req.cookies.jwt
  });
});

// port listening
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
