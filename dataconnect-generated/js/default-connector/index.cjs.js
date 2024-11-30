const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'startup-nextjs-main',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

