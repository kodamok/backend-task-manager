const user = require("../mongoose/mongooseUsers");
const User = require("../models/userModel");
const jwt = require("../functions/tokenCookies");

const { authenticate, read, post } = user;

// GET ALL USERS
async function getAllUsers(req, res, next) {


  const allUsers = await read();

  res.status(200).send(allUsers);
}

// WE CAN GET USER OBJECT BY USERID PARAMS OR ITS EMAIL QUERY
async function getUserByParamsOrBody(req, res, next) {
  const { userId } = req.params;
  const { email } = req.body;

  try {
    const userRequest =
      (await read({ email: email }, { _id: userId })) || (await read());
    const { username, mail } = userRequest;

    res.status(200).json({ username: username, email: mail });
  } catch (error) {
    next(error);
  }
}

/* let authenticated = false;
  const retrieveUserFromDB = (await read({ email: email })).user;
  const retrievePassFromUser = retrieveUserFromDB[0].password; */

// WE CREATE A NEW USER
async function signUp(req, res, next) {
  await User.syncIndexes(); //In case i change a property from my model indexes like unique or required it will resync the model with the DB
  const { username, email, password, role } = req.body;
  const userExist = (await read({ email: email })).exists;

  try {
    if (!userExist) {
      const newUser = await post(username, email, password, role);

      res.user = {
        username: username,
        email: email,
        role: role,
      };

      next();
    } else {
      return res.status(400).json(`${username} already exist`);
    }
  } catch (err) {
    next(err);
  }
}

// WE LOG IN INTO OUR ACCOUNT AS A POST DUE TO THE
// LOGIC THAT IF WE LOG IN IS BECAUSE WE WANT TO EDIT
async function logIn(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const { mail, username, role, id } = await read({ email: email });
  console.log('information we need from the user: ' , role);

  try {
    const isAuthorized = await authenticate(email, password);
    if (!isAuthorized) {
      return res.status(401).json("Please introduce a valid email/password");
    }

    res.user = {
      username: username,
      email: mail,
      role: role,
      id:id
    };

   

    next();
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    res.status(200).json(userUpdated);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  const getUser = await user.read({ _id: req.params.userId });
  const deletedUser = await user.deleteUser(req.params.userId);
  try {
    res.status(200).json("User been deleted");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUserByParamsOrBody,
  getAllUsers,
  signUp,
  updateUser,
  deleteUser,
  logIn,
};
