const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 3000;


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
mongoose.connect(process.env.DB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}).then(() => {
    console.log('###Connected to MongoDB');
    console.log('###Database:', mongoose.connection.name);
}).catch(err => {
    console.error('!!!Failed to connect to MongoDB');
});

app.listen(port, () => {
    console.log(`###Server is running at http://localhost:${port}`);
});