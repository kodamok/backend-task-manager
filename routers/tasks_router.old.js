const express = require("express");
const router = express.Router();
const Tasks = require("../models/tasksModel");

async function dataVisualization(data, observer, pageNumber) {
  let dataBook = [];
  const dataCopy = [...data];
  const userPageNumber = pageNumber - 1 || 1;

  for (let i = 0; dataCopy.length !== 0; i++) {
    const dataChunk = dataCopy.splice(0, observer);
    dataBook.push(dataChunk);
  }

  return dataBook[userPageNumber];
}

//GET         /tasks
router.get("/", async (req, res, next) => {
  try {
    const allTasks = await Tasks.read();
    const reqPageAndItemsPerPage = await dataVisualization(
      allTasks,
      req.query.observer,
      req.query.pageNumber
    );
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
