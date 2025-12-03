import Post from '../model/Post.model.js';
import Project from '../model/Project.model.js';

export const getPostAndProjectsCount = async (req, res) => {
    try {
        const postCount = await Post.countDocuments();
        const projectCount = await Project.countDocuments();
        res.status(200).json({ code: 200, status: 'success', data: { postCount, projectCount } });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
}