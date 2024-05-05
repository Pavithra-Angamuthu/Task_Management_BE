import mongoose from "mongoose";
import taskRoute from "./routers/taskRouter.js";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({extended: false}))

mongoose
  .connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.5vcs7dt.mongodb.net/${process.env.DB_NAME}`
    )
  .then(() => console.log("db connected"))
  .catch((e) => console.log("error"));

app.use("/api/task", taskRoute)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
