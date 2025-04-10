import express from 'express';
import setAuthRoutes from './routes/authRoutes.js';
import setConfigRoutes from './routes/configRoutes.js';
import configPromise from './config/config.js';

const startServer = async () => {
  const app = express();
  const config = await configPromise;
  const port = config.getBackendPort() || 3001;

  app.use(express.json());

  setAuthRoutes(app);
  setConfigRoutes(app);

  app.get('/', (req, res) => {
    res.send('Hello from the backend!');
  });

  app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
  });
}

export default startServer;