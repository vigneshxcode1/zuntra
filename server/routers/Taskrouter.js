import express from 'express'

import { CreateTask, DeleteTask, GetTask, UpdateTask } from '../controllers/TaskControllers.js';
import { auth } from '../Auth.js';

const TaskRouter = express.Router();

TaskRouter.use(auth)

TaskRouter.post('/createtask',CreateTask);

TaskRouter.get('/gettask',GetTask);

TaskRouter.put('/updatetask/:id',UpdateTask);


TaskRouter.delete('/deletetask/:id',DeleteTask);

export default TaskRouter;
