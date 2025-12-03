const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Role.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, roleName: user.name }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, role: user.name, username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
