const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:false
    },
    email:{
      type:String,
      unique: true,
      match: /.+\@.+\..+/,
      required:true
    },
    password:{
        type: String,
        required: true,
        unique:false
    },

    role:{
        type: String,
        required: true,
        defaut: 'user'
    },

    versionKey: false,
    
})

const User = mongoose.connection.model("users", schema)

module.exports = User