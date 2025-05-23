module.exports = function (req, res, next) {
    const host = req.headers.host || '';
    const subdomain = host.split('.')[0];
    req.subdomainTenantId = subdomain;
    next();
  };