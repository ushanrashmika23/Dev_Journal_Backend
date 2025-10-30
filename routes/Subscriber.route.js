const SubscriberController = require('../controller/Subscriber.controll');
const express = require('express');

const router = express.Router();

// Create a new Subscriber
router.post('/new', SubscriberController.create);
// Retrieve all Subscribers
router.get('/list', SubscriberController.findAll);

module.exports = router;