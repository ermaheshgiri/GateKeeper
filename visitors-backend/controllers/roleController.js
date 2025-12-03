const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

exports.list = async (req, res) => {
  const roles = await Role.find().select('-passwordHash');
  res.json(roles);
};

exports.create = async (req, res) => {
  const { name, username, password } = req.body;
  const existing = await Role.findOne({ username });
  if (existing) return res.status(400).json({ message: 'username exists' });
  const hash = await bcrypt.hash(password, 10);
  const role = await Role.create({ name, username, passwordHash: hash });
  res.json({ id: role._id, name: role.name, username: role.username });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };
  if (updates.password) {
    updates.passwordHash = await bcrypt.hash(updates.password, 10);
    delete updates.password;
  }
  const r = await Role.findByIdAndUpdate(id, updates, { new: true }).select('-passwordHash');
  res.json(r);
};

exports.remove = async (req, res) => {
  await Role.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
