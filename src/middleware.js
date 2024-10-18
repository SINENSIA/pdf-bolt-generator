const authenticateToken = (req, res, next) => {
  const token = req.headers['x-api-token'];
  const allowedTokens = process.env.ALLOWED_TOKENS.split(',');

  if (!token) {
    return res.status(401).json({ error: 'API token is required' });
  }

  if (!allowedTokens.includes(token)) {
    return res.status(403).json({ error: 'Invalid API token' });
  }

  next();
};

module.exports = { authenticateToken };