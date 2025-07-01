import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: '' },
    assignedTo: { type: String },
    dueDate: { type: String },
    boardId: {
        type: Schema.Types.ObjectId,
        ref: "Board"
    },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;