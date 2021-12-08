const express = require("express");
const router = express.Router();

// THROWN ERROR
const myInnerFunctionThatFails = () => {
  // if we throw an error, the execution stops at that point (like a return)
  // and the error can be caught in one of the parent functions.
  throw new Error("oh_no");
};

//POST        /tasks
router.post("/", (req, res, next) => {
  try {
    res.json({
      title: req.body.title,
      dueDate: req.body.date,
      details: req.body.details,
      category: req.body.category,
    });
  } catch (err) {
    next(err);
  }
  /* res.status(201).json("/tasks"); */
});

//GET         /tasks
router.get("/", (req, res, next) => {
  try {
    console.log("before the request");
    myInnerFunctionThatFails();
    res.status(200).json("/tasks");
  } catch (err) {
    next(err);
  }
});

//GET         /tasks/:taskId
router.get("/:taskId", (req, res, next) => {
  try {
    res.status(200).json("/tasks/:taskId");
  } catch (err) {
    next(err);
  }
});
//PUT         /tasks/:taskId
router.put("/:taskNameId", (req, res, next) => {
  try {
    console.log("before the request", +req.params);
    res.status(201).json("/tasks/:taskId");
  } catch (err) {
    next(err);
  }
});

//DELETE      /tasks/
router.delete("/", (req, res, next) => {
  try {
    console.log("before the request", +req.params);
    res.status(201).json("/tasks");
  } catch (err) {
    next(err);
  }
});

//DELETE      /tasks/:taskId
router.delete("/:taskId", (req, res, next) => {
  try {
    console.log("before the request", +req.params);
    res.status(201).json("/tasks/:taskId");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
