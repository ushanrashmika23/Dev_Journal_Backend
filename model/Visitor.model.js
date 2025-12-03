import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
    // IP Address
    ipAddress: {
        type: String,
        required: true
    },
    
    // Geographic Information
    location: {
        country: { type: String },
        countryCode: { type: String },
        region: { type: String },
        city: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
        timezone: { type: String },
        postalCode: { type: String }
    },
    
    // Device Information
    device: {
        type: { type: String }, // mobile, tablet, desktop
        vendor: { type: String },
        model: { type: String },
        isMobile: { type: Boolean, default: false },
        isTablet: { type: Boolean, default: false },
        isDesktop: { type: Boolean, default: false }
    },
    
    // Browser Information
    browser: {
        name: { type: String },
        version: { type: String },
        engine: { type: String }
    },
    
    // Operating System Information
    os: {
        name: { type: String },
        version: { type: String },
        platform: { type: String }
    },
    
    // User Agent
    userAgent: {
        type: String
    },
    
    // Screen Resolution
    screen: {
        width: { type: Number },
        height: { type: Number },
        colorDepth: { type: Number }
    },
    
    // Language and Locale
    language: {
        type: String
    },
    
    languages: {
        type: [String],
        default: []
    },
    
    // Referrer Information
    referrer: {
        type: String,
        default: 'direct'
    },
    
    referrerDomain: {
        type: String
    },
    
    // Landing Page
    landingPage: {
        type: String
    },
    
    // Entry and Exit Pages
    entryPage: {
        type: String
    },
    
    exitPage: {
        type: String
    },
    
    // Page Views
    pageViews: [{
        url: { type: String },
        title: { type: String },
        timestamp: { type: Date, default: Date.now },
        duration: { type: Number } // seconds spent on page
    }],
    
    // Session Information
    sessionId: {
        type: String,
        unique: true
    },
    
    sessionDuration: {
        type: Number, // in seconds
        default: 0
    },
    
    // UTM Parameters (for marketing tracking)
    utm: {
        source: { type: String },
        medium: { type: String },
        campaign: { type: String },
        term: { type: String },
        content: { type: String }
    },
    
    // Visitor Type
    isNewVisitor: {
        type: Boolean,
        default: true
    },
    
    isReturningVisitor: {
        type: Boolean,
        default: false
    },
    
    visitCount: {
        type: Number,
        default: 1
    },
    
    // Time Information
    firstVisit: {
        type: Date,
        default: Date.now
    },
    
    lastVisit: {
        type: Date,
        default: Date.now
    },
    
    // Connection Information
    connection: {
        effectiveType: { type: String }, // 4g, 3g, 2g, slow-2g
        downlink: { type: Number }, // Mbps
        rtt: { type: Number } // round trip time in ms
    },
    
    // Bot Detection
    isBot: {
        type: Boolean,
        default: false
    },
    
    botType: {
        type: String
    },
    
    // Engagement Metrics
    bounced: {
        type: Boolean,
        default: false
    },
    
    engaged: {
        type: Boolean,
        default: false
    },
    
    // Conversion Tracking
    converted: {
        type: Boolean,
        default: false
    },
    
    conversionType: {
        type: String
    },
    
    // Additional Data
    customData: {
        type: mongoose.Schema.Types.Mixed
    }
    
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Indexes for better query performance
visitorSchema.index({ ipAddress: 1 });
visitorSchema.index({ sessionId: 1 });
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ 'location.country': 1 });
visitorSchema.index({ isBot: 1 });

const Visitor = mongoose.model('PortFolioVisitor', visitorSchema);

export default Visitor;
