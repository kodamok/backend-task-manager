const express = require("express");
const router = express.Router();
const user = require('../models/userModel.js')

//GET         /users
router.get("/", async (req, res, next) => {
  try {
      const allUsers = await user.read()
    
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

//GET         /users/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const getUser = await user.read({_id:req.params.userId})
    res.status(200).json(getUser);
  } catch (error) {
    next(error);
  }
});


//POST        /users
router.post("/", async (req, res, next) => {
    const {username, email, password} = req.body
  const previousUser = await user.read({username: username})
  const previousUserName = previousUser.find(user => user.username === username)

  try {
    if(previousUser.length == 0){
    const newUser = await user.post(username, email, password);
    return res.status(200).json(`user ${newUser.username} has been added succesfully`);
    } else if(previousUserName.username === username){
        return res.json(`${username} already exist`)
    }

    } catch (err) {
    next(err);
  }});


//PUT         /users/:userId
router.put("/:userId", async(req, res, next) => {
  try {
   
    res.status(200).json(userUpdated)
  } catch (err) {
    next(err);
  }
});
//DELETE      /users/:userId
router.delete("/:userId", async(req, res, next) => {
    const getUser = await user.read({_id:req.params.userId})
const deletedUser = await user.deleteUser(req.params.userId)
  try {
   
    res.status(200).json('User been deleted')
  } catch (err) {
    next(err);
  }
});

module.exports = router;
