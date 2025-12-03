import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/Post.route.js';
import projectRoutes from './routes/Project.route.js';
import subscriberRoutes from './routes/Subscriber.route.js';
import utilsRoutes from './routes/Utils.route.js';
import emailRoutes from './routes/Email.route.js';
import visitorRoutes from './routes/Visitor.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Journal Started...');
});

app.use('/posts', postRoutes);
app.use('/projects', projectRoutes);
app.use('/subscribers', subscriberRoutes);
app.use('/utils', utilsRoutes);
app.use('/email', emailRoutes);
app.use('/visitors', visitorRoutes);

// console.log(process.env.DB_URI);


// MongoDB connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log('###Connected to MongoDB');
        console.log('###Database:', conn.connection.name);
    } catch (err) {
        console.error('!!!Failed to connect to MongoDB');
        console.error('!!!Error:', err.message);
        // Don't exit the process in production, let it retry
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};

connectDB();

app.listen(port, () => {
    console.log(`###Server is running at http://localhost:${port}`);
});