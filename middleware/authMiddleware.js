import { verifyToken } from '../utils/jwtUtils.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const decoded = verifyToken(token);
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;