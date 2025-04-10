import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (username) => {
  const payload = { username };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return null;
  }
};