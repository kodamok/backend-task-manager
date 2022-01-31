const jwt = require("jsonwebtoken");
//We crate this higher order function in order
//to not repeat all the if else statements for
//each element of the body.XXX object.
//This works only to check if fields are filled.

const validate = (arrayWithValues) => (req, res, next) => {
  try {
    arrayWithValues.forEach((key) => {
      if (!req.body[key]) throw new Error(`${element} is required`);
    });
  } catch (err) {
    return res.status(400).json(error.message);
  }

  next();
};


// JWT TOKENS FOR USER VERIFICATIONS

// HEADER

const header = {
  alg: "HS256",
  typ: "JWT",
};

// PAYLOAD

const payload = {
  iss: "task-manager-app",
  sub: "www.taskmanager.com/aboutus",
  aud: "registered users only",
  exp: 50,
  name: "name",
};

// SIGNATURE

const privateKey = process.env.SECRET;

// I CREATED A WEB TOKEN AND TOKEN IDENTIFIER

const token = (req, res, next) => {
  let dynamicPayload = { ...payload, name: req.body.username };

  try {
    const token = jwt.sign(dynamicPayload, privateKey);

    res.cookie("token", token, {
      maxAge: 10,
      httpOnly: true,
    });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { token};
