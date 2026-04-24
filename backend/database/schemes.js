const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    id: {type : String, required: true},
    title: { type: String, required: true },
    organization: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },  // Tags like "Financial Assistance", "Disabled", etc.
    location: { type: String },
    eligibility: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Schemes = mongoose.model('Schemes', schemeSchema);

module.exports = {Schemes};  // Export `Scheme` mod