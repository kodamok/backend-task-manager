const express = require("express");
const router = express.Router();
const Tasks = require("../models/tasksModel");

//GET         /tasks
router.get("/", async (req, res, next) => {
  try {
    const products = await Tasks.find().skip(req.query.startIndex).limit(req.query.itemsPerPage) // Mongoose values.
    res.status(200).json(reqPageAndItemsPerPage);
  } catch (err) {
    next(err);
  }
});

//GET         /tasks/:taskId
router.get("/:taskId", async (req, res, next) => {
  try {
    /*     const getTasks = await Tasks.read({});*/
    const getReqTask = await pinocchio.find(() => req.params.taskId);
    res.status(200).send(getReqTask);
  } catch (err) {
    next(err);
  }
});

//POST        /tasks
router.post("/", async (req, res, next) => {
  try {
    const task = req.body;
    const newTask = await Tasks.create(task);

    res.status(200).send(newTask);
  } catch (err) {
    next(err);
  }
  /* res.status(201).json("/tasks"); */
});

//PUT         /tasks/:taskId
router.put("/:taskId", async (req, res, next) => {
  try {
    const task = await Tasks.read(req.params.taskId);
    console.log(task);
    const nameOfTask = task.map((task) => task.title);
    await Tasks.update(req.params.taskId);
    res.status(201).send(`The task ${nameOfTask} was updated succesfully `);
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
