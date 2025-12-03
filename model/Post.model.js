import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
        // Mongoose automatically adds the '_id' field of type ObjectId
        title: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [String], // Array of Strings
            default: [],
        },
        publishDate: {
            type: Date, // Recommended to store dates as MongoDB Date objects
            required: true,
            default: Date.now,
        },
        readTime: {
            type: Number,
            required: true,
            default: 0,
        },
        category: {
            type: String,
            enum: ['learning', 'project', 'tutorial', 'reflection'], // Restrict to specific values
            required: true,
        },
        image: {
            type: String,
            required: false, // Image is not strictly necessary for every post
        },
        readTime:{
            type: Number,
            default: 0,
        }
    }, {
        timestamps: true // Adds 'createdAt' and 'updatedAt' Date fields automatically
    });

const Post = mongoose.model('Post', postSchema);
export default Post;