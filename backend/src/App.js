import 'dotenv/config'
import express from 'express';
import cors from 'cors'

import bordRoutes from './Routes/bords.routes.js'
import taskRoutes from './Routes/Task.routes.js'
const app = express();

app.use(cors({
    origin: "http://localhost:5173", // your React frontend URL
    credentials: true
  }))

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api/v1/boards/',bordRoutes);
app.use('/api/v1/tasks/',taskRoutes);


export { app };