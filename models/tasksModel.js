const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // refers to the User collection
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: false,
  },

  versionKey: false,
});

const Task = mongoose.connection.model("Tasks", taskSchema);

//CREATE
async function create(task) {
  //we ask for one parameter
  const { title, startDate, dueDate, description, author, category } = task; // we destructure it later

  const newtask = new Task({
    title,
    startDate,
    dueDate,
    description,
    author,
    category,
  });

  return await newtask.save();
}



//READ
async function read(taskId) {
  const taskReq = await Task.find({taskId},{_id:0});

  return taskReq;
}

//UPDATE

async function update(taskId, newData) {
  const { title, startDate, dueDate, description, author, category } = newData;

  await Task.findByIdAndUpdate(taskId, newData);
}

//DELETE

async function remove(taskId) {
  const taskToDelete = read(taskId);
  const titleOfTask = taskToDelete.map(task => task.title)

  await Task.findOneAndDelete(taskId);

  return `The task ${taskToDelete} has been succesfully deleted`;
}

module.exports = {
  create,
  read,
  update,
  remove,
};
