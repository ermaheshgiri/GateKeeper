require('dotenv').config();
const mongoose = require('mongoose');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const roles = [
    { name: 'Admin', username: 'admin', password: 'admin123' },
    { name: 'Security', username: 'security', password: 'security123' },
    { name: 'Manager', username: 'manager', password: 'manager123' },
    { name: 'HR', username: 'hr', password: 'hr123' }
  ];

  for (const r of roles) {
    const exists = await Role.findOne({ username: r.username });
    if (!exists) {
      const hash = await bcrypt.hash(r.password, 10);
      await Role.create({ name: r.name, username: r.username, passwordHash: hash });
      console.log('Created:', r.username);
    } else {
      console.log('Already exists:', r.username);
    }
  }

  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
