const Visitor = require('../models/Visitor');
const VisitorLog = require('../models/VisitorLog');
const { Parser } = require('json2csv');

exports.list = async (req, res) => {
  const page = parseInt(req.query.page || '1');
  const limit = Math.min(parseInt(req.query.limit || '20'), 100);
  const skip = (page - 1) * limit;
  const visitors = await Visitor.find().populate('contactManager contactHR').skip(skip).limit(limit).sort({ createdAt: -1 });
  res.json({ page, visitors });
};

exports.get = async (req, res) => {
  const v = await Visitor.findById(req.params.id).populate('contactManager contactHR');
  if (!v) return res.status(404).json({ message: 'Not found' });
  res.json(v);
};

exports.create = async (req, res) => {
  // generate visitorNumber
  const count = await Visitor.countDocuments();
  const visitorNumber = 'VN' + (100 + count + 1);
  const payload = { ...req.body, visitorNumber };
  const v = await Visitor.create(payload);
  res.json(v);
};

exports.update = async (req, res) => {
  const v = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(v);
};

exports.checkin = async (req, res) => {
  const v = await Visitor.findById(req.params.id);
  if (!v) return res.status(404).json({ message: 'Not found' });
  v.visitInTime = new Date();
  if (req.file) v.photoUrl = `/uploads/${req.file.filename}`;
  await v.save();
  await VisitorLog.create({ visitor: v._id, action: 'IN', byRole: req.user.id });
  res.json(v);
};

exports.checkout = async (req, res) => {
  const v = await Visitor.findById(req.params.id);
  if (!v) return res.status(404).json({ message: 'Not found' });
  v.visitOutTime = new Date();
  if (v.visitInTime) {
    const diffMinutes = Math.round((v.visitOutTime - v.visitInTime) / (1000 * 60));
    v.totalTimeSpentMinutes = diffMinutes;
  }
  v.meetingStatus = req.body.meetingStatus || v.meetingStatus;
  await v.save();
  await VisitorLog.create({ visitor: v._id, action: 'OUT', byRole: req.user.id });
  res.json(v);
};

exports.exportCSV = async (req, res) => {
  const visitors = await Visitor.find().populate('contactManager contactHR').lean();
  const fields = ['visitorNumber','name','mobileNumber','purpose','numberOfPersons','vehicleNumber','visitInTime','visitOutTime','totalTimeSpentMinutes','meetingStatus','createdAt'];
  const parser = new Parser({ fields });
  const csv = parser.parse(visitors);
  res.header('Content-Type', 'text/csv');
  res.attachment('visitors.csv');
  res.send(csv);
};
