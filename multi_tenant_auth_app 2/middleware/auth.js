

const jwt = require('jsonwebtoken');
const { isBlacklisted, addToBlacklist } = require('../services/tokenBlacklist');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (isBlacklisted(token)) {
    return res.status(403).json({ error: 'Token has been revoked' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.tenantId = decoded.tenantId;
    req.user = { id: decoded.userId };

    if (req.subdomainTenantId && decoded.tenantId !== req.subdomainTenantId) {
      addToBlacklist(token);
      return res.status(403).json({ error: 'Tenant mismatch. Token revoked.' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
