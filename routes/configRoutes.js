import express from 'express';
import ConfigController from '../controllers/configController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const configController = new ConfigController();

const setConfigRoutes = (app) => {
  router.use(authMiddleware);
  router.get('/', (req, res) => {
    configController.getConfig(req, res);
  });
  router.post('/', (req, res) => {
    configController.setConfig(req, res);
  });
  app.use('/config', router);
};

export default setConfigRoutes;