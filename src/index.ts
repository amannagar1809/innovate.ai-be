import express, { Express,NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import routes from './routes/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
};


app.use(express.json());
app.use(corsMiddleware);

// Routes
app.use('/api', routes);

// Connect to MongoDB
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`⚡ Server is running at http://localhost:${port}`);
  });
});
