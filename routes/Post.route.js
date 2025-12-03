import * as PostController from './../controller/Post.controller.js';
import express from 'express';
const router = express.Router();

// Create a new Post
router.post('/new', PostController.create);
// Retrieve all Posts
router.get('/metaList', PostController.findAllMeta);
// Retrieve a single Post with id
router.get('/:id', PostController.findOneById);
// Update readTime of a Post with id
router.patch('/updateReadTime/:id', PostController.updateReadTime);

export default router;
