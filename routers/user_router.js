const express = require("express");
const router = express.Router();
const validateInput = require('../middlewares/validateInputs')

//MIddleware to do all the below checks for the password
const validateInputContent = (requiredValues) => function (req, res, next){
  const getBody = req.body

  requiredValues.forEach(value => getBody[value].includes("@") ? null : res.send("this is not a valid email addres"))

  next()
}



//Here the higher function takes the req.body.password & req.body.username
//from the post request and does the whole validation for us.

//POST        /users
router.post("/", validateInput, validateInputContent(['userName', 'password','email']),(req, res, next) => {
  try {
    if (req.body.password.length < 6)
      return res.status(400).json("password must have less than 6 characters");
    if (req.body.userName.length < 8)
      return res.status(400).json("name must have less than 8 characters");
    if (req.body.email.includes("@") !== true)
      return res.status(400).json(`${req.body.email} is not a valid Email Address`)

    res.json(`User ${req.body.userName} you are logged in`);
    /* res.status(201).json("/users"); */
  } catch (err) {
    next(err);
  }
});
//GET         /users
router.get("/", (req, res, next) => {
  try {
    res.status(201).json("/users");
  } catch (err) {
    next(err);
  }
});
//GET         /users/:userId
router.get("/:userId", (req, res, next) => {
  try {
    res.status(201).json("/users/userId");
  } catch (err) {
    next(err);
  }
});
//PUT         /users/:userId
router.put("/:userId", (req, res, next) => {
  try {
    res.status(201).json("/users/userId");
  } catch (err) {
    next(err);
  }
});
//DELETE      /users/:userId
router.delete("/:userId", (req, res, next) => {
  try {
    res.status(201).json("/users/userId");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
