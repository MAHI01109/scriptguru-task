import Board from "../models/Board.model.js"
import Task from "../models/Task.model.js";

export const getBoard = async (req, res) => {
    try {
        const boards = await Board.find();
        return res.status(200).json({ boards });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const createBoard = async (req, res) => {
    try {
        const { board } = req.body;
        console.log(board);
        
        if (!board) {
            return res.status(400).json({ message: "board field is required" });
        }

        // Capitalize first letter
        const boardName = board.charAt(0).toUpperCase() + board.slice(1);

        // Create new board document
        const result = await Board.create({ name: boardName });

        return res.status(201).json({ message: "Board created", board: result });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { boardId, taskId } = req.params;
        const { status } = req.body;

        // Only allow status update for drag-and-drop
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        console.log(boardId, taskId,status);
        

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, boardId },
            { status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task status updated", task: updatedTask });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};