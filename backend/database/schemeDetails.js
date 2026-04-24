const mongoose = require('mongoose');

const BenefitSchema = new mongoose.Schema({
  sl_no: Number,
  class_course: String,
  course_fee_assistance: String,
  exam_fee_assistance: String,
  registration_fee_assistance: String,
  admission_fee_assistance: String
});

const ApplicationProcessSchema = new mongoose.Schema({
  type: String,
  steps: [String],
  notes: [String]
});

const SchemeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  state: { type: String, required: true },
  tags: [String],
  details: {
    description: String,
    extra_info: String
  },
  benefits: [BenefitSchema],
  eligibility: [String],
  application_process: ApplicationProcessSchema,
  documents_required: [String]
});

const SchemeDetails = mongoose.model('schemedetails', SchemeSchema);

module.exports = {SchemeDetails};