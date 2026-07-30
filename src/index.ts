import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import routes from './routes/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Routes
app.use('/api', routes);

// Connect to MongoDB
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`⚡ Server is running at http://localhost:${port}`);
  });
});
