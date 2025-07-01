import express from "express";
import { createBoard, getBoard, updateTask } from "../controllers/Board.controllers.js";
import { createTask, deleteTask, getTasks } from "../controllers/Task.controller.js";

const router = express.Router();

router.route('/create-board').post(createBoard);
router.route('/get-board').get(getBoard);

router.route('/:id/tasks')
    .post(createTask)      // Create task for a board
    .get(getTasks);        // Get all tasks for a board
router.route('/:boardId/tasks/:taskId')
    .put(updateTask)       // Update a task (e.g., status change)
    .delete(deleteTask);
export default router