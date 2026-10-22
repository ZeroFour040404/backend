import { Router } from "express";
import { addTask, getTask, getTaskPerSubject, updateTask, updateTaskStatus, deleteTask } from "../controllers/task.controller.js";

const taskRouter = Router({ mergeParams: true });

taskRouter.route('/:userId/subjects/:subjectId/tasks/addTask').post(addTask);
taskRouter.route('/:userId/subjects/:subjectId/tasks/getTask').get(getTask);
taskRouter.route('/:userId/subjects/:subjectId/tasks/getTaskPerSubject').get(getTaskPerSubject);

taskRouter.route('/:userId/subjects/:subjectId/tasks/:taskId/updateTask/').patch(updateTask);
taskRouter.route('/:userId/subjects/:subjectId/tasks/:taskId/updateTaskStatus/').patch(updateTaskStatus);
taskRouter.route('/:userId/subjects/:subjectId/tasks/:taskId/deleteTask/').delete(deleteTask);

export default taskRouter;