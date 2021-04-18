import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/', (req, res) => {
    return res.status(400).json({ message: 'Hello bitches' });
});
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('MongoDB connection established')
);
