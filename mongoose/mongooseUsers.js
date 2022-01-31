const User = require("../models/userModel");
const bcrypt = require("bcrypt");



// FIND USER VIA OBJECT OF ANY REQUESTED PARAMETER
// FROM THE AVAILABLE ONES( _ID, EMAIL OR USERNAME)
// AND RETURN AND OBJECT WITH THE USER CARD AND
// A TRUE OR FALSE EXIST FLAG
async function read(input) {
  let exists = true;
  const retrieveUser = await User.find(input);
  const { username, email } = retrieveUser[0];
  if (retrieveUser.length === 0) {
    // For some reason this doesnt work: retrieveUserByEmail.length === 0 ? !userExist : userExist
    exists = false;
  }
  return {
    user: retrieveUser,
    mail: email,
    username: username,
    exists: exists,
  };
}

// FIND USER BY EMAIL, RETRIEVE ITS HASHED PASSWORD FROM DB, COMPARE IT
// AND AUTHENTICATED FLAG CHANGES DEPENDING ON ITS RESULT.
async function authenticate(email, pass) {
  let authenticated = false;
  const retrieveUserFromDB = (await read({ email: email })).user;
  const retrievePassFromUser = retrieveUserFromDB[0].password;
  const comparedPass = bcrypt.compareSync(pass, retrievePassFromUser);
  if (comparedPass) {
    authenticated = !authenticated;
  }
  return authenticated;
}


// CREATE A USER BY MONGOOSE MODEL 
// PASSWORD IS HASHED AND NEVERDISPLAYED IN DB
async function post(name, email, pass) {
  const saltRounds = 10;
  const hashPass = bcrypt.hashSync(pass, saltRounds);

  const newUser = new User({
    username: name,
    email: email,
    password: hashPass,
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
