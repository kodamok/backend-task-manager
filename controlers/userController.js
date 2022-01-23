const user = require("../mongoose/mongooseUsers");
const User = require("../models/userModel");

const { authenticate, read, post } = user;


// WE CAN GET USER OBJECT BY USERID PARAMS OR ITS EMAIL QUERY
async function getUserByParamsOrQuery(req, res, next) {
  const { userId } = req.params;
  const { email } = req.query;

  try {
    const userRequest = (await read({ email: email }, { _id: userId })).user

console.log(userRequest);
    res.status(200).json(userRequest);
  } catch (error) {
    next(error);
  }
}

// WE CREATE A NEW USER 
async function signUp(req, res, next) {
  await User.syncIndexes(); //In case i change a property from my model indexes like unique or required it will resync the model with the DB
  const { username, email, password } = req.body;
  const userExist = (await read({ email: email })).exists;

  try {
    if (!userExist) {
      const newUser = await post(username, email, password);
      console.log(newUser);
      return res
        .status(200)
        .json(`user ${newUser.username} has been added succesfully`);
    } else {
      return res.status(400).json(`${username} already exist`);
    }
  } catch (err) {
    next(err);
  }
}

// WE LOG IN INTO OUR ACCOUNT AS A POST DUE TO THE
// LOGIC THAT IF W ELOG IN IS BECAUSE WE WANT TO MAKE A CHANGE
async function logIn(req, res, next) {
  const email = req.query.email;
  const password = req.query.password;

  try {
    const isAuthorized = await authenticate(email, password);
    isAuthorized
      ? next()
      : res.send("Password or Email are incorrect, please try again");
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
  getUserByParamsOrQuery,
  signUp,
  updateUser,
  deleteUser,
  logIn,
};
