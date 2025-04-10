import { getConfig, setConfigItem } from '../utils/dbUtils.js';

class Config {
  constructor (async_param) {
    if (typeof async_param === 'undefined') {
        throw new Error('Cannot be called directly');
    }
    async_param.forEach(row => {
      switch (row.config_item) {
        case 'backend_port':
          this.backend_port = row.config_value;
          break;
      }
    });
  }

  static async build() {
    const rows = await getConfig();
    return new Config(rows);
  }

  getBackendPort() {
    return this.backend_port;
  }

  setBackendPort(backend_port) {
    this.backend_port = backend_port;
    return setConfigItem('backend_port', backend_port);
  }
};

const configPromise = Config.build();

export default configPromise;