import { Client } from 'pg';

class DatabaseManager {
  private client: Client;

  constructor () {
    this.client = new Client();
  }

  public async establishConnection () {
    try {
      const client = new Client();
      await client.connect();
      return client;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default DatabaseManager;