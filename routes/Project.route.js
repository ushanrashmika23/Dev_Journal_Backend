const ProjectController = require('../controller/Project.controller');
const express = require('express');
const router = express.Router();

// Create a new Project
router.post('/new', ProjectController.create);
// Retrieve all Projects
router.get('/list', ProjectController.findAll);
// Retrieve all Projects meta
router.get('/metaList', ProjectController.findAllMeta);
// Retrieve a single Project with id
router.get('/:id', ProjectController.findOneById);

module.exports = router;