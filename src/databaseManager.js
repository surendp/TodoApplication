const { Client } = require('pg');

const databaseManager = {
 establishConnection: async () => {
    try {
      const client = new Client();
      await client.connect();
      return client;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

module.exports = databaseManager;