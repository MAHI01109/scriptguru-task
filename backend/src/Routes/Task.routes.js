import express from "express";
import { createBoard, getBoard } from "../controllers/Board.controllers.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/Task.controller.js";

const router = express.Router();

router.route('/:taskId')
    .put(updateTask)       // Update a task
    .delete(deleteTask);   // Delete a task

router.route('/get-board').get(getBoard);

export default router;