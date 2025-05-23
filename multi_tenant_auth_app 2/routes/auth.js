const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const getTenantDb = require('../db/connectionManager');
const UserSchema = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { tenantId, email, password } = req.body;

  try {
    const db = await getTenantDb(tenantId);
    const User = db.model('User', UserSchema);

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const token = jwt.sign({ tenantId, userId: user._id }, 'your_jwt_secret');
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration failed');
  }
});

router.post('/login', async (req, res) => {
  const { tenantId, email, password } = req.body;

  try {
    const db = await getTenantDb(tenantId);
    const User = db.model('User', UserSchema);

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ tenantId, userId: user._id }, 'your_jwt_secret');
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed');
  }
});

module.exports = router;