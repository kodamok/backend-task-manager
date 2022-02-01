const router = require ('express').Router()
const { getUserByParamsOrBody, signUp, updateUser, deleteUser, logIn } = require("../controlers/userController");
const  {sendTokenToUser, checkToken} = require ('../controlers/accesController')
const { authenticate } = require('../mongoose/mongooseUsers');



//GET         /users
router.get("/", getUserByParamsOrBody);

//GET         /users/:userId
router.get("/:userId", checkToken, getUserByParamsOrBody);


//POST        /signup => SignUp
router.post("/signup", signUp, sendTokenToUser, getUserByParamsOrBody); // funciona

//POST        /login => Login
router.post("/login", checkToken ,logIn, getUserByParamsOrBody);








//PUT         /:userId => 
router.put("/:userId", updateUser);

//DELETE      /:userId
router.delete("/:userId", deleteUser);

module.exports = router;
