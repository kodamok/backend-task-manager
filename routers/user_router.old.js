const express = require("express");
const router = express.Router();
const validateInput = require("../middlewares/validateInputs");
/* const db = require("../db/mongodb.old.js"); */
const ObjectId = require("mongodb").ObjectId; //needed for reading mongodb object ID's => read line 52

//MIddleware to do all the below checks for the password
const validateInputContent = (requiredValues) =>
  function (req, res, next) {
    const getBody = req.body;

    requiredValues.forEach((value) =>
      getBody[value].includes("@")
        ? null
        : res.send("this is not a valid email addres")
    );

    next();
  };

//Here the higher function takes the req.body.password & req.body.username
//from the post request and does the whole validation for us.

//POST        /users
router.post("/", async (req, res, next) => {
  let newUser = req.body;
  const users = await db.collection("users").findOne({ name: newUser.name });
  try {
    if (users == null || users.name !== newUser.name) {
      await db.collection("users").insertOne(newUser);
      return res.status(200).json(`user ${newUser.name} has been added succesfully`);
    }
      users.name === newUser.name ? res.status(400).json(`user ${newUser.name} already exist`) : null
    
  } catch (err) {
    next(err);
  }
});

//GET         /users
router.get("/", async (req, res, next) => {
  try {
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//GET         /users/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    let reqParams = ObjectId(req.params.userId);
    const users = await db.collection("users").findOne({ _id: reqParams });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//PUT         /users/:userId
router.put("/:userId", async(req, res, next) => {
  let updatedInfo = req.body;
  let userIdReq = ObjectId(req.params.userId)
  try {
    let userUpdate = await db.collection("users").updateOne({_id: userIdReq }, {$set:{name:updatedInfo.name, email:updatedInfo.email, password: updatedInfo.password }})
    console.log(userUpdate);
    const userUpdated = await db.collection("users").findOne({_id: userIdReq})
    res.status(200).json(userUpdated)
  } catch (err) {
    next(err);
  }
});
//DELETE      /users/:userId
router.delete("/:userId", async(req, res, next) => {
  let userIdReq = ObjectId(req.params.userId)
  const users = await db.collection("users").findOne({ _id: userIdReq });
  console.log(users);
  try {
    await db.collection("users").deleteOne({_id:userIdReq})
    res.status(200).json(`User "${users.name}" has been succesfully removed`)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
