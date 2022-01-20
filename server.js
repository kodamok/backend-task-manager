require("dotenv").config();
const express = require("express");
const server = express();
const model = require('./models/userModel')
/* const db = require("./db/mongodb.js") */
const PORT = process.env.PORT;


server.listen(PORT, () => console.log(`Server running in port ${PORT}`));
server.use(express.json()); // Body Parser MiddleWare that takes the http(client) and transfer it to the express req.body(server)
server.use(express.urlencoded({ extended: true }));

require('./db/mongodb.js')
/* server.get("/", (req, res) => {
  res.status(200);
  res.send("this works");
  res.end();
}); */

//Logger 
server.use((req,res, next)=>{
  console.log(req.method, req.url, PORT);
  next()
})





 // MANAGEMENT OF TASKS
const tasksRouter = require("./routers/tasks_router.old");
server.use("/tasks", tasksRouter);

// NEW USER & USER MANAGEMENT
const userRouter = require("./routers/user_router.js");
server.use("/users", userRouter);

// TEAMS
const teamsRouter = require("./routers/teams_router");
server.use("/teams", teamsRouter);

// SORT TASKS IN CATEGORIES OR COLUMNS
const categoriesRouter = require("./routers/categories_router");
server.use("/categories", categoriesRouter); 

// ERROR HANDLER MIDDLEWARE

 server.use(require("./middlewares/errorCatcher")); 
 server.use((req, res) => res.status(404).send("<h1>ERROR 404</h1>"));
