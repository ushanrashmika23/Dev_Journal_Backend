import express from 'express';
import * as VisitorController from '../controller/Visitor.controller.js';

const router = express.Router();

// Track a new visitor or update existing session
router.post('/new', VisitorController.trackVisitor);

// Update visitor session duration
router.post('/update', VisitorController.updateSessionDuration);

// Get all visitors with pagination
router.get('/list', VisitorController.getAllVisitors);

// Get visitor analytics/statistics
router.get('/analytics', VisitorController.getAnalytics);

// Get real-time visitors (active in last 5 minutes)
router.get('/realtime', VisitorController.getRealTimeVisitors);

// Get visitors by date range
router.get('/date-range', VisitorController.getVisitorsByDateRange);

// Get visitor by session ID
router.get('/session/:sessionId', VisitorController.getVisitorBySession);

// Get visitors by country
router.get('/country/:country', VisitorController.getVisitorsByCountry);

// Delete visitor by ID
router.delete('/:id', VisitorController.deleteVisitor);

export default router;
