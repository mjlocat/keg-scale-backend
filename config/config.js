import { configModel, updateBackendPort } from '../models/config.js';

class Config {
  constructor (async_param) {
    if (typeof async_param === 'undefined') {
        throw new Error('Cannot be called directly');
    }
    async_param.forEach(row => {
      switch (row.config_item) {
        case 'backend_port':
          this.backend_port = +row.config_value;
          break;
      }
    });
  }

  static async build() {
    await configModel.sync();
    const rows = await configModel.findAll();
    return new Config(rows);
  }

  getBackendPort() {
    return this.backend_port;
  }

  async setBackendPort(backend_port) {
    if (this.backend_port !== backend_port) {
      this.backend_port = backend_port;
      return await updateBackendPort(backend_port);
    }
  }
};

const configPromise = Config.build();

export default configPromise;