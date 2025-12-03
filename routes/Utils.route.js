import { getPostAndProjectsCount } from '../controller/Utils.controller.js';
import express from 'express';
const router = express.Router();

// Retrieve counts of Posts and Projects
router.get('/counts', getPostAndProjectsCount);

export default router;