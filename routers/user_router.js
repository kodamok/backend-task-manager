const express = require("express");

const userValidators = require ('../middlewares/validateInputs')

const router = express.Router();
const userController = require("../controlers/userController");
const { getUserByParamsOrBody, signUp, updateUser, deleteUser, logIn } = userController;
const {token} = userValidators



//GET         /users
router.get("/", getUserByParamsOrBody);

//GET         /users/:userId
router.get("/:userId", getUserByParamsOrBody);

//POST        /signup => SignUp
router.post("/signup", signUp);

//POST        /login => Login
router.post("/login", logIn, token, getUserByParamsOrBody);








//PUT         /:userId => 
router.put("/:userId", updateUser);

//DELETE      /:userId
router.delete("/:userId", deleteUser);

module.exports = router;
