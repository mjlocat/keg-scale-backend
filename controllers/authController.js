import crypto from 'crypto';
import { generateToken } from '../utils/jwtUtils.js';
import { lookupUser, countUsers, addUser } from '../models/users.js';

class AuthController {

  async login(req, res) {
    const { username, password } = req.body;

    const hash = crypto.createHash('sha256').update(password).digest('base64');
    const user_lookup = await lookupUser(username);
    if (!user_lookup) {
      const cnt = await countUsers();
      if (cnt === 0) {
        await addUser(username, hash);
        const token = generateToken(username);
        return res.json({ token });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (hash !== user_lookup.password_hash) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(username);
    return res.json({ token });
  }

}

export default AuthController;