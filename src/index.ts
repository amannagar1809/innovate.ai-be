import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Connect to MongoDB
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`⚡ Server is running at http://localhost:${port}`);
  });
});
