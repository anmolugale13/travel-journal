import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import journalRoutes from './routes/journalRoutes.js';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: false
}));

app.get('/', (req, res) => {
  res.json({ status: 'OK', service: 'Travel Journal API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
