const Project = require('../model/Project.model');

// Create and Save a new Project
exports.create = async (req, res) => {
    try {
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            progress: req.body.progress,
            status: req.body.status,
            startDate: req.body.startDate,
            githubUrl: req.body.githubUrl,
            demoUrl: req.body.demoUrl,
            longDescription: req.body.longDescription,
            techStack: req.body.techStack,
            features: req.body.features,
            challenges: req.body.challenges,
            lessons: req.body.lessons,
            screenShots: req.body.screenShots
        });
        const savedProject = await project.save();
        res.status(201).json({ code: 201, status: 'success', data: savedProject });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Retrieve and return all projects from the database.
exports.findAll = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ code: 200, status: 'success', data: projects });
    }
    catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Retrieve and return all projects meta from the database.
exports.findAllMeta = async (req, res) => {
    try {
        const projects = await Project.find({}, {
            _id: 1,
            title: 1,
            description: 1,
            progress: 1,
            status: 1,
            startDate: 1,
            githubUrl: 1,
            demoUrl: 1,
            techStack: 1,
            firstScreenShot: { $arrayElemAt: ['$screenShots', 0] }
        });
        res.status(200).json({ code: 200, status: 'success', data: projects });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Find a single project with an id
exports.findOneById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ code: 404, status: 'error', data: 'Project not found' });
        }
        res.status(200).json({ code: 200, status: 'success', data: project });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};