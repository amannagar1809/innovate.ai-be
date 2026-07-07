import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Welcome endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Innovate AI Backend API' });
});

app.listen(port, () => {
  console.log(`⚡ Server is running at http://localhost:${port}`);
});
