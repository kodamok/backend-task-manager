const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(error => {
    if (error) console.error(error);
    console.log("connected to database");
});

const db = client.db("task_manager")


module.exports = db;
