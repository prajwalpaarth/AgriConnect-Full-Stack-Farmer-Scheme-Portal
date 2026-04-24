const mongoose = require('mongoose');
const { schemeSchema } = require('./schemes')
const { SchemeDetails } = require('./schemeDetails')

// Define connections
const schemesDB = mongoose.createConnection("mongodb+srv://amitlpatil282006:azaDXBYoOz7ryKwI@cluster1.h8gyl.mongodb.net/")

// Bind models to specific connections
const schemes = schemesDB.model("schemes", schemeSchema , 'schemes');
const schemesDetails = schemesDB.model("schemeDetails", schemeDetailsSchema, 'schemesDetails');

module.exports = { schemes, schemesDetails };
