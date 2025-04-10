import configPromise from '../config/config.js';

class ConfigController {
  async getConfig(req, res) {
    const config = await configPromise;
    const configData = {};
    configData.backend_port = config.getBackendPort();

    res.json(configData);
  }

  async setConfig(req, res) {
    const config = await configPromise;
    const { backend_port } = req.body;

    const promises = [
      config.setBackendPort(backend_port),
    ];

    // Use Promise.allSettled to handle both resolved and rejected promises
    const results = await Promise.allSettled(promises);

    // Check for errors in the results
    const errors = results.filter(result => result.status === 'rejected');
    if (errors.length > 0) {
      console.error('Errors occurred while setting config:', errors);
      return res.status(500).json({ error: 'Failed to update configuration' });
    }

    res.json({ backend_port });
  }
}

export default ConfigController;