const mongoose = require('mongoose');

const VisitorLogSchema = new mongoose.Schema({
  visitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
  action: { type: String, enum: ['IN','OUT'], required: true },
  byRole: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  time: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('VisitorLog', VisitorLogSchema);
