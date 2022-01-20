const express = require("express");
const router = express.Router();
const Categories = require("../models/categoriesModel");

//GET         /categories
router.get("/", async (req, res, next) => {
  try {
    const allCategories = await Categories.read();
    res.status(200).json(allCategories);
  } catch (err) {
    next(err);
  }
});
//GET         /categories/:categoryId
router.get("/:categoryId", async (req, res, next) => {
  const reqParam = req.params.categoryId;
  try {
    const categories = await Categories.read();
    const selectedCategory = categories.find(
      () => `new ObjectId(${reqParam.toString()}`
    );
    res.status(200).json(selectedCategory);
  } catch (err) {
    next(err);
  }
});
//POST        /categories
router.post("/", async (req, res, next) => {
  try {
    const newCategory = await Categories.create(req.body);
    console.log(newCategory);
    res
      .status(201)
      .json(`category ${req.body.title} has been succesfully created!`);
  } catch (err) {
    next(err);
  }
});
//PATCH (Update)        /categories/:categoryId
router.patch("/:categoryId", async (req, res, next) => {
  const reqParam = req.params.categoryId;
  console.log(req.body);
  try {
    const categories = await Categories.read();
    const selectedCategory = categories.find(
      () => `new ObjectId(${reqParam.toString()}`
    );
    await Categories.update(reqParam, req.body);

    res.status(200).json(`${selectedCategory.title} was succesfully updated!`);
  } catch (err) {
    next(err);
  }
});
//DELETE      /categories/:categoryId
router.delete("/:categoryId", async (req, res, next) => {
  try {
    const categoryToUpdate = await Categories.read(req.params.categoryId);
    const getCategTitle = categoryToUpdate.map((cat) => cat.title);
    await Categories.remove(req.params.categoryId);
    res.status(201).json(`Category ${getCategTitle} was succesfully deleted`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
