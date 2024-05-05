const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3006;
// const host = "localhost";
const mongoose = require("mongoose");
const router = require("./routes/feedbackRouter");

app.use(cors()); //cors origin unblocking(cross origine resoures sharing)

app.use(express.json());

const uri = process.env.MONGO_URL || "mongodb://localhost:27017/feedbackDB";
const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("mongoDB error: ", error);
  }
};

connect();

//call back function
const server = app.listen(port, () => {
  console.log(`Node server is listing to ${server.address().port}`); //check actually working sever?
});

app.use("/api", router);
