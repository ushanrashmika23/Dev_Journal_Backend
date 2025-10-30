const PostController = require('./../controller/Post.controller');
const express = require('express');
const router = express.Router();

// Create a new Post
router.post('/new', PostController.create);
// Retrieve all Posts
router.get('/metaList', PostController.findAllMeta);
// Retrieve a single Post with id
router.get('/:id', PostController.findOneById);
// Update readTime of a Post with id
router.patch('/updateReadTime/:id', PostController.updateReadTime);

module.exports = router;
