const router = require ('express').Router()
const { getUserByParamsOrBody, signUp, updateUser, deleteUser, logIn, getAllUsers} = require("../controlers/userController");
const  {sendTokenToUser, checkToken} = require ('../controlers/accesController')
const {checkPermissions} = require('../middlewares/authorization')




//GET         /users
router.get("/",checkToken, checkPermissions("admin"), getAllUsers);

//GET         /users/:userId
router.get("/:userId", checkToken, getUserByParamsOrBody);

//POST        /signup => SignUp
router.post("/signup", signUp, getUserByParamsOrBody); // funciona

//POST        /login => Login
router.post("/login" , logIn, sendTokenToUser, getUserByParamsOrBody);








//PUT         /:userId => 
router.put("/:userId", updateUser);

//DELETE      /:userId
router.delete("/:userId", deleteUser);

module.exports = router;
