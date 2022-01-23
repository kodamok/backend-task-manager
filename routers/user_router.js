const express = require("express");

const router = express.Router();
const userController = require("../controlers/userController");
const { getUserByParamsOrQuery, signUp, updateUser, deleteUser, logIn } = userController;

//GET         /users
router.get("/", getUserByParamsOrQuery);

//GET         /users/:userId
router.get("/:userId", getUserByParamsOrQuery);

//POST        /signup => SignUp
router.post("/signup", signUp);

//POST        /login => Login
router.post("/login", logIn, getUserByParamsOrQuery);








//PUT         /:userId => 
router.put("/:userId", updateUser);

//DELETE      /:userId
router.delete("/:userId", deleteUser);

module.exports = router;
