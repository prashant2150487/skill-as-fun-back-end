import express, { Request, Response } from "express";
import { connectDB } from "./config/database/mongoose.config";

const app = express();

// Middleware
app.use(express.json());


connectDB();

export default app 
