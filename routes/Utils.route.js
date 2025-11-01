const UtilsController = require('../controller/Utils.controller');
const express = require('express');
const router = express.Router();

// Retrieve counts of Posts and Projects
router.get('/counts', UtilsController.getPostAndProjectsCount);

module.exports = router;