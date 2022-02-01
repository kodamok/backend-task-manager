require("dotenv").config();
const express = require("express");
const server = express();
const model = require('./models/userModel')
const {checkAuth} = require('./middlewares/authorization')
const PORT = process.env.PORT;


server.listen(PORT, () => console.log(`Server running in port ${PORT}`));
server.use(express.json()); // Body Parser MiddleWare that takes the http(client) and transfer it to the express req.body(server)
server.use(express.urlencoded({ extended: true }));

require('./db/mongodb.js')

//Logger 
server.use((req,res, next)=>{
  console.log(req.method, req.url, PORT);
  next()
})


// NEW USER & USER MANAGEMENT
const userRouter = require("./routers/user_router.js");
server.use("/users", userRouter);

 // MANAGEMENT OF TASKS
const tasksRouter = require("./routers/tasks_router.old");
server.use("/tasks", tasksRouter);

// TEAMS
const teamsRouter = require("./routers/teams_router");
server.use("/teams", teamsRouter);

// SORT TASKS IN CATEGORIES OR COLUMNS
const categoriesRouter = require("./routers/categories_router");
const { use } = require("./routers/user_router.js");
server.use("/categories", categoriesRouter); 

// ERROR HANDLER MIDDLEWARE

 server.use(require("./middlewares/errorCatcher")); 
 server.use((req, res) => res.status(404).send("<h1>ERROR 404</h1>"));
