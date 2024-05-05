import express from "express";
import { createTask, deleteTask, getTaskList, updateTask } from "../controller/taskController.js";

const taskRoute = express.Router();

taskRoute.post("/", createTask);
taskRoute.patch("/", updateTask);
taskRoute.get("/", getTaskList)
taskRoute.delete("/", deleteTask);

export default taskRoute;
