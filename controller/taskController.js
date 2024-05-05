import response from "../utils/response.js";
import { task } from "../model/taskShema.js";

//Create Task
const createTask = async (req, res) => {
  try {
    const createTask = await task.create(req.body);
    if (createTask) {
      return res
        .status(200)
        .send(response("Task created successfully", createTask));
    } else {
      return res.status(400).send(response("Failed to create task"), {}, false);
    }
  } catch (error) {
    console.log(error)
    return res.status(400).send(response(error.message, {}, false));
  }
};

//Get Task List
const getTaskList = async (req, res) => {
  try {
    const query = [ { $sort: { created_at: -1 } },];

    if (req.query.skip !== 'undefined') {
      query.push({ $skip: parseInt(req.query.skip) });
    }
    if (req.query.limit !== 'undefined') {
      query.push({ $limit: parseInt(req.query.limit) });
    }

    const [data, count] = await Promise.all([
      await task.aggregate(query),
      task.countDocuments({}),
    ]);
    if (data.length > 0) {
      return res.status(200).send(response("Task list", { count, data }));
    } else {
      return res
        .status(400)
        .send(response("Failed to get the task list", {}, false));
    }
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false));
  }
};

//Update Task
const updateTask = async (req, res) => {
  try {
    if (!req.query.id)
      return res.status(400).send(response("Task Id Required", {}, false));

    let taskData = await task.findOne({ _id: req.query.id });

    if (!taskData)
      return res.status(400).send(response("Invaild Task Id", {}, false));

    let payload = {
      ...req.body,
      updated_at: new Date(),
    };

    let taskUpdatedDetails = await task.updateOne(
      { _id: req.query.id },
      payload
    );

    if (taskUpdatedDetails) {
      return res.send(
        response("Task updated successfully", taskUpdatedDetails)
      );
    } else {
      return res.status(400).send(response("Failed to update Task", {}, false));
    }
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false, 400));
  }
};

//Soft Delete Task
const deleteTask = async (req, res) => {
  try {
    if (!req.query.id)
      return res.status(400).send(response("Task Id Required", {}, false));

    const taskData = await task.updateOne(
      { _id: req.query.id },
      { status: req.query.status }
    );


    if (!taskData) {
      return res.status(400).send(response("Failed to delete order details", {}, false));
    }
    return res.send(
      response(
        `Task ${req.query.status === 'true' ? "Activated" : "De-Activated"} Successfully`,
        {},
        true
      )
    );
  } catch (error) {
    return res.status(400).send(response(error.message, {}, false));
  }
};

export { createTask, updateTask, getTaskList, deleteTask };
