const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
    },
    email:{
    },
    password:{
        type: String,
        required: true
    },

    versionKey: false,
    
})



const User = mongoose.connection.model("users", schema)

async function read (request){

     const clientReq = await User.find(request)
    

     return clientReq
}


async function post (name, email, pass){
    const saltRounds = 10
    const hashPass = bcrypt.hashSync(pass, saltRounds )

    const newUser = new User({
        username: name,
        email:email,
        password: hashPass
    })

    return await newUser.save()
}

async function deleteUser (req){
    
   const selectedUser = await User.deleteOne({_id:req})

    return `${selectedUser.username} has been deleted`
}

module.exports = {
    read,
    post,
    deleteUser,
}