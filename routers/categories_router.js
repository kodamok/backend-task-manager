const express = require("express");
const router = express.Router();

//POST        /categories
router.post("/", (req, res, next) => {
  try {
    res.status(201).json("/catergories");
  } catch (err) {
    next(err);
  }
});
//GET         /categories
router.get("/", (req, res, next) => {
  try {
    res.status(201).json("/catergories");
  } catch (err) {
    next(err);
  }
});
//POST        /categories
router.post("/:categoryId", (req, res, next) => {
  try {
    res.status(201).json("/categories/:categoryID");
  } catch (err) {
    next(err);
  }
});
//GET         /categories/:categoryId
router.get("/:categoryId", (req, res, next) => {
  try {
    res.status(201).json("/categoies/categoryId");
  } catch (err) {
    next(err);
  }
});
//PUT         /categories/:categoryId
router.put("/:categoryId", (req, res, next) => {
  try {
    res.status(201).json("/categoies/categoryId");
  } catch (err) {
    next(err);
  }
});
//DELETE      /categories/:categoryId
router.delete("/:categoryId", (req, res, next) => {
  try {
    res.status(201).json("/categoies/categoryId");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
