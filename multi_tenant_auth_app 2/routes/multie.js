const express = require('express');
const authMiddleware = require('../middleware/auth');
const getTenantDb = require('../db/connectionManager');
const multieSchema = require('../models/multie');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const db = await getTenantDb(tenantId);
    const Multie = db.collection('multie');
    const data = await Multie.find({});
    const processedData = await data.toArray();
    res.json({ tenant: tenantId, processedData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch multie data.' });
  }
});

module.exports = router;