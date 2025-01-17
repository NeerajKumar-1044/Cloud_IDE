import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import classRoutes from './routes/classroom.route.js';
import cookieParser from 'cookie-parser';


export const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://codeforge.netlify.app',
];

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS, contact the admin'));
        }
    },
    credentials: true,
}));


app.get('/health-check', (req, res) => {
    res.send('Server is up and running 👍');
});


app.use('/api/users', authRoutes);
app.use('/api/classroom', classRoutes);

