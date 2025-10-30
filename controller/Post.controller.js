const post = require('../model/Post.model');
// Create and Save a new Post
exports.create = async (req, res) => {
    try {
        const newPost = new post(req.body);
        await newPost.save();
        res.status(201).json({ code: 201, status: 'success', data: newPost });
    } catch (error) {
        // res.status(400).send(error);
        res.status(400).json({ code: 400, status: 'error', data: error.message });
    }
};

// Retrieve and return all posts from the database.
exports.findAllMeta = async (req, res) => {
    try {
        const posts = await post.find({}, {
            _id: 1,
            title: 1,
            excerpt: 1,
            tags: 1,
            publishDate: 1,
            readTime: 1,
            category: 1,
            image: 1
        });
        res.status(200).json({ code: 200, status: 'success', data: posts });
    } catch (error) {
        res.status(400).json({ code: 400, status: 'error', data: error.message });
    }
};

exports.findOneById = async (req, res) => {
    try {
        const postId = req.params.id;
        const postData = await post.findById(postId);
        if (!postData) {
            return res.status(404).json({ code: 404, status: 'error', data: 'Post not found' });
        }
        res.status(200).json({ code: 200, status: 'success', data: postData });
    } catch (error) {
        res.status(400).json({ code: 400, status: 'error', data: error.message });
    }
}

exports.updateReadTime = async (req, res) => {
    try {
        const postId = req.params.id;
        const { readTime } = req.body;
        const postData = await post.findByIdAndUpdate(postId, { readTime }, { new: true });
        if (!postData) {
            return res.status(404).json({ code: 404, status: 'error', data: 'Post not found' });
        }
        res.status(200).json({ code: 200, status: 'success', data: postData });
    } catch (error) {
        res.status(400).json({ code: 400, status: 'error', data: error.message });
    }
}