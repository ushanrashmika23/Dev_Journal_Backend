import * as SubscriberController from '../controller/Subscriber.controller.js';
import express from 'express';

const router = express.Router();

// Create a new Subscriber
router.post('/new', SubscriberController.create);
// Retrieve all Subscribers
router.get('/list', SubscriberController.findAll);

export default router;