const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  visitorNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobileNumber: { type: String },
  contactManager: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  contactHR: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  purpose: { type: String },
  numberOfPersons: { type: Number, default: 1 },
  vehicleNumber: { type: String },
  visitInTime: { type: Date },
  visitOutTime: { type: Date },
  totalTimeSpentMinutes: { type: Number },
  photoUrl: { type: String },
  meetingStatus: { type: String, enum: ['Pending','Completed','Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Visitor', VisitorSchema);
