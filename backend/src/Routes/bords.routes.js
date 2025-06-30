import express from "express";
import { createBoard, getBoard } from "../controllers/Board.controllers.js";
import { createTask, getTasks } from "../controllers/Task.controller.js";

const router = express.Router();

router.route('/create-board').post(createBoard);
router.route('/get-board').get(getBoard);

router.route('/:id/tasks')
    .post(createTask)      // Create task for a board
    .get(getTasks);        // Get all tasks for a board

export default router