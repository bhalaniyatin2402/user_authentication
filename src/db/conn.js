const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  mongoose
    .connect(process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connection successful');
    })
    .catch((e) => {
      console.log(`ERROR : ${e}`);
    });
})()
