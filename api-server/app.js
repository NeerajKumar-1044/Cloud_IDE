import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use('/api/users', authRoutes);

