import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import entryRouter from './routes/entry-router.mjs';
import userRouter from './routes/user-router.mjs';
import itemRouter from './routes/item-router-mjs';

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

// Parse JSON bodies
app.use(express.json());

// CORS middleware
app.use(cors());

// Routes
app.use('/entries', entryRouter);
app.use('/users', userRouter);
app.use('/items', itemRouter);

// Serve static files
app.use(express.static('public'));

// Additional static site at /sivusto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
