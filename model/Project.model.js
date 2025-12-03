import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: [String], required: true },
    progress: { type: Number, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    githubUrl: { type: String, required: true },
    demoUrl: { type: String, required: true },
    longDescription: { type: [String], required: true },
    techStack: { type: [String], required: true },
    features: { type: [String], required: true },
    challenges: { type: [String], required: true },
    lessons: { type: [String], required: true },
    screenShots: { type: [String], required: true },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
