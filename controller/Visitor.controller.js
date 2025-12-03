import Visitor from '../model/Visitor.model.js';

// Track a new visitor
export const trackVisitor = async (req, res) => {
    try {
        const visitorData = req.body;
        
        // Check if session already exists
        if (visitorData.sessionId) {
            const existingVisitor = await Visitor.findOne({ sessionId: visitorData.sessionId });
            if (existingVisitor) {
                // Update existing session
                existingVisitor.lastVisit = new Date();
                existingVisitor.pageViews.push(...(visitorData.pageViews || []));
                existingVisitor.sessionDuration = visitorData.sessionDuration || existingVisitor.sessionDuration;
                existingVisitor.exitPage = visitorData.exitPage || existingVisitor.exitPage;
                existingVisitor.engaged = visitorData.engaged || existingVisitor.engaged;
                existingVisitor.bounced = visitorData.bounced !== undefined ? visitorData.bounced : existingVisitor.bounced;
                
                await existingVisitor.save();
                return res.status(200).json({ code: 200, status: 'success', data: existingVisitor });
            }
        }
        
        // Create new visitor record
        const visitor = new Visitor(visitorData);
        const savedVisitor = await visitor.save();
        res.status(201).json({ code: 201, status: 'success', data: savedVisitor });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Update session duration
export const updateSessionDuration = async (req, res) => {
    try {
        const { sessionId, duration, timestamp } = req.body;
        
        if (!sessionId) {
            return res.status(400).json({ 
                code: 400, 
                status: 'error', 
                data: 'Session ID is required' 
            });
        }
        
        const visitor = await Visitor.findOne({ sessionId });
        
        if (!visitor) {
            return res.status(404).json({ 
                code: 404, 
                status: 'error', 
                data: 'Visitor session not found' 
            });
        }
        
        // Update session data
        visitor.sessionDuration = duration || visitor.sessionDuration;
        visitor.lastVisit = timestamp ? new Date(timestamp) : new Date();
        
        // Mark as engaged if session > 30 seconds
        if (duration && duration > 30) {
            visitor.engaged = true;
            visitor.bounced = false;
        }
        
        await visitor.save();
        
        res.status(200).json({ 
            code: 200, 
            status: 'success', 
            data: {
                sessionId: visitor.sessionId,
                duration: visitor.sessionDuration,
                engaged: visitor.engaged,
                bounced: visitor.bounced
            }
        });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Get all visitors with pagination
export const getAllVisitors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        
        const visitors = await Visitor.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const total = await Visitor.countDocuments();
        
        res.status(200).json({ 
            code: 200, 
            status: 'success', 
            data: {
                visitors,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Get visitor by session ID
export const getVisitorBySession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const visitor = await Visitor.findOne({ sessionId });
        
        if (!visitor) {
            return res.status(404).json({ code: 404, status: 'error', data: 'Visitor not found' });
        }
        
        res.status(200).json({ code: 200, status: 'success', data: visitor });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Get visitor analytics/statistics
export const getAnalytics = async (req, res) => {
    try {
        const totalVisitors = await Visitor.countDocuments();
        const uniqueVisitors = await Visitor.distinct('ipAddress').then(ips => ips.length);
        const newVisitors = await Visitor.countDocuments({ isNewVisitor: true });
        const returningVisitors = await Visitor.countDocuments({ isReturningVisitor: true });
        const botVisits = await Visitor.countDocuments({ isBot: true });
        
        // Average session duration
        const avgSessionDuration = await Visitor.aggregate([
            { $group: { _id: null, avgDuration: { $avg: '$sessionDuration' } } }
        ]);
        
        // Top countries
        const topCountries = await Visitor.aggregate([
            { $group: { _id: '$location.country', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        
        // Top browsers
        const topBrowsers = await Visitor.aggregate([
            { $group: { _id: '$browser.name', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        
        // Device types
        const deviceTypes = await Visitor.aggregate([
            { $group: { _id: '$device.type', count: { $sum: 1 } } }
        ]);
        
        // Bounce rate
        const bouncedVisitors = await Visitor.countDocuments({ bounced: true });
        const bounceRate = totalVisitors > 0 ? (bouncedVisitors / totalVisitors * 100).toFixed(2) : 0;
        
        res.status(200).json({
            code: 200,
            status: 'success',
            data: {
                totalVisitors,
                uniqueVisitors,
                newVisitors,
                returningVisitors,
                botVisits,
                avgSessionDuration: avgSessionDuration[0]?.avgDuration || 0,
                bounceRate: parseFloat(bounceRate),
                topCountries,
                topBrowsers,
                deviceTypes
            }
        });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Get visitors by date range
export const getVisitorsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        if (!startDate || !endDate) {
            return res.status(400).json({ 
                code: 400, 
                status: 'error', 
                data: 'Start date and end date are required' 
            });
        }
        
        const visitors = await Visitor.find({
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ createdAt: -1 });
        
        res.status(200).json({ code: 200, status: 'success', data: visitors });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Get visitors by country
export const getVisitorsByCountry = async (req, res) => {
    try {
        const { country } = req.params;
        const visitors = await Visitor.find({ 'location.country': country })
            .sort({ createdAt: -1 });
        
        res.status(200).json({ code: 200, status: 'success', data: visitors });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Delete visitor by ID
export const deleteVisitor = async (req, res) => {
    try {
        const { id } = req.params;
        const visitor = await Visitor.findByIdAndDelete(id);
        
        if (!visitor) {
            return res.status(404).json({ code: 404, status: 'error', data: 'Visitor not found' });
        }
        
        res.status(200).json({ code: 200, status: 'success', data: 'Visitor deleted successfully' });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};

// Get real-time visitors (active in last 5 minutes)
export const getRealTimeVisitors = async (req, res) => {
    try {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const realtimeVisitors = await Visitor.find({
            lastVisit: { $gte: fiveMinutesAgo }
        }).sort({ lastVisit: -1 });
        
        res.status(200).json({ 
            code: 200, 
            status: 'success', 
            data: {
                count: realtimeVisitors.length,
                visitors: realtimeVisitors
            }
        });
    } catch (error) {
        res.status(500).json({ code: 500, status: 'error', data: error.message });
    }
};
