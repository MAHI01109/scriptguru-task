import Board from "../models/Board.model.js"

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