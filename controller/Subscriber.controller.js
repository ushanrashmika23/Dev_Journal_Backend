import Subscriber from '../model/Subscriber.model.js';
// Create and Save a new Subscriber
export const create = async (req, res) => {
    try {
        const subscriber = new Subscriber({
            email: req.body.email,
            name: req.body.name
        });
        const savedSubscriber = await subscriber.save();
        res.status(201).json({ code: 201, status: 'success', data: savedSubscriber });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Retrieve and return all subscribers from the database.
export const findAll = async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json({ code: 200, status: 'success', data: subscribers });
    }
    catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};