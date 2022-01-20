const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // refers to the Users collection
    required: false,
  },

  versionKey: false,
});

const Category = mongoose.connection.model("Categories", categorySchema);

//CREATE
async function create(category) {
  //we ask for one parameter
  const { title, description, author} = category; // we destructure it later

  const newCategory = new Category({
    title,
    description,
    author,
  });

  return await newCategory.save();
}

//READ
async function read() {
  
  const categories = await Category.find();

  return categories;
}

//UPDATE

async function update(categoryId, newData){
  const {title, description, author} = newData
 

  await Category.findByIdAndUpdate(categoryId, newData)
}

//DELETE

async function remove(categoryId){

  const categoryToDelete = await Category.findById(categoryId)

  await Category.findOneAndDelete(categoryId) 

  return categoryToDelete


}

module.exports = {
  create,
  read,
  update,
  remove
  
};
