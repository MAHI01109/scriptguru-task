import Task from "../models/Task.model.js";

// Create a new task for a board
export const createTask = async (req, res) => {
    try {
        const boardId = req.params.id;
        const { title, description, status, priority, assignedTo, dueDate } = req.body;

        if (!title || !boardId) {
            return res.status(400).json({ message: "Title and boardId are required" });
        }

        const newTask = await Task.create({
            title,
            description,
            status,
            priority,
            assignedTo,
            dueDate,
            boardId
        });

        return res.status(201).json({ message: "Task created", task: newTask });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all tasks for a board
export const getTasks = async (req, res) => {
    try {
        const boardId = req.params.id;
        const tasks = await Task.find({ boardId });
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    try {
        const { boardId, taskId } = req.params;
        const updates = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, boardId },
            updates,
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task updated", task: updatedTask });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { boardId, taskId } = req.params;
        const deletedTask = await Task.findOneAndDelete({ _id: taskId, boardId });
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


