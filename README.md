# User Authentication using Express, Mongoose, Handlebars

## Featues
- #### Login
- #### Signup
- #### Forgot Password
- #### Reset Password with gmail
- #### change Password
- #### Account page
- #### Edit Account
- #### Logout


## Node npm modules used
- #### express
- #### mongoose
- #### bcryptjs
- #### cookie-parser
- #### dotenv
- #### hbs
- #### jsonwebtoken
- #### nodemailer


## File Structure
- #### `public` - this holds all the static files - style, script and images
- #### `src`
    - #### `db` - connect to the database using mongoose
    - #### `middleware` - authentication middleware for login and reset password
    - #### `models` - define user schema including jsonwebtoken, password hasing
    - #### `app.js` - This is renders all routes and different views
- #### `template`
    - #### `partials` - holds different component used in all files i.e. header
    - #### `views` - contain different pages i.e. login, signup, myaccount
- #### `routes` - hold different HTTP routes
- #### `controllers` - all callback function that each route will call
- #### `utils` - mail using nodemailer when user login and forgot password
- #### `package-lock.json` - dependencies are installed consistently across different environments
- #### `package.json` - contain name, version and dependencies
- #### `.gitignore` - tells git which files to ignore


## Project Setup
To run project locally
- Clone repo
- `npm install` in root directory
- #### Set for `environment variables`
    - #### `PORT` - set port number to listen the server
    - #### `SECRET_KEY` - generate and verify jsonwebtoken
    - #### `DB_NAME` - url of your local_database or Atlas
    - #### `EMAIL_NAME` - gmail name for send mail to user
    - #### `EMAIL_PASSWORD` - if your password doesn't work then go to two step verification and use app password
- `npm run dev` & if nodemon not installed then `npm run start`
- use `http://127.0.0.1:${port}` to go to the page

