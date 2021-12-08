const express = require("express");
const router = express.Router();

//ERROR FUNCTION
const myInnerFunctionThatFails = () => {
  // if we throw an error, the execution stops at that point (like a return)
  // and the error can be caught in one of the parent functions.
  throw new Error("oh_no");
};




//POST        /teams
router.post("/", (req, res, next) => {
  try {
    res.status(201).json("/teams/");
  } catch (err) {
    next(err);
  }
});
//GET         /teams
router.get("/", (req, res, next) => {
  try {
    myInnerFunctionThatFails();
    res.status(201).json("/teams");
  } catch(err) {
    next(err);
  }
});
//GET         /teams/:teamId
router.get("/:teamId", (req, res, next) => {
  try {
    res.status(201).json("/teams/:teamId");
  } catch (err) {
    next(err);
  }
});
//PUT         /teams/:teamId
router.put("/:teamId", (req, res, next) => {
  try {
    res.status(201).json("/teams/:teamId");
  } catch (err) {
    next(err);
  }
});
//DELETE      /teams/:teamId
router.delete("/:teamId", (req, res, next) => {
  try {
    res.status(201).json("/teams/:teamId");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
