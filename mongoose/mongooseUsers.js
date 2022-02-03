const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// FIND USER VIA OBJECT OF ANY REQUESTED PARAMETER
// FROM THE AVAILABLE ONES( _ID, EMAIL OR USERNAME)
// AND RETURN AND OBJECT WITH THE USER CARD AND
// A TRUE OR FALSE EXIST FLAG
async function read(input) {
  let exists = true;

  const retrieveUser = await User.find(input);
  if (retrieveUser.length === 0) {
    return (exists = false);
  }
  if (retrieveUser.length > 1) {
    return retrieveUser;
  } else {
    const { username, email, role, _id } = retrieveUser[0];

    console.log();
    
    return {
      user: retrieveUser,
      mail: email,
      username: username,
      role: role,
      id:_id,
      exists: exists,
    };
  }
}

// FIND USER BY EMAIL, RETRIEVE ITS HASHED PASSWORD FROM DB, COMPARE IT
// AND AUTHENTICATED FLAG CHANGES DEPENDING ON ITS RESULT.
async function authenticate(email, pass) {
  const retrieveUserFromDB = (await read({ email: email })).user;
  const retrievePassFromUser = retrieveUserFromDB[0].password;
  const authenticated = bcrypt.compareSync(pass, retrievePassFromUser);  
  return authenticated
 
}

// CREATE A USER BY MONGOOSE MODEL
// PASSWORD IS HASHED AND NEVERDISPLAYED IN DB
async function post(name, email, pass, role) {
  const saltRounds = 10;
  const hashPass = bcrypt.hashSync(pass, saltRounds);
  
  const newUser = new User({
    username: name,
    email: email,
    password: hashPass,
    role: role,
  });

  return await newUser.save();
}

async function deleteUser(req) {
  const selectedUser = await User.deleteOne({ _id: req });

  return `${selectedUser.username} has been deleted`;
}

module.exports = {
  read,
  authenticate,
  post,
  deleteUser,
};
