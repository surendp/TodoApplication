import { createConnection, Connection } from 'typeorm';
import { Todo } from './entities/todo';

class DatabaseManager {
  private options;

  constructor () {
    this.options = {
      type: "postgres",
      host: "localhost",
      port: this.isTestEnv ? process.env.TEST_PGPORT : process.env.PGPORT,
      username: this.isTestEnv ? process.env.TEST_PGUSER : process.env.PGUSER,
      password: this.isTestEnv ? process.env.TEST_PGPASSWORD : process.env.PGPASSWORD,
      database: this.isTestEnv ? process.env.TEST_PGDATABASE : process.env.PGDATABASE,
      entities: [
        Todo
      ],
      synchronize: true,
      logging: false,
    }
  }

  private isTestEnv () {
    return process.env.NODE_ENV === 'test';
  }

  public async establishConnection (): Promise<Connection | Error> {
    try {
      const connection: Connection = await createConnection(this.options);
      return connection;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default DatabaseManager;