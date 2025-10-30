const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Journal Started...');
});

const postRoutes = require('./routes/Post.route');
app.use('/posts', postRoutes);
const projectRoutes = require('./routes/Project.route');
app.use('/projects', projectRoutes);
const subscriberRoutes = require('./routes/Subscriber.route');
app.use('/subscribers', subscriberRoutes);

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