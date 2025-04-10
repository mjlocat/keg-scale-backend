import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();

const setAuthRoutes = (app) => {
  router.post('/login', async (req, res, next) => {
    try {
      await authController.login(req, res);
    } catch (err) {
      next(err);
    }
  });
  app.use('/auth', router);
};

export default setAuthRoutes;