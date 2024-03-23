import dotenv from "dotenv";
dotenv.config({ path: "./config/.env"});

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from '../config/db';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import { authenticateToken } from './middlewares/auth';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

// Routes
app.get('', (req: Request, res: Response)=>{return res.send("The is the API for a Simple Store Manager")});
app.use('/api/product', authenticateToken, productRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

export default app;
