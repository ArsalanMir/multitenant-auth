const mongoose = require('mongoose');
const tenantRegistry = require('../tenantRegistry');
const connections = new Map();

async function getTenantDb(tenantId) {
  if (connections.has(tenantId)) {
    console.log(`[INFO] Reusing DB connection for tenant: ${tenantId}`);
    return connections.get(tenantId);
  }

  const uri = tenantRegistry[tenantId];
  if (!uri) throw new Error('Tenant not found.');

  const conn = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`[INFO] Connected to DB for tenant ${tenantId} at URI: ${uri}`);

  connections.set(tenantId, conn);
  return conn;
}

module.exports = getTenantDb;