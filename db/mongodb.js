const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.MONGODB_URI


// Prints "MongoServerError: bad auth Authentication failed."
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected via Mongoose'))
.catch((err) => {
    console.log(err.reason)
  
});